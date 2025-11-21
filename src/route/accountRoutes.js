// src/route/accountRoutes.js
import express from "express";
import AccountController from "../controllers/AccountController.js";

const router = express.Router();

const initAccountRoutes = (app) => {
  // Đăng ký tài khoản
  router.post("/register", AccountController.register);

  // Đăng nhập
  router.post("/login", AccountController.login);

  // Đổi mật khẩu
  router.post("/change-password", AccountController.changePassword);

  // Thiết lập 2FA
  router.post("/setup-2fa", AccountController.setup2FA);

  // Xác thực 2FA (khi login)
  router.post("/verify-2fa", AccountController.verify2FA);

  // Khôi phục mật khẩu (send reset email)
  router.post("/forgot-password", AccountController.forgotPassword);

  // Đăng xuất (tất cả thiết bị)
  router.post("/logout-all", AccountController.logoutAllDevices);

  // Hủy / khoá tài khoản
  router.delete("/deactivate", AccountController.deactivateAccount);

  return app.use("/api/account", router);
};

export default initAccountRoutes;

