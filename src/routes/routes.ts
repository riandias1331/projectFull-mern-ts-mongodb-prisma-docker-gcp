import { Router } from 'express'
const route: Router = Router()


import * as userController from '../controllers/userController'
import * as auth from '../middlewares/auth'
import validateUser from '../utils/validator'


//Private Routes
route.get('/users', auth.authMiddleware, userController.getUserAll)
route.get('/users/:id', auth.authMiddleware, userController.getUser)
route.put('/users', auth.authMiddleware, validateUser, userController.updateUser)
route.delete('/users/:id', auth.authMiddleware, userController.deleteUser)
route.delete('/users', auth.authMiddleware, userController.deleteUserAll)

//Public Routes
route.post('/users', validateUser, userController.createUser)
route.post('/api/register', validateUser, userController.register)
route.post('/api/login', userController.login)

// Test error
route.get('/test-error', (req, res, next) => {
   try {
    throw new Error('Erro async via next')
  } catch (err) {
    next(err)
  }
})

export default route