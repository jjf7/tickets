import {Request} from 'express';

export interface IUser {
	id?:number;
	id_tipouser?:number;
	nombre?:string;
	mail?:string;
	pass?:string
}

export interface ITicket{
	id?:number;
	id_user?:number;
	ticket_pedido?:string;
	role?:string
}

export interface IRequest extends Request{
	user?:IUser;
}