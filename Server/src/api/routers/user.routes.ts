import { Router } from "express";
import { userController } from "../controllers/user.controllers";
import { validate_request } from "../../middlewares/uservalidate";
import {
  profileUdate,
  registationSchema,
} from "../../validator/user.validator";
import { authValidator } from "../../middlewares/authvalidate";

const route = Router();
route.post(
  "/register",
  validate_request(registationSchema),
  userController.registration
);
route.post("/login", validate_request(profileUdate), userController.login);
route.put("/update", authValidator, userController.update);
route.get("/profile", authValidator, userController.profile);
route.post("/logout", authValidator, userController.logout);

export default route;
