import network from './network.services'

export const getBanks = async () => {
    return await network.get('/bancos')
}