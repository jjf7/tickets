import {Router} from 'express'
import {authUserJWT,isAdmin} from '../middlewares/'
const router = Router();

import {logout,signup,signin,users} from '../controllers/auth.controllers'


router.post('/api/auth/signin', signin )

router.post('/api/auth/signup',[authUserJWT,isAdmin], signup)

router.get('/api/auth/users',[authUserJWT,isAdmin], users)


export default router