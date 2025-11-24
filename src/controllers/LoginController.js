import db from "../models/index";
import bcrypt from "bcrypt";

const User = db.User;
const Admin = db.Admin;

let getLoginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // helper to compare password (supports plain and bcrypt-hashed)
    const matchPassword = async (stored, plain) => {
      if (!stored) return false;
      // detect bcrypt hash (starts with $2b$ or $2a$)
      if (
        typeof stored === "string" &&
        (stored.startsWith("$2a$") ||
          stored.startsWith("$2b$") ||
          stored.startsWith("$2y$"))
      ) {
        return await bcrypt.compare(plain, stored);
      }
      return stored === plain;
    };

    // 1) Check admin table first
    const admin = await Admin.findOne({ where: { username } });
    if (admin) {
      const ok = await matchPassword(admin.password, password);
      if (ok) {
        req.session.userId = admin.id;
        req.session.userType = "admin";
        return res.json({ message: "Login successful", userType: "admin" });
      }
      // admin exists but wrong password -> reject
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // 2) Check regular users
    const user = await User.findOne({ where: { username } });
    if (user) {
      const ok = await matchPassword(user.password, password);
      if (ok) {
        req.session.userId = user.id;
        req.session.userType = "user";
        return res.json({ message: "Login successful", userType: "user" });
      }
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // neither admin nor user found
    return res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kiểm tra trong bảng Admins
/*let admin = await Admin.findOne({ where: { username } });
    if (admin && admin.password === password) {
      req.session.userId = admin.id;
      req.session.userType = "admin";
      return res.json({ message: "Login successful", userType: "admin" });
    }  return res.status(401).json({ message: "Invalid username or password" });*/

let getRegisterController = async (req, res) => {
  try {
    // Accept both `username` (from frontend) and legacy `regUsername`
    const {
      fullname: fullName,
      regUsername,
      username,
      password,
      email,
      phone,
    } = req.body;
    const finalUsername = (username || regUsername || "").trim();
    if (!finalUsername) {
      return res.status(400).json({ message: "Username is required" });
    }

    const existUser = await User.findOne({
      where: { username: finalUsername },
    });
    if (existUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Store plain password (trimmed) to match existing DB data
    const storedPassword = password ? String(password).trim() : null;

    const user = await User.create({
      fullName: fullName ? fullName.trim() : fullName,
      username: finalUsername,
      password: storedPassword,
      email: email ? email.trim() : email,
      phone: phone ? phone.trim() : phone,
    });
    res.status(201).json({ message: "Registration successful", user });
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
  getLoginController: getLoginController,
  getPasswordController: getPasswordController,
  getLogoutController: getLogoutController,
  getRegisterController: getRegisterController,
};
