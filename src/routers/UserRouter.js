import { Router } from 'express'
import { UserManager } from '../models/User.js'

export const userRouter = Router()

// registro

userRouter.get('/register', function registerView(req, res) {
  res.render('register.handlebars', {
    titulo: 'Registro'
  })
})


userRouter.post('/register', async function registrarUsuario(req, res) {
  try {
    await UserManager.create(req.body)
    res.status(200).redirect("/api/sesiones/login")
  } catch (error) {
    res.status(400).redirect('/api/usuarios/register')
  }
})


