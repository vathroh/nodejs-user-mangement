import { NextFunction, Request, Response } from "express";
import logger from "../logger";

const testMiddlware = (role:string)=>(_req:Request,_res:Response, next:NextFunction)=>{
    logger.info(role)

    next()
}

export default testMiddlware