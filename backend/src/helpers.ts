import jwt from 'jsonwebtoken'
import {IUser,IRequest} from './interfaces'


export  function generateToken(user:IUser){
	return  jwt.sign(user,`${process.env.JWT_SECRET_TOKEN}`, {expiresIn:86400})
}