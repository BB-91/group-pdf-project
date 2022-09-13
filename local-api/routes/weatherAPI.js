import Router from "express";
import { getWeatherHistory, addWeatherHistory, updateWeatherHistory } from "../controllers/weatherController.js"
const router = Router();

router.get("/", getWeatherHistory);
router.post("/", addWeatherHistory);
router.patch("/", updateWeatherHistory)

export default router;