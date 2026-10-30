// Shrinks a photo in the browser before sending it to Gemma (faster upload, fewer tokens)
// and makes a tiny thumbnail for the Haunted Passport.

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read that image.'))
    }
    img.src = url
  })
}

function resize(img, maxSide, quality) {
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(img.width * scale)
  canvas.height = Math.round(img.height * scale)
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', quality)
}

export async function prepareSnapshot(file) {
  const img = await loadImage(file)
  const full = resize(img, 768, 0.8)
  return {
    dataUrl: full,
    base64: full.split(',')[1],
    mimeType: 'image/jpeg',
    thumb: resize(img, 160, 0.6),
  }
}
