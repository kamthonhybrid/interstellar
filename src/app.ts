import express from 'express'
import AppRoute from './routes/app.routes'

class App {
  public server

  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
  }


  middlewares() {
    this.server.use(express.json())
    this.server.use(function (req, res, next) {

      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE'
      )
      next()
    })
  }

  routes() {
    this.server.use('/interstellar', AppRoute)
  }

}


export default new App().server
