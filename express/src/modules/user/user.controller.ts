import type { Request, Response } from "express"
import { userService } from "./user.service"

const getUsers = async(req:Request,res:Response)=>{
    try {
        const result = await userService.getUsersFromDB()
        res.status(200).json({
            success: true,
            message: "Users retrived successfully!",
            data: result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message: error.message,
            error: error
        })
    }
}

const getUser = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const result = await userService.getUserFromDB(id as string)
        if(result.rows.length === 0){
            res.status(404).json({
            success: false,
            message: "User not found!",
            data:{}
        })
        return
        }

        res.status(200).json({
            success: true,
            message: "User retrived successfully!",
            data: result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message: error.message,
            error: error
        })
    }
}

const createUser = async(req : Request, res : Response)=>{
    const body = req.body
    try {
        const result = await userService.createUserIntoDB(body)
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message: error.message,
            error: error
        })
    }
}

const updateUser = async(req:Request,res:Response)=>{
    const {id} = req.params
    const body = req.body
    try {
        const result = await userService.updateUserIntoDB(body,id as string)
        if(result.rows.length === 0){
            res.status(404).json({
            success: false,
            message: "User not found!",
            data:{}
        })
        return
        }
    res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: result.rows[0]
    })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message: error.message,
            error: error
        })
    }
}

const deleteUser = async(req:Request,res:Response)=>{

    try {    
        const {id} = req.params
        const result = await userService.deleteUserFromDB(id as string)
        if(result.rows.length === 0){
            res.status(404).json({
            success: false,
            message: "User not found!",
            data: {}
        })
        return
        }
        res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message: error.message,
            error: error
        })
    }
}

export const userController = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}