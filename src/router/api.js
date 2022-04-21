import express from "express";
import luckyDraw from "../service/api/LuckyDraw.js";

const router = express()

router.get("/luck", luckyDraw)

export default router

