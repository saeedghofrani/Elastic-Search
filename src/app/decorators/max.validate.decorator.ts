import {BadRequestException, createParamDecorator, ExecutionContext} from "@nestjs/common";
import {Request} from "express"

export const MaxNumber=createParamDecorator((data:string,ctx:ExecutionContext)=>{
    const request:Request=ctx.switchToHttp().getRequest()
    const maxNum=request.params[data]
    if (parseInt(maxNum)>10000)
    {
        throw new BadRequestException("Less than 10000")
    }
    else return parseInt(maxNum)
})