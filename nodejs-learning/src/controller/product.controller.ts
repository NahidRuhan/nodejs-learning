import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (req:IncomingMessage,res:ServerResponse) => {

    const url = req.url
    const urlParts = url?.split("/")
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null
    const method = req.method

    if(url === "/products" && method === "GET"){
        try {
            const products = readProduct()
            return sendResponse(res,200,true,"Producrs retrived successfully",products)
        } catch (error) {
            const products = readProduct()
            return sendResponse(res,500,false,"Something went wrong",error)
        }
    }
    else if(id !== null && method === "GET"){
        const products = readProduct()
        const product = products.find((p:IProduct)=>p.id===id)
        if(!product){
            res.writeHead(404,{"content-type":"application/json"})
            res.end(JSON.stringify({message:"Not found",data:null}))
        }
        else{
            res.writeHead(200,{"content-type":"application/json"})
            res.end(JSON.stringify({message:"Product retrived successfully",data:product}))
        }
    }
    else if(url === "/products" && method === "POST"){
        const body = await parseBody(req)
        // console.log("Body: ",body)
        const products = readProduct()
        const newProduct = {
            id: Date.now(),
            ...body
        }
        products.push(newProduct)
        console.log(products)
        insertProduct(products)
        res.writeHead(200,{"content-type":"application/json"})
        res.end(JSON.stringify({message:"Product created successfully",data:newProduct}))
    }
    else if(id !== null && method === "PUT"){
        const body = await parseBody(req)
        const products = readProduct()
        const index = products.findIndex((p:IProduct)=>p.id === id)
        console.log(index)
        if(index<0){
            res.writeHead(404,{"content-type":"application/json"})
            res.end(JSON.stringify({message:"Not found",data:null}))
        }
        // console.log(products[index])
        products[index] = {id: products[index].id,...body}
        insertProduct(products)
        res.writeHead(404,{"content-type":"application/json"})
        res.end(JSON.stringify({message:"Product updated successfully",data:products[index]}))
    }
    else if(id !== null && method === "DELETE"){
        const products = readProduct()
        const index = products.findIndex((p:IProduct)=>p.id === id)
        console.log(index)
        if(index<0){
            res.writeHead(404,{"content-type":"application/json"})
            res.end(JSON.stringify({message:"Not found",data:null}))
        }
        products.splice(index,1)
        insertProduct(products)
        res.writeHead(404,{"content-type":"application/json"})
        res.end(JSON.stringify({message:"Product deleted successfully"}))
        
    }
    else{
        res.writeHead(404,{"content-type":"application/json"})
        res.end(JSON.stringify({message:"Not found"}))
    }
}