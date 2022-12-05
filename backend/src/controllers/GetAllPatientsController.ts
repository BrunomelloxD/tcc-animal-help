import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Patients from '../models/Patient'

import patientView from '../views/patientView'

class GetAllOngsController {
    async handle(req: Request, res: Response) {
        const repository = getRepository(Patients)

        /**
         * relations: ['images']
         * Para retornas as imagens cadastradas
         */
        const ongs = await repository.find({
            relations: ['images']
        })

        return res.json(patientView.renderMany(ongs))
    }
}

export default new GetAllOngsController()
