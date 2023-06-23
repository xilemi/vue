export const imgBase64 = (raw) => {
    return new Promise((resolve, reject) => {
        let fr = new FileReader()
        fr.readAsDataURL(raw)
        fr.onload = function () {
            resolve(this.result)
        }
        fr.onerror = function () {
            reject(new Error('图片转化失败'))
        }
    })
}
