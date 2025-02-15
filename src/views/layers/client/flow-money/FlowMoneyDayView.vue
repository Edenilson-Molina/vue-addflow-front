<template>
  <section class="flex flex-col container mx-auto">
    <header v-if="!flujoCajaDiario.saldo_inicial" class="flex flex-col sm:flex-row justify-between items-center">
      <article class="flex flex-col w-full">
        <img class="h-20" src="/src/assets/logo.svg" alt="">
        <h1 class="text-center text-3xl font-bold">Flujo de Caja</h1>
        <p class="text-center text-gray-500">{{ model.toLocaleDateString() }}</p>
      </article>
    </header>
    <section class="grow flex justify-center gap-16">
      <article class="flex flex-col items-center justify-center gap-2">
        <DatePicker v-model="model"/>
        <div class="flex gap-2">
          <Button label="Generar" severity="secondary" @click="generateReport"/>
        </div>
      </article>
      <section v-if="flujoCajaDiario.saldo_inicial"
               class="section-to-print flex flex-col items-center w-full gap-2">
        <header class="flex flex-col sm:flex-row justify-between items-center">
          <article class="flex flex-col w-full">
            <img class="h-20" src="/src/assets/logo.svg" alt="">
            <h1 class="text-center text-3xl font-bold">Flujo de Caja</h1>
            <p class="text-center text-gray-500">{{
                new
                Date(flujoCajaDiario.created_at).toLocaleDateString()
              }}</p>
          </article>
        </header>
        <article class="shadow-md sm:rounded-lg w-full overflow-y-auto">
          <Button label="Generar PDF" icon="pi pi-file-pdf" class="mx-2 mt-2" @click="generatePDF"/>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" class="px-6 py-3 w-[70%]">
                Concepto
              </th>
              <th scope="col" class="px-6 py-3 text-center w-[15%]">
                Parcial
              </th>
              <th scope="col" class="px-6 py-3 text-center w-[15%]">
                Cantidad
              </th>
            </tr>
            </thead>
            <tbody>
            <tr class="">
              <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Saldo Inicial
              </th>
              <td></td>
              <th class="flex justify-between px-6 py-2">
                <span>$</span>
                <div>
                  {{ flujoCajaDiario.saldo_inicial }}
                </div>
              </th>
            </tr>
            <tr class=" border-b dark: dark:border-gray-700 ">
              <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Ingresos
              </th>
              <td></td>
              <th class="flex justify-between px-6 py-2">
                <span>$</span>
                <div>
                  {{ flujoCajaDiario.ingresos_totales }}
                </div>
              </th>
            </tr>
            <template v-for="category in totalByCategories">
              <tr v-if="category.es_entrada">
                <th scope="row" class="px-10 py-2 cursor-pointer"
                    @click="transactionsCategory(category.id, flujoCajaDiario.updated_at)">
                  {{ category.nombre }}
                </th>
                <td class="flex justify-between px-6 py-2">
                  <span>$</span>
                  <div>
                    {{ category.total }}
                  </div>
                </td>
              </tr>
            </template>
            <tr class=" border-b dark: dark:border-gray-700 ">
              <th scope="row"
                  class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Egresos
              </th>
              <td></td>
              <th class="flex justify-between px-6 py-2">
                <span>$</span>
                <div>
                  {{ flujoCajaDiario.egresos_totales }}
                </div>
              </th>
            </tr>
            <template v-for="category in totalByCategories">
              <tr v-if="!category.es_entrada" :key="category.id">
                <th scope="row" class="px-10 py-2 cursor-pointer"
                    @click="transactionsCategory(category.id, flujoCajaDiario.updated_at)">
                  {{ category.nombre }}
                </th>
                <td class="flex justify-between px-6 py-2">
                  <span>$</span>
                  <div>
                    {{ category.total }}
                  </div>
                </td>
              </tr>
            </template>
            <tr class="  ">
              <th scope="row"
                  class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Saldo Final
              </th>
              <td></td>
              <th class="flex justify-between px-6 py-2">
                <span>$</span>
                <div>
                  {{ flujoCajaDiario.saldo_final }}
                </div>
              </th>
            </tr>
            </tbody>
          </table>
          <Dialog modal v-model:visible="visible" v-if="visible" :header="transactions[0].categoria.nombre" :style="{ width: '25rem' }" position="center">
            <div class="flex justify-center" v-if="loadingTransaction">
              <VueSpinnerPuff size="50"/>
            </div>
            <article v-else>
              <DataTable  :value="transactions">
                <Column field="descripcion" header="Concepto" sortable></Column>
                <Column field="monto" header="Monto" sortable></Column>
              </DataTable>
            </article>
            <template #footer>
              <div class="flex justify-center w-full">
                <Button type="button" label="Cerrar" severity="secondary"
                        @click="visible = false"/>
              </div>
            </template>
          </Dialog>
        </article>
      </section>
    </section>
  </section>
