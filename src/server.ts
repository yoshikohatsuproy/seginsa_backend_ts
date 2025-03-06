import express from 'express'
import morgan from 'morgan'
import marcaRoutes from './presentation/marca/marca.routes'
import productoRoutes from './presentation/products/product.routes'

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/marcas', marcaRoutes)
app.use('/api/productos', productoRoutes)

export default app