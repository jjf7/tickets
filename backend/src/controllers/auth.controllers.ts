import {Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import connection from '../database'
import {generateToken} from '../helpers'
import {IUser,IRequest} from '../interfaces'



export const users = async(req:Request,res:Response):Promise<Response> => {
	
	try{
		
		const conn = await connection()
		
		const [result] = await conn.query('select * from usuarios where id_tipouser=2',[req.body.token])
		
		const rows = JSON.parse(JSON.stringify(result))
		
		conn.end();
		return res.status(200).json(rows)
		
		
	}catch(e){
		
		return res.status(500).json(e.message)
		
	}
	
}


export const logout = async(req:Request,res:Response):Promise<Response> => {
	
	try{
		
		const conn = await connection()
		
		await conn.query('delete FROM refresh_token where token=?',[req.body.token])
		
		conn.end();
		return res.sendStatus(204)
		
		
	}catch(e){
		
		return res.status(500).json(e.message)
		
	}
	
}


/*

export const postToken = async(req:Request,res:Response):Promise<Response|void> => {
	
	const { refresh } = req.body;
	
	if( refresh == null) return res.sendStatus(401)
	
	try{
		
		const conn = await connection();
		
		const [result] = await conn.query('SELECT * FROM refresh_token where token=?',[refresh])
		
		const data = JSON.parse(JSON.stringify(result))
		
		conn.end();		
		
		if(data.length > 0)
		{
			
			jwt.verify(refresh,`${process.env.JWT_REFRESH_TOKEN}` , (err:any,user:any) => {
				
				if(err) return res.sendStatus(403)
					
				console.log(user)
				
				const token = generateToken({id:user.id,id_tipouser:user.id_tipouser,nombre:user.nombre,mail:user.mail,pass:user.pass})
					
				return res.json({token})
				
			})
			
		}else{
			
			return res.sendStatus(403)
			
		}
		
		
	}catch(e){
		
		console.log(e);
		return res.status(500).json(e.message)
		
	}
	
	
}

*/


export const signin = async(req:Request,res:Response):Promise<Response> => {
	
	const {username,pass} = req.body
	console.log(username,pass);
	try{
		
		const conn = await connection();
		
		const [result] = await conn.query('SELECT * FROM usuarios where mail=?',[username])
		
		const data = JSON.parse(JSON.stringify(result))
		
		
		
		if(data.length>0)
		{
			if(await bcrypt.compare(pass,data[0].pass))
			{
				
				const token = generateToken(data[0])
				
				//const refreshToken = await jwt.sign(data[0], `${process.env.JWT_REFRESH_TOKEN}`)
				
				//await conn.query('INSERT INTO refresh_token(token) values(?)',[refreshToken]) 0414 098 9961
				
				conn.end();
				
				const role = data[0].id_tipouser === 1 ? 'Administrador' : 'Usuario';
				
				return res.json({accessToken:token,id:data[0].id,nombre:data[0].nombre,email:data[0].mail,role})
				
				
			}else{
				return res.status(401).json('Unauthorized')
			}	
			
		}else{
			return res.status(401).json('Unauthorized')
		}
		
		
		
	}catch(e){
		
		console.log(e);
		return res.status(500).json(e.message)
		
	}
	
}



export const signup = async(req:Request,res:Response):Promise<Response|void>=>{
	
	const {username,tipo,email,password} = req.body
	
	console.log(username,tipo,email,password)
	
	try{
		const pass= await bcrypt.hash(password,10)
		
		const conn = await connection();
		
		await conn.query('INSERT INTO usuarios(id_tipouser,nombre,mail,pass) values(?,?,?,?)',[tipo,username,email,pass])
		
		conn.end()
		
		res.status(200).json({message:'El usuario se ha registrado satisfactoriamente'})
		
		
	
	}
	catch(e){
		console.log(e);
		return res.status(500).json(e.message)
	}
	
	
}