export const setItem = (key, item) => {
  if (item instanceof Object) {
    item = JSON.stringify(item)
  }
  window.localStorage.setItem(key, JSON.stringify(item))
}
export const getItem = (key) => {
  return JSON.parse(window.localStorage(key))
}
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
