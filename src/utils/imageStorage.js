export const storeImage = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      const imageKey = `hydra-image-${Date.now()}`
      localStorage.setItem(imageKey, base64String)
      resolve(imageKey)
    }
    reader.readAsDataURL(file)
  })
}

export const getImage = (key) => {
  return localStorage.getItem(key)
}

export const removeImage = (key) => {
  localStorage.removeItem(key)
}