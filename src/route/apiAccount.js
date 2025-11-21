import express from "express";
import * as AccountController from "../controllers/AccountController.js";

const router = express.Router();

router.post("/register", AccountController.register);
router.post("/login", AccountController.login);
router.post("/change-password", AccountController.changePassword);
router.post("/setup-2fa", AccountController.setup2FA);
router.post("/verify-2fa", AccountController.verify2FA);
router.post("/forgot-password", AccountController.forgotPassword);
router.post("/logout-all", AccountController.logoutAllDevices);
router.post("/deactivate", AccountController.deactivateAccount);

export default (app) => app.use("/api/account", router);
