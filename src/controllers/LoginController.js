import db from "../models/index";
import bcrypt from "bcrypt";

const User = db.User;
const Admin = db.Admin;

let getLoginPage = (req, res) => res.render("login");
let getLoginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra trong bảng Users trước
    let user = await User.findOne({ where: { username } });
    if (user && user.password === password) {
      req.session.userId = user.id;
      req.session.userType = "user";
      return res.json({ message: "Login successful", userType: "user" });
    }

    // Kiểm tra trong bảng Admins
    let admin = await Admin.findOne({ where: { username } });
    if (admin && admin.password === password) {
      req.session.userId = admin.id;
      req.session.userType = "admin";
      return res.json({ message: "Login successful", userType: "admin" });
    }

    return res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let getPasswordController = () => {};
let getLogoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Lỗi khi đăng xuất:", err);
      return res.status(500).json({ message: "Lỗi khi đăng xuất" });
    }
    res.clearCookie("connect.sid"); // Xóa session cookie
    res.json({ message: "Đăng xuất thành công" });
  });
};
// ...existing code...
module.exports = {
  getLoginPage: getLoginPage,
  getLoginController: getLoginController,
  getPasswordController: getPasswordController,
  getLogoutController: getLogoutController,
};
