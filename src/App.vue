<template>
  <router-view />
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>

