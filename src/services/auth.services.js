import network from './network.services';

export const login = async (email, password) => {
    return await network.post('/login', { email, password });
}

export const logout = async () => {
    return await network.get('/logout');
}