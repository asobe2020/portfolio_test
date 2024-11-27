import express, { json } from 'express';
import next from "next";
import { PrismaClient } from '@prisma/client';

const port = parseInt(process.env.PORT || "3001", 10);
const dev = process.env.NODE_ENV !== "production";
const server = express();
const app = next({ dev });
const prisma = new PrismaClient();

server.get('/users', async(req, res)=> {
  try{
    const users = await prisma.user.findMany();
    res.json(users)
  }catch(e){
    console.error('users: fetching error ', e);
    res.status(500).json({error: 'Failed to fetch users'});
  }
})

server.post('/users', async(req, res)=>{
  const {name, email} = req.body;
  try{
    const newUser = await prisma.user.create({
      data: {name, email},
    })
    res.status(201).json(newUser)
  }catch(e){
    console.error('error creating user:', e)
    res.status(500).json({error: 'faled to create user'})
  }
})

async function startupServer() {
  await app.prepare();    

  const handle = app.getRequestHandler();
  server.get('*',(req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`,
    );
  });    
}

startupServer();