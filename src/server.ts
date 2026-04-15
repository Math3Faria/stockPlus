import express from 'express'
import { EnvVar } from './config/EnvVar'
import cors from 'cors'
import router from './routes/routes'

const app = express();
app.use(cors())
app.use(express.json());
app.use('/', router);

app.listen(EnvVar.SERVER_PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${EnvVar.SERVER_PORT}`)
})