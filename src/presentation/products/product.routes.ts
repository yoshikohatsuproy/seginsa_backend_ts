import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProductController } from './product.controller';
import { handleInputErrors } from '../../middleware/validation';

const router = Router();

router.get('/', ProductController.getAll);
router.get('/:id',
    param('id').isUUID().withMessage('El id del producto debe ser un uuid'),
    ProductController.getOne);

router.post('/',
    body('productoDescripcion').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('productoCode').notEmpty().withMessage('El código del producto es obligatorio'),
    body('productoUnidad').notEmpty().withMessage('La unidad del producto es obligatorio'),
    body('marcaId').notEmpty().withMessage('La marca del producto es obligatorio'),
    body('marcaId').isNumeric().withMessage('La marca tiene que ser un número'),
    body('image').notEmpty().withMessage('Laimagen del producto es obligatorio'),
    body('createdBy').notEmpty().withMessage('El correo usuario creador del producto es obligatorio'),
    body('createdBy').isEmail().withMessage('CreatedBy tiene que ser un correo'),
    body('updatedBy').notEmpty().withMessage('El correo usuario actualizador del producto es obligatorio'),
    body('updatedBy').isEmail().withMessage('UpdatedBy tiene que ser un correo'),

    handleInputErrors,
    ProductController.create);

router.put('/:id',
    param('id').isUUID().withMessage('El id del producto debe ser un uuid'),
    body('productoDescripcion').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('productoUnidad').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('marcaId').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('marcaId').isNumeric().withMessage('La marca tiene que ser un número'),
    body('image').notEmpty().withMessage('Laimagen del producto es obligatorio'),
    body('updatedBy').notEmpty().withMessage('El correo usuario actualizador del producto es obligatorio'),
    body('updatedBy').isEmail().withMessage('UpdatedBy tiene que ser un correo'),
    handleInputErrors,
    ProductController.update);

router.patch('/:id',
    param('id').isUUID().withMessage('El id del producto debe ser un uuid'),
    body('updatedBy').notEmpty().withMessage('El correo usuario actualizador del producto es obligatorio'),
    body('updatedBy').isEmail().withMessage('UpdatedBy tiene que ser un correo'),
    handleInputErrors,
    ProductController.update);

export default router