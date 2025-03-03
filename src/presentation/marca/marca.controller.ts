import type { Request, Response } from 'express'
import { prisma } from '../../data/postgres';

export class MarcaController {
    static getAll = async (req : Request, res: Response) =>{
        const marcas = await prisma.marca.findMany()
        return res.json({ data : marcas})
    }

    static getOne = async (req : Request, res: Response) =>{
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json( { error :`El id debe ser un número` });
        const marca = await prisma.marca.findFirst({ where : { id }});

        
        return  (marca) 
            ?   res.json({ data : marca})
            :   res.status(404).json( { error :`Marca con id ${id} no encontrado` });
        
    }   

    
    static create = async (req : Request, res: Response) =>{

        const { marcaName } = req.body;
 
        const marca = await prisma.marca.create({ data : { marcaName }})

        res.send({ data : marca})
    }

    static update = async (req : Request, res: Response) =>{

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json( { error :`El id debe ser un número` });
        const marca = await prisma.marca.findFirst({ where : { id }});
        if (!marca ) return res.status(404).json( { error :`Marca con id ${id} no encontrado` });


        const { marcaName } = req.body;
      
        const marcaUpdate = await prisma.marca.update({ where : { id }, data : { ...marca, marcaName }})
        
        res.send({ data : marcaUpdate})
    }

    
}