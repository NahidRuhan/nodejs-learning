import { createServer, IncomingMessage, ServerResponse } from "node:http"
import type { Req, Res } from "./types"
import { sendResponse } from "./utils"
import { orderRoute } from "./routes/order.route"

const port = 3000

const server = createServer((req,res)=>{
    const url = req.url

    if(url === '/') return sendResponse(200,res,{message:"Welcome to root"})

    if(url?.startsWith('/orders')) return orderRoute(req as Req, res)



    sendResponse(404,res,{message:"Not found",error:true})
})

server.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})