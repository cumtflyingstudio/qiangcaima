import express from "express"
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors"
import getTopMesDao from "./db/apiDao/getTopMesDao.js";

import apiRouter from "./router/api.js"
import selectFoodNameDao from "./db/apiDao/selectFoodNameDao.js";
import selectFoodStateDao from "./db/apiDao/selectFoodStateDao.js";


import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

const PORT = 8089

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/dist/index.html")
})
app.get("/runtime.js",(req,res)=>{
  res.sendFile(__dirname+"/dist/runtime.js")
})
app.get("/pnpm.js",(req,res)=>{
  res.sendFile(__dirname+"/dist/pnpm.js")
})
app.get("/main.js",(req,res)=>{
  res.sendFile(__dirname+"/dist/main.js")
})
app.get("/main.css",(req,res)=>{
  res.sendFile(__dirname+"/dist/main.css")
})



app.use(cors())

app.use("/api", apiRouter)


const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  },
});

export const clients = [];
io.on("connection", async function (socket) {
  clients.push(socket);
  socket.on("disconnect", (reason) => {
    console.log("结束了")
    for (let i = 0; i < clients.length; i++) {
      if (clients[i] === socket) {
        clients.splice(i, 1)
      }
    }
    console.log(clients.length)
  });
  let latestMessage = await getTopMesDao().catch(err => {
    console.log("最新五条数据", err)
  })
  for (const food of latestMessage) {
    food.foodName = (await selectFoodNameDao(food.vegetable_id))[0].name
    food.quality=(await selectFoodStateDao(food.vegetable_id))[0].quality
    console.log(food.foodName)
  }
  socket.emit("latestMessage", latestMessage)
});
httpServer.listen(3000);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
})
