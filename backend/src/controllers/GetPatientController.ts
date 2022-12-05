import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Patients from '../models/Patient'

import patientView from '../views/patientView'

class getPatientController {
    async show(req: Request, res: Response) {
        const { id } = req.params

        try {
            const repository = getRepository(Patients)

            /**
             * relations: ['images']
             * Para retornas as imagens cadastradas
             */

            const ong = await repository.findOne(id, {
                relations: ['images']
            })

            if (!ong) {
                return res.status(404).send({ info: 'Patient nao encontrada' })
            }

            return res.json(patientView.render(ong))
        } catch (e) {
            console.log(e)
        }
    }
}

export default new getPatientController()
