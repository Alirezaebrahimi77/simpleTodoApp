export const saveToLocalStorage = (data, name) => {
    return localStorage.setItem(name, JSON.stringify(data))
}