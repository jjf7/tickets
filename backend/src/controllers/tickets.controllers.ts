import {Request,Response} from 'express'
import connection from '../database'
import {IRequest,IUser,ITicket} from '../interfaces'




function getTickets(user:IUser|undefined,tickets:ITicket[]){
	
	if (user!==undefined && user.id_tipouser === 1) return tickets
	
	return tickets.filter(t => t.id_user === (user!==undefined && user.id))
}


export const ticketComplete = async (req:IRequest,res:Response):Promise<Response> => {
	
	const {id} = req.params;
	
	try{
		
		
		if(req.user==undefined) return  res.sendStatus(403)
			
		const conn = await connection();
		
		
		const [result] = await conn.query('SELECT * FROM ticket  where  id_user=? and id=?',[req.user.id,id])
		
		const rows = JSON.parse(JSON.stringify(result))
		
		
		
		if(rows.length > 0){
			
			await conn.query("update ticket set realizado='si' where id=?",[id])
			
			conn.end();
			
			return res.json('Ticket completado!')	
			
		}else{
			
			return res.json('No puedes completar un ticket que no se te ha asignado cara e perro =)')	
			
		}
		
	}catch(e){
	return res.status(500).json(e.message)	
		
	}
	
}

export const allTickets = async (req:IRequest,res:Response) => {
	
	try{
		
		const conn = await connection();
		
		const [result] = await conn.query('SELECT T.*,U.nombre FROM ticket as T join usuarios as U on T.id_user=U.id where T.realizado="no" order by id DESC')
		
		const rows = JSON.parse(JSON.stringify(result))
		
		conn.end();		
		
		return res.json(getTickets(req.user,rows))
		
		
	}catch(e){
		
		console.log(e);
		return res.status(500).json(e.message)
		
	}
	
}


export const removeTickets = async(req:Request,res:Response) => {
	
	const {id} = req.params;
	
	console.log(id)
	
	try{
		
		const conn = await connection();
		
		
		const [results] = await conn.query('select * from ticket  where id=?',[id]);
		
		const data = JSON.parse(JSON.stringify(results));
		
		if(data.length>0)
		{
			await conn.query('delete from ticket where id=?',[id]);
		
			conn.end();
			
			return res.json('Ticket eliminado!')
			
		}else{
			return res.json('No existe el ticket')
		}
		
		
		
		
	}catch(e){
		return res.status(500).json(e.message)
	}
	
}

export const updateTicket = async(req:Request,res:Response) => {
	
	const {id} = req.params;
	const {user,ticket} = req.body;
	
	try{
		
		const conn = await connection();
		
		const [results] = await conn.query('select * from ticket  where id=?',[id]);
		
		const data = JSON.parse(JSON.stringify(results));
		
		if(data.length>0)
		{
			await conn.query('update ticket set id_user=?, ticket_pedido=? where id=?',[user,ticket,id]);
			
			conn.end();
		
			return res.json('Ticket actualizado!')
			
		}else{
			return res.json('No existe el ticket')
		}
		
		
		
		
	}catch(e){
		return res.status(500).json(e.message)
	}
}

export const addTicket = async(req:Request,res:Response) => {
	
	const {user,ticket} = req.body;
	
	try{
		
		const conn = await connection();
		
		await conn.query('insert into ticket(id_user,ticket_pedido) values(?,?)',[user,ticket]);
		
		conn.end();
		
		res.status(200).json('Ticket creado satisfactoriamente!')
		
		
	}catch(e){
		return res.status(500).json(e.message)
	}
	
	
	
}

export const getTicket = async(req:Request,res:Response) => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await connection();
		
		
		const [results] = await conn.query('select * from ticket  where id=?',[id]);
		
		const data = JSON.parse(JSON.stringify(results));
		
		conn.end();
		
		if(data.length>0)
		{
			
			return res.status(200).json(data)
			
		}else{
			return res.json('No existe el ticket')
		}
		
		
	}catch(e){
		return res.status(500).json(e.message)
	}

}

