import express from "express";
import { registerUser, loginUser} from "../controllers/userControllers.js"; // Add .js extension

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;