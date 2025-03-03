import type { Request, Response } from 'express'
import { prisma } from '../../data/postgres';

export class ProductController {
    static getAll = async (req : Request, res: Response) =>{
        const productos = await prisma.producto.findMany()
        return res.json({ data : productos})
    }

    static getOne = async (req : Request, res: Response) =>{
        const id = req.params.id; 
        const producto = await prisma.producto.findFirst({ where : { id }});

        
        return  (producto) 
            ?   res.json({ data : producto})
            :   res.status(404).json( { error :`Producto con id ${id} no encontrado` });
        
    }   

    
    static create = async (req : Request, res: Response) =>{

        const { productoDescripcion, productoCode, productoUnidad, marcaId, precioUnit, image, createdBy, updatedBy } = req.body;
 
        const producto = await prisma.producto.create({ data : { productoDescripcion, productoCode, productoUnidad,marcaId, precioUnit, image, createdBy, updatedBy  }})

        res.send({ data : producto})
    }

    static update = async (req : Request, res: Response) =>{

        const id = req.params.id; 
        const producto = await prisma.producto.findFirst({ where : { id }});
        if (!producto ) return res.status(404).json( { error :`Producto con id ${id} no encontrado` });

        const { productoDescripcion, productoUnidad, marcaId, precioUnit, image, updatedBy } = req.body;

       
        const productoUpdate = await prisma.producto.update({ where : { id }, data : { ...producto, productoDescripcion, productoUnidad, marcaId, precioUnit, image, updatedBy, updatedAt: new Date()   }})
        
        res.send({ data : productoUpdate})
    }


    
    static delete = async (req : Request, res: Response) =>{

        const id = req.params.id; 
        const producto = await prisma.producto.findFirst({ where : { id }});
        if (!producto ) return res.status(404).json( { error :`Producto con id ${id} no encontrado` });

        const {  updatedBy } = req.body;
        const productoUpdate = await prisma.producto.update({ where : { id }, data : { ...producto, isDelete: true,   updatedBy, updatedAt: new Date()   }})
        
        res.send({ data : productoUpdate})
    }
}