import express from 'express'

import marcaRoutes from './presentation/marca/marca.routes'

const app = express();


app.use(express.json());

app.use('/api/marcas', marcaRoutes)
export default app