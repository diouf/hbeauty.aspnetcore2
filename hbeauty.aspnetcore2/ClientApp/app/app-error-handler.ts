import {ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler
{
    constructor(){}
    handleError(error:any){
        console.log('global error handler.',error);
    }
}