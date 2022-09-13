import Router from "express";
import { getProfiles, addProfile, updateProfile } from "../controllers/profileController.js"
const router = Router();

router.get("/", getProfiles);
router.post("/", addProfile);
router.patch("/", updateProfile)

export default router;