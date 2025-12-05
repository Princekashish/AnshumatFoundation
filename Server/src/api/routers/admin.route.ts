import { Router } from "express";
import { authValidator } from "../../middlewares/authvalidate";
import { roleValidate } from "../../middlewares/rolevalidate";
import { adminController } from "../controllers/admin.controller";

const route = Router();
route.get("/employees", authValidator, roleValidate, adminController.userlist);
route.post("/shift", authValidator, adminController.shiftCreate);
route.get("/shift", authValidator, adminController.shiftlist);
route.delete("/shift", authValidator, adminController.deletShift);

export default route;
