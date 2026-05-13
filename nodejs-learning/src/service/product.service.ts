import path from "path"
import fs from "fs"
const filePath = path.join(process.cwd(),"./src/database/db.json")

export const readProduct = () => {
    const products = fs.readFileSync(filePath,"utf-8")
    // console.log(JSON.parse(products))
    return JSON.parse(products)
}

export const insertProduct = (payLoad:any) => {
    fs.writeFileSync(filePath,JSON.stringify(payLoad))
}