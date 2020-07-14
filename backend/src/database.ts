import mysql from 'mysql2/promise'

export default async function connection():Promise<mysql.Pool>{
	
	const conex = await mysql.createPool({
		host: process.env.HOST_CLEVER_CLOUD,
		user: process.env.USER_CLEVER_CLOUD,
		password: process.env.PASSWORD_CLEVER_CLOUD ,
		database: process.env.DATABASE_CLEVER_CLOUD ,
		connectionLimit: 10
	});
	
	return conex;
	
}