import { Readable } from "stream"
export async function fromStreamToStr(strm: Readable): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: any = []
        strm.on("error", (e)=>{
            reject(e) 
        })
        strm.on("data", (chunk) => {
            chunks.push(chunk)
        })
        strm.on('end', () => {
            const result = Buffer.concat(chunks).toString('utf-8')
            resolve(result)
        })
    })
}