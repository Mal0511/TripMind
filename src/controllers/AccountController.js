import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy"; // cho 2FA
import nodemailer from "nodemailer";

const User = db.User;

// ĐĂNG KÝ TÀI KHOẢN
export const register = async (req, res) => {
  try {
    const { name, userName, password, email, phone } = req.body;

    const exist = await User.findOne({ where: { userName } });
    if (exist) return res.status(400).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, userName, password: hashed, email, phone });

    res.status(201).json({ message: "Registration successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ĐĂNG NHẬP TÀI KHOẢN
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ where: { userName } });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid username or password" });

    // Nếu có bật xác thực 2 lớp
    if (user.twoFactorSecret) {
      return res.json({ require2FA: true, userId: user.id });
    }

    req.session.userId = user.id;
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ĐỔI MẬT KHẨU
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.session.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// THIẾT LẬP XÁC THỰC 2 LỚP (2FA)
export const setup2FA = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const secret = speakeasy.generateSecret();
    user.twoFactorSecret = secret.base32;
    await user.save();

    res.json({
      message: "2FA secret generated",
      secret: secret.otpauth_url,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// XÁC THỰC 2FA KHI ĐĂNG NHẬP
export const verify2FA = async (req, res) => {
  try {
    const { userId, token } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });

    if (!verified) return res.status(400).json({ message: "Invalid 2FA token" });

    req.session.userId = user.id;
    res.json({ message: "2FA verification successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// KHÔI PHỤC MẬT KHẨU (qua email/sđt)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.FE_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Khôi phục mật khẩu",
      text: `Bấm vào liên kết sau để đặt lại mật khẩu: ${resetLink}`,
    });

    res.json({ message: "Reset email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ĐĂNG XUẤT TẤT CẢ THIẾT BỊ
export const logoutAllDevices = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.sessionVersion = (user.sessionVersion || 0) + 1;
    await user.save();
    req.session.destroy();

    res.json({ message: "Logged out from all devices" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// HỦY / KHÓA TÀI KHOẢN
export const deactivateAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = false;
    await user.save();

    req.session.destroy();
    res.json({ message: "Account deactivated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default {
    register,
    login,
    changePassword,
    setup2FA,
    verify2FA,
    forgotPassword,
    logoutAllDevices,
    deactivateAccount,
};