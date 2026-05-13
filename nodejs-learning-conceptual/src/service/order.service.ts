import path from "path";
import fs from "fs/promises"
import type { Order } from "../types";

const filepath = path.join(process.cwd(),"db","data.json")

class OrderService {
    private async readData() : Promise<Order[]> {
        try {
            const data = await fs.readFile(filepath,"utf-8")
            return JSON.parse(data)
        } catch {
            return []
        }
    }

    private async writeData(data:Order[]){
        await fs.writeFile(filepath,JSON.stringify(data,null,2))
    }

    async get(){
        const data = await this.readData()
        return data
    }

    async getById(id:string){
        const data = await this.readData()
        return data.find(order=>order.id===id) || null
    }

    async create(order : Omit<Order,"id">){
        const data = await this.readData()
        const newOrder = {
            id: Date.now().toString(),
            ...order
        }
        data.push(newOrder)
        await this.writeData(data)
    }

    async update(id : string, updates : Partial<Omit<Order,"id">>) : Promise<Order | null>{
        const data = await this.readData()
        const i = data.findIndex(order=>order.id === id)
        if(i===-1) return null

        data[i] = {...data[i], ...updates} as Order
        await this.writeData(data)
        return data[i]
    }

    async delete(id:string){
        const data = await this.readData()
        const i = data.findIndex(order=>order.id === id)
        if(i===-1) return false

        data.splice(i,1)

        await this.writeData(data)
        return true
    }
}

export const orderService = new OrderService()