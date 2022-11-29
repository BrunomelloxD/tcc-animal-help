import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Patients from '../models/Patient'

import patientView from '../views/patientView'

class getOngController {
    async show(req: Request, res: Response) {
        const { id } = req.params

        //const middleware = new getOngMiddleware();

        const repository = getRepository(Patients)

        /**
         * relations: ['images']
         * Para retornas as imagens cadastradas
         */

        const ong = await repository.findOneOrFail(id, {
            relations: ['images']
        })

        if (!ong) {
            return new Error('Ong does not exists!')
        }

        return res.json(patientView.render(ong))
    }
}

export default new getOngController()
