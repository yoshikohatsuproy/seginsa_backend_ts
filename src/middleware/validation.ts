import type { Response, Request, NextFunction } from "express";
import { validationResult } from 'express-validator'


export const handleInputErrors = ( req : Request, res : Response, next :NextFunction) => {
    let errors = validationResult(req) 

    if (!errors.isEmpty()) {
        return res.status(400).json({ error : errors.array()})
    }

    next()
}