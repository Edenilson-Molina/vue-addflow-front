import network from './network.services';

export const getCategories = async () => {
  return await network.get('/categorias');
}