</template>
<script setup>
import { VueSpinnerPuff } from 'vue3-spinners';
import DatePicker from '@/components/forms/DatePickerComponent.vue';

import {ref} from 'vue';
import {storeToRefs} from 'pinia';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import {useFlujoCajaStore} from "@/stores/flujo-caja.store";
import {useTransactionStore} from "@/stores/transaction.store";

const visible = ref(false);
const model = ref(new Date());
const flujoCajaStore = useFlujoCajaStore();
const transactionStore = useTransactionStore();
const {flujoCajaDiario, totalByCategories} = storeToRefs(flujoCajaStore);
const {transactions, loadingTransaction} = storeToRefs(transactionStore);

const generateReport = async () => {
  await flujoCajaStore.fetchFlujoCajaDiario(model.value);
}

const generatePDF = () => {
  const pdf = new jsPDF('p', 'mm', 'letter');
  const margin = 20;
  let yOffset = 20;

  // Configuración de colores
  const primaryColor = '#0A2647';
  const textColor = '#000000';

  // 1. Encabezado con logo y título
  const img = new Image();
  img.src = '/src/assets/imgs/logo.png';
  img.onload = () => {
    pdf.addImage(img, 'PNG', margin, yOffset, 40, 40); // Logo
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.setTextColor(primaryColor);
    pdf.text('Reporte de Flujo de Caja Diario', margin + 50, yOffset + 20); // Título
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(textColor);
    pdf.text(`Fecha: ${model.value.toLocaleDateString()}`, 210 - margin, yOffset + 30, {align: 'right'});
    yOffset += 50;

    // 2. Resumen General
    pdf.setFontSize(14);
    pdf.setTextColor(primaryColor);
    pdf.text('Resumen General:', margin, yOffset);
    yOffset += 10;

    const resumen = [
      ['Saldo Inicial', `$${formatNumber(flujoCajaDiario.value.saldo_inicial)}`],
      ['Ingresos Totales', `$${formatNumber(flujoCajaDiario.value.ingresos_totales)}`],
      ['Egresos Totales', `$${formatNumber(flujoCajaDiario.value.egresos_totales)}`],
      ['Saldo Final', `$${formatNumber(flujoCajaDiario.value.saldo_final)}`],
    ];

    pdf.autoTable({
      startY: yOffset,
      head: [['Concepto', 'Monto']],
      body: resumen,
      theme: 'grid',
      styles: {fontSize: 12, textColor: textColor},
      headStyles: {fillColor: primaryColor, textColor: '#FFFFFF'},
    });

    yOffset = pdf.lastAutoTable.finalY + 10;

    // 3. Detalles de Ingresos
    pdf.setFontSize(14);
    pdf.setTextColor(primaryColor);
    pdf.text('Detalles de Ingresos:', margin, yOffset);
    yOffset += 5;

    const ingresos = totalByCategories.value
      .filter(category => category.es_entrada)
      .map(category => [category.nombre, `$${formatNumber(category.total)}`]);

    pdf.autoTable({
      startY: yOffset,
      head: [['Categoría', 'Monto']],
      body: ingresos,
      theme: 'striped',
      styles: {fontSize: 12, textColor: textColor},
      headStyles: {fillColor: primaryColor, textColor: '#FFFFFF'},
    });

    yOffset = pdf.lastAutoTable.finalY + 10;

    // 4. Detalles de Egresos
    pdf.setFontSize(14);
    pdf.setTextColor(primaryColor);
    pdf.text('Detalles de Egresos:', margin, yOffset);
    yOffset += 5;

    const egresos = totalByCategories.value
      .filter(category => !category.es_entrada)
      .map(category => [category.nombre, `$${formatNumber(category.total)}`]);

    pdf.autoTable({
      startY: yOffset,
      head: [['Categoría', 'Monto']],
      body: egresos,
      theme: 'striped',
      styles: {fontSize: 12, textColor: textColor},
      headStyles: {fillColor: primaryColor, textColor: '#FFFFFF'},
    });

    // 5. Pie de página
    pdf.setFontSize(10);
    pdf.setTextColor('#888888');
    pdf.text('Reporte generado automáticamente - Sistema de Flujo de Caja', margin, 275);
    pdf.text(`Página 1 de 1`, 210 - margin, 275, {align: 'right'});

    // Guardar PDF
    pdf.save(`flujo-caja-${model.value.toLocaleDateString()}.pdf`);
  };

  // Función para formatear números
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString('es-SV', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  };
};

const transactionsCategory = async (categoria_id, created_at) => {
  visible.value = true;
  console.log(categoria_id, created_at);
  await transactionStore.fetchTransactionsCategory(categoria_id, created_at);
};
</script>
