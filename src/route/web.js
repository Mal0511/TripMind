const express = require("express");
const homeControler = require("../controllers/homeController");
const LoginController = require("../controllers/LoginController");
const PartnerController = require("../controllers/PartnerController");
const { requireAdmin } = require("../middleware/auth");

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", LoginController.getLoginPage);
  router.post("/auth/login", LoginController.getLoginController);
  router.post("/auth/logout", LoginController.getLogoutController);
  router.get("/main_screen", homeControler.getHomePage);
  router.get("/user-list", requireAdmin, LoginController.getUserList);
  // API: get user by id (admin only)
  router.get("/user/:id", requireAdmin, LoginController.getUserById);

  // Test route
  router.get("/test", (req, res) => {
    res.send("Test route is working!");
  });

  // Route để cập nhật thông tin người dùng (chỉ admin)
  router.post(
    "/user/update",
    requireAdmin,
    LoginController.updateUserController
  );
  // Route để thêm người dùng mới (chỉ admin)
  router.post("/user/add", requireAdmin, LoginController.addUserController);
  // Route to delete a user (chỉ admin)
  router.delete(
    "/user/delete",
    requireAdmin,
    LoginController.deleteUserController
  );

  // Partner management routes (chỉ admin mới có quyền truy cập)
  router.get("/partner-list", requireAdmin, PartnerController.getPartnerList);
  router.get("/partner/:id", requireAdmin, PartnerController.getPartnerDetail);
  router.post("/partner/add", requireAdmin, PartnerController.addPartner);
  router.put("/partner/:id", requireAdmin, PartnerController.updatePartner);
  router.delete("/partner/:id", requireAdmin, PartnerController.deletePartner);
  router.patch(
    "/partner/:id/status",
    requireAdmin,
    PartnerController.updatePartnerStatus
  );

  return app.use("/", router);
};
module.exports = initWebRoutes;
