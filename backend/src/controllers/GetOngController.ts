import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Ongs from '../models/Ongs'

import ongView from '../views/ongView'

class getOngController {
    async show(req: Request, res: Response) {
        const { id } = req.params

        const repository = getRepository(Ongs)

        /**
         * relations: ['images']
         * Para retornas as imagens cadastradas
         */

        const ong = await repository.findOne(id, {
            relations: ['images', 'patients', 'patients.images']
        })

        if (!ong) {
            return res.status(404).send({ info: 'Ong nao encontrada' })
        }

        console.log('ong', ong)
        return res.json(ongView.render(ong))
    }
}

export default new getOngController()
