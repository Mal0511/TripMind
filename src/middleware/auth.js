import db from "../models/index";

const User = db.User;
const Admin = db.Admin;

// Middleware kiểm tra đăng nhập
export const requireAuth = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res
        .status(401)
        .json({ message: "Vui lòng đăng nhập để tiếp tục" });
    }

    const user = await User.findByPk(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Lỗi middleware auth:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// Middleware kiểm tra quyền admin
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res
        .status(401)
        .json({ message: "Vui lòng đăng nhập để tiếp tục" });
    }

    // Kiểm tra trong bảng Users trước
    const user = await User.findByPk(req.session.userId);
    if (user && user.userrole === "admin") {
      req.user = user;
      return next();
    }

    // Kiểm tra trong bảng Admins
    const admin = await Admin.findByPk(req.session.userId);
    if (admin && admin.role === "admin") {
      req.user = admin;
      return next();
    }

    // Nếu không phải admin trong cả 2 bảng
    return res
      .status(403)
      .json({ message: "Bạn không có quyền truy cập trang này" });
  } catch (error) {
    console.error("Lỗi middleware admin:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
