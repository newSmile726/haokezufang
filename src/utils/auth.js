import storage from './storage'
// token存取相关函数
const TOKEN_KEY = 'RENT_TOKEN'
export const setToken = (token) => storage.set(TOKEN_KEY, token)

export const getToken = () => storage.get(TOKEN_KEY)

export const removeToken = () => storage.remove(TOKEN_KEY)

// city存取相关函数
const CITY_KEY = 'CITY'
export const getCity = () => storage.get(CITY_KEY)

export const setCity = (city) => storage.set(CITY_KEY, city)

export const removeCity = () => storage.remove(CITY_KEY)
