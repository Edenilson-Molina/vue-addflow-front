import network from './network.services';

export const getCategories = async () => {
  return await network.get('/categorias');
}

export const createCategory = async (category) => {
    return await network.post('/categorias', category);
}

export const updateCategory = async (id, category) => {
  return await network.put(`/categorias/${id}`, category);
}
