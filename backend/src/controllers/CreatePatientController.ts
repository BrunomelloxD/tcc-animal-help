import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import Patients from '../models/Patient'

class CreatePatientController {
    async create(req: Request, res: Response) {
        try {
            const { name, description, ongId } = req.body

            const repository = getRepository(Patients)

            const requestImages = req.files as Express.Multer.File[]

            const images = requestImages.map(image => {
                return { path: image.filename }
            })

            const data = repository.create({
                name,
                description,
                images,
                ongId
            })

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                description: Yup.string().required(),
                images: Yup.array(
                    Yup.object().shape({
                        path: Yup.string().required()
                    })
                ),
                ongId: Yup.number().required()
            })

            await schema.validate(data, {
                abortEarly: false
            })

            const patient = repository.create(data)
            await repository.save(patient)

            return res.status(201).json(patient)
        } catch (error) {
            return console.log(error)
        }
    }
}

export default new CreatePatientController()
