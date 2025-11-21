import express from "express";
import TripController from "../controllers/TripController.js";
import UserController from "../controllers/UserController.js";
import AccountController from "../controllers/AccountController.js"; 
// Gợi ý: Nếu có middleware xác thực, hãy thêm vào đây
// import middleware from "../middleware/middleware.js";

const router = express.Router();

const initApiRoutes = (app) => {
    // === Trip APIs (Các hàm này đã được kiểm tra và tồn tại trong TripController.js) ===
    router.get("/trip", TripController.getAllTrips);
    router.get("/trip/:id", TripController.getTripById);
    router.post("/trip", TripController.createTrip);

    // === User APIs (Lấy thông tin User hiện tại - Hàm getUser đã tồn tại trong UserController.js) ===
    router.get("/user", UserController.getUser);

    // === Account/Auth APIs (Sử dụng các hàm CÓ SẴN trong AccountController.js) ===
    router.post("/auth/register", AccountController.register); // Đăng ký
    router.post("/auth/login", AccountController.login);       // Đăng nhập
    router.post("/auth/logout-all", AccountController.logoutAllDevices); // Đăng xuất tất cả thiết bị
    
    // Gợi ý: Bạn có thể bỏ comment các dòng này để dùng thêm các chức năng bảo mật
    router.post("/auth/password/change", AccountController.changePassword);
    router.post("/auth/2fa/setup", AccountController.setup2FA);
    router.post("/auth/2fa/verify", AccountController.verify2FA);
    router.post("/auth/password/forgot", AccountController.forgotPassword);

    return app.use("/api", router);
};

export default initApiRoutes;