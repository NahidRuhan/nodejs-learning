import { ServerResponse, type IncomingMessage } from "node:http";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
export type Req = IncomingMessage & {method:Method}
export type Res = ServerResponse

export interface Order{
    id:string
    customer:string
    quantity:number
    food:string
    price:number
}