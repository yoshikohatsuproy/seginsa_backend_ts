import type { Request, Response } from 'express'
import { prisma } from '../../data/postgres';

export class MarcaController {
    static getAll = async (req: Request, res: Response) => {
        try {

            const marcas = await prisma.marca.findMany()
            return res.json({ data: marcas })
        } catch (error) {

            return res.status(500).json({ error: error })
        }

    }

    static getOne = async (req: Request, res: Response) => {

        try {
            const id = +req.params.id;
            if (isNaN(id)) return res.status(400).json({ error: `El id debe ser un número` });
            const marca = await prisma.marca.findFirst({ where: { id } });


            return (marca)
                ? res.json({ data: marca })
                : res.status(404).json({ error: `Marca con id ${id} no encontrado` });
        } catch (error) {

            return res.status(500).json({ error: error })
        }



    }


    static create = async (req: Request, res: Response) => {

        try {
            const { marcaName } = req.body;

            const marca = await prisma.marca.create({ data: { marcaName } })

            return res.send({ data: marca })
        } catch (error) {

            return res.status(500).json({ error: error })
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) return res.status(400).json({ error: `El id debe ser un número` });
            const marca = await prisma.marca.findFirst({ where: { id } });
            if (!marca) return res.status(404).json({ error: `Marca con id ${id} no encontrado` });


            const { marcaName } = req.body;

            const marcaUpdate = await prisma.marca.update({ where: { id }, data: { ...marca, marcaName } })

            return res.send({ data: marcaUpdate })
        } catch (error) {

            return res.status(500).json({ error: error })
        }

    }


}