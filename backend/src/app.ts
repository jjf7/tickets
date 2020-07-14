import express, {Application} from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes'
import ticketsRoutes from './routes/tickets.routes'

// SETTINGS
const app:Application = express()


app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, authorization, Origin, Content-Type, Accept" );
    next();
});

app.set('port', process.env.PORT || 4000)

// MIDDLEWARES

app.use(express.json())
app.use(express.urlencoded({extended:false}))





// ROUTES
app.use(authRoutes)
app.use(ticketsRoutes)

export default app;