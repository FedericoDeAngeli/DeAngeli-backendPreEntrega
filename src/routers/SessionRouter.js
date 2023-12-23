import { Router } from "express"
import { UserManager } from "../models/User.js"

export const sessionRouter = Router()


sessionRouter.get('/login', function loginView(req, res) {
    res.render('login.handlebars', {
      titulo: 'Login'
    })
  })
  
  sessionRouter.post('/login', async (req, res) => {
    try {
      const email = req.body.email
      const password = req.body.password
      console.log(email, password)
  
      let datosUsuario
  
      if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        datosUsuario = {
          email: 'admin',
          name: 'admin',
          lastname: 'admin',
          rol: 'admin'
        }
        console.log("Bienvenido Admin")
      } else {
        const usuario = await UserManager.findOne({ email }).lean()
  
        if (!usuario) {
          return res.status(404).send("user failed")
        }
  
        if (password !== usuario.password) {
            return res.status(404).send("pass failed")

        }
  
        datosUsuario = {
          email: usuario.email,
          name: usuario.name,
          lastname: usuario.lastname,
          rol: 'usuario'
        }
      }   
    
      req.session['user'] = datosUsuario
      
     res.status(200).redirect("/")
     
    } catch (error) {
        return res.status(400).send("catch")    }
  })
  
  sessionRouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/login')
    })
  })