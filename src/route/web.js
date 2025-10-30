const express = require("express");
const homeControler = require("../controllers/homeController");
const LoginController = require("../controllers/LoginController");
// User-related handlers are implemented in LoginController in this repo
const {
  deleteUserController,
  getUserList,
  checkUserStatus,
  updateUserController,
  addUserController,
  getUserById,
} = LoginController;
const PartnerController = require("../controllers/PartnerController");
const UserController = require("../controllers/UserController");
const { requireAdmin } = require("../middleware/auth");

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", LoginController.getLoginPage);
  router.post("/auth/login", LoginController.getLoginController);
  router.post("/auth/logout", LoginController.getLogoutController);
  router.get("/main_screen", homeControler.getHomePage);
  // Route danh sách người dùng (chỉ admin)
  router.get("/user-list", requireAdmin, UserController.getUserList);
  // API: get user by id (admin only) - dùng khi frontend cần dữ liệu để edit
  router.get("/user/:id", requireAdmin, UserController.getUserById);

  // Test route
  router.get("/test", (req, res) => {
    res.send("Test route is working!");
  });

  // Debug API: trả JSON danh sách user (KHÔNG dùng auth) — chỉ tạm thời để debug kết nối DB
  router.get("/api/debug/users", async (req, res) => {
    try {
      const db = require("../models/index");
      const users = await db.User.findAll({ raw: true });
      return res.json({ ok: true, count: users.length, users });
    } catch (error) {
      console.error("Debug users error:", error);
      return res
        .status(500)
        .json({ ok: false, error: error.message, stack: error.stack });
    }
  });

  // Route để cập nhật thông tin người dùng (chỉ admin)
  // Route để cập nhật thông tin người dùng (chỉ admin)
  router.post("/user/update", requireAdmin, UserController.updateUser);
  // Route để thêm người dùng mới (chỉ admin)
  router.post("/user/add", requireAdmin, UserController.addUser);
  // Route to delete a user (chỉ admin)
  router.delete("/user/delete", requireAdmin, UserController.deleteUser);

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
