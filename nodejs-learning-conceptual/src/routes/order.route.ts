import { orderService } from "../service/order.service";
import type { Order, Req, Res } from "../types";
import { extractRequestInfo, sendResponse } from "../utils";

export const orderRoute = async (req:Req,res:Res)=>{
    const {method,params,body} = await extractRequestInfo<Omit<Order,"id">>(req)
    const orderId = params[1]

    try {
        if(method === "GET" && !orderId){
            const orders = await orderService.get()
            return sendResponse(200,res,{message:"Orders Retrived",data:orders})
        }

        if(method === "GET" && orderId){
            const order = await orderService.getById(orderId)
            return sendResponse(order?200:404,res,{message:order?"Order retrieved successfully":"Order not found",data:order,error:order?false:true})
        }

        if(method === "DELETE" && orderId){
            const deleted = await orderService.delete(orderId)
            return sendResponse(deleted?200:404,res,{message:deleted?"Order deleted successfully":"Order not found",error:deleted?false:true})
        }

        if(method === "POST" && body){
            const newOrder = orderService.create(body)
            return sendResponse(200,res,{message:"Order created successfully",data:newOrder})
            
        }

        if(method === "PUT" && body && orderId){
            const updatedOrder = await orderService.update(orderId,body)
            return sendResponse(updatedOrder?200:404,res,{message:updatedOrder?"Order updated successfully":"Failed to update product",data:updatedOrder})
        }

        sendResponse(404,res,{message:"not found",error:true})

    } catch (error) {
        const err = error instanceof Error ? error.message : "Server Error"
        sendResponse(500,res,{message:err})   
    }


}