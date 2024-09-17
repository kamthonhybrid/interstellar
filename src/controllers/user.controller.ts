import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import msg from '../constants/msg.json'
import { v4 as uuid } from 'uuid'
import { tokenController } from './token.controller'
import { utils } from '../utils/utility'
const crypto = require("crypto-js")


export const userController = {
  
  async userGetSign(req: Request, res: Response) {

    var timestamp = String(Math.floor(Date.now() / 1000))
    let data = utils.getSign(timestamp)
    utils.genPassword();
    return res.json({ code: 0, message: msg[0], data: { sign: data, timestamp: timestamp } });

  },

  async userGetToken(req: Request, res: Response) {
    const { username, application, sign } = req.body

    const currentTimestamp = Math.floor(Date.now() / 1000);

    console.log(currentTimestamp)

    if (!username || !application || !sign)
      return res.status(400).json({ message: msg[105] })


    try {

      const decrypted = crypto.AES.decrypt(sign, process.env.PRIVATE_KEY).toString(crypto.enc.Utf8)
      if (decrypted == '') {
        return res.status(400).json({ message: msg[102] })
      }

      console.log(decrypted);

      let diffTime = currentTimestamp - decrypted;
      console.log(diffTime);

      if ( diffTime > 900 ) {
        return res.status(400).json({ message: msg[102] })
      }

      const jti: string = uuid()
      const token = jwt.sign(
        { username: username, application: application, jti: jti },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.TOKEN_LIFE }
      )
      res.json({ token: token, username: username, application: application, timestamp: decrypted })
    } catch (error: any) {
      console.error("Error ", req.url, error)
      res.status(500).json({ error: error.message })
    }
  },


  async userList(req: Request, res: Response) {
    try {
      // const userId = req.body.id
      // const userRole = req.body.role
      const respCode = "0";

      let token = await tokenController.getEcsToken() //tokenController.createEcsUser;
      console.log("Token : ", token);

      // return res.json({code: respCode, message: msg[respCode], data: {site: "Test"}});
      return res.json({ code: respCode, message: msg[respCode], data: { site: "Test", token: token } });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  },

}


