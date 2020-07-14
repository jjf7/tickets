import {Router} from 'express'
import {authUserJWT,isAdmin} from '../middlewares/'

const router = Router();

import {allTickets,getTicket,addTicket,updateTicket,removeTickets,ticketComplete} from '../controllers/tickets.controllers'


router.get('/api/tickets', [authUserJWT], allTickets)
router.get('/api/tickets/:id', [authUserJWT] , getTicket )
router.post('/api/tickets/', [authUserJWT,isAdmin] , addTicket)
router.put('/api/tickets/:id', [authUserJWT,isAdmin] , updateTicket)
router.delete('/api/tickets/:id', [authUserJWT,isAdmin] , removeTickets)

router.get('/api/tickets/complete/:id', authUserJWT, ticketComplete)

export default router
