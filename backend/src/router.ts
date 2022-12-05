import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'

// Rotas
import authMiddleware from './middlewares/authMiddleware'
import CreateUserController from './controllers/CreateUserController'
import AuthController from './controllers/AuthController'

import CreateOngController from './controllers/CreateOngController'
import CreatePatientController from './controllers/CreatePatientController'

import GetAllOngsController from './controllers/GetAllOngsController'
import GetOngController from './controllers/GetOngController'
import GetAllUsersController from './controllers/GetAllUsersController'
import GetAllPatientController from './controllers/GetAllPatientsController'
import GetPatientController from './controllers/GetPatientController'

const routes = Router()
//Configurações do Multer para realizar o upload das imagens
const upload = multer(uploadConfig)

/**
 * // C - CREATE - POST
 * // R - READ - GET
 * // U - UPDATE - PUT
 * // D - DELETE - DELETE
 */

/**
 * Query Params: http://localhost:3000/users?search=bruno
 * Route Params: http://localhost:3000/users/1
 * Body: http://localhost:3000/users/1
 */

routes.post('/users', CreateUserController.handle)
routes.post('/auth', AuthController.antheticate)
routes.get('/users', authMiddleware, CreateUserController.index)

routes.post('/ongs', upload.array('images'), CreateOngController.create)
routes.get('/ongs', GetAllOngsController.handle)
routes.get('/ongs/:id', GetOngController.show)

routes.get('/listUsers', GetAllUsersController.handle)

routes.post('/patient', upload.array('images'), CreatePatientController.create)
routes.get('/listPatients', GetAllPatientController.handle)
routes.get('/listPatients/:id', GetPatientController.show)

export { routes }
