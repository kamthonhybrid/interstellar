import { NextFunction, Request, Response } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import msg from '../constants/msg.json'
// import prisma from '../services/prisma'



export async function auth (req: Request, res: Response, next: NextFunction) {
  try {
    // console.log('Header ', req.headers)


    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) return res.status(401).json({code: 103, message: msg["103"]})

    const apiKey = req.header('api-key')
    if (!apiKey) return res.status(401).json({code: 106, message: msg["106"]})

    const verified = jwt.verify(token!, process.env.JWT_SECRET as string) as JwtPayload
    if (!verified) return res.status(401).json({code: 104, message: msg["104"]})

    const tokenDecode: any = jwt.decode(token)
    // const chkBlocklist = await prisma.token_blocklist.findFirst({where: {jti: tokenDecode['jti'] }})
    // if (chkBlocklist) return res.status(401).json({ message:msg[104] })


    // const user = await prisma.gRID_USER.findUnique({where: {user_id: verified.user_id }})
    // if (!user) return res.status(400).json({message:msg[101]})

    // req.body.id = verified.user_id
    // req.body.role = verified.role
    req.body.token = token
    next()
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
