import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {IRequest} from '../interfaces'


export const authUserJWT = (req:IRequest,res:Response,next:NextFunction):Response|void => {
	
	const authHeader = req.headers['authorization']
	
	const token = authHeader && authHeader.split(' ')[1]
	
	
	
	if(token==null) return res.sendStatus(401)
	
	jwt.verify(token,`${process.env.JWT_SECRET_TOKEN}`, (err,user) => {
		
		if(err) return res.sendStatus(403)
  
		req.user = user
		
        return next()		
 
	})
	
}


export const isAdmin = (req:IRequest,res:Response,next:NextFunction):Response|void => {

	if(req.user!==undefined && req.user.id_tipouser===1){
		return next();
	}
	
	return res.status(403).json('Unauthorized!')
	
}


export const isUser = (req:IRequest,res:Response,next:NextFunction):Response|void => {

	if(req.user!==undefined && req.user.id_tipouser===2){
		return next();
	}
	
	res.status(403).json('Unauthorized!')
	
}


