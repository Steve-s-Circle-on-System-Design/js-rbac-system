import express from "express"
import refresh  from "../controllers/handleRefreshToken.js";

const router = express.Router();

router.route("/refresh").get(refresh)

export default router