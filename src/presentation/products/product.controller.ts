import type { Request, Response } from 'express'
import { prisma } from '../../data/postgres';

export class ProductController {
    static getAll = async (req: Request, res: Response) => {

        try {
            const productos = await prisma.producto.findMany()
            return res.json({ data: productos })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    static getOne = async (req: Request, res: Response) => {

        try {
            const id = req.params.id;
            const producto = await prisma.producto.findFirst({ where: { id } });

            return (producto)
                ? res.json({ data: producto })
                : res.status(404).json({ error: `Producto con id ${id} no encontrado` });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }


    }


    static create = async (req: Request, res: Response) => {
        try {
            const { productoDescripcion, productoCode, productoUnidad, marcaId, precioUnit, image, createdBy, updatedBy } = req.body;

            let productoDuplicado = await prisma.producto.findFirst({ where: { productoCode } });
            if (productoDuplicado) return res.status(404).json({ error: `Producto con código ${productoCode} ya existente` })

            const producto = await prisma.producto.create({ data: { productoDescripcion, productoCode, productoUnidad, marcaId, precioUnit, image, createdBy, updatedBy } })

            res.send({ data: producto })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }

    }

    static update = async (req: Request, res: Response) => {
        try {

            const id = req.params.id;
            const producto = await prisma.producto.findFirst({ where: { id } });
            if (!producto) return res.status(404).json({ error: `Producto con id ${id} no encontrado` });

            const { productoDescripcion, productoUnidad, marcaId, precioUnit, image, updatedBy } = req.body;


            const productoUpdate = await prisma.producto.update({ where: { id }, data: { ...producto, productoDescripcion, productoUnidad, marcaId, precioUnit, image, updatedBy, updatedAt: new Date() } })

            res.send({ data: productoUpdate })


        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }



    static delete = async (req: Request, res: Response) => {
        try {

            const id = req.params.id;
            const producto = await prisma.producto.findFirst({ where: { id } });
            if (!producto) return res.status(404).json({ error: `Producto con id ${id} no encontrado` });

            const { updatedBy } = req.body;
            const productoUpdate = await prisma.producto.update({ where: { id }, data: { ...producto, isDelete: true, updatedBy, updatedAt: new Date() } })

            res.send({ data: productoUpdate })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
}