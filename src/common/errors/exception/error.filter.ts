import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";


@Catch()
export class ErrorFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const request:Request=host.switchToHttp().getRequest();
        const response:Response=host.switchToHttp().getResponse();
        
        let resp="";       
        let status;

        const ifExist=exception.message.split(" :: ");
        const ifExist2=exception.response;


        if(ifExist2 && ifExist2.message){
            console.log("enter the first");
            
            resp=ifExist2 ? ifExist2.message : ifExist2.error;
            console.log(ifExist2.message);
            
            console.log(resp);
            
            status=ifExist2.statusCode ? ifExist2.statusCode : 400;
            console.log(status);
            
        }
        else if(ifExist && ifExist.length==2){
            console.log("enter the second");
            
            resp=ifExist[1];
            status=HttpStatus[ifExist[0]];
        }
        else{
            console.log("enter the three");
            
            resp=ifExist2 ? ifExist2.error : "INTERNALSERVER";
            status= 500;
        }
        console.log("the message is");
        console.log(resp);
        

        response.status(status).json({
            status:status,
            timeStamp:new Date(),
            method:request.method,
            path:request.url,
            message:resp
        });
    }
}