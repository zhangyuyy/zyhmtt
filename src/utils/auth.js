import storage from './Storage'
// Storage.set('HeimaUser', payload)

const Heima = 'HeimaUser'
export const getToken = () => storage.get(Heima)
export const setToken = (token) => storage.set(Heima, token)
export const removeToken = () => storage.remove()
