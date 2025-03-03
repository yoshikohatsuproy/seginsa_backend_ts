import { Router } from 'express'
import { body, param } from 'express-validator'
import { MarcaController } from './marca.controller';
import { handleInputErrors } from '../../middleware/validation';

const router = Router();

router.get('/', MarcaController.getAll);
router.get('/:id', 
    param('id').isNumeric().withMessage('El id debe ser numérico'),
    handleInputErrors,
    MarcaController.getOne);

router.post('/',
    body('marcaName').notEmpty().withMessage('El nombre de la marca es obligatoria'),
    handleInputErrors,
    MarcaController.create);

router.put('/',
    param('id').isNumeric().withMessage('El id debe ser numérico'),
    body('marcaName').notEmpty().withMessage('El nombre de la marca es obligatoria'),
    handleInputErrors,
    MarcaController.update);

export default router