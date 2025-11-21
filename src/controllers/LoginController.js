import db from "../models/index.js";

const User = db.User;
const Admin = db.Admin;

export const getLoginPage = (req, res) => {
    return res.render("login");
};

export const getLoginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra trong User
        const user = await User.findOne({ where: { userName: username } });
        if (user) {
            if (user.password !== password) {
                return res.status(401).json({ message: "Invalid username or password" });
            }
            req.session.userId = user.id;
            req.session.userType = "user";
            return res.json({ message: "Login successful", userType: "user" });
        }

        // Kiểm tra trong Admin
        const admin = await Admin.findOne({ where: { username } });
        if (admin) {
            if (admin.password !== password) {
                return res.status(401).json({ message: "Invalid username or password" });
            }
            req.session.userId = admin.id;
            req.session.userType = "admin";
            return res.json({ message: "Login successful", userType: "admin" });
        }

        return res.status(401).json({ message: "Invalid username or password" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getRegisterController = async (req, res) => {
    try {
        const { fullname: fullName, username: userName, password, email, phone } = req.body;

        const existUser = await User.findOne({ where: { userName } });
        if (existUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const user = await User.create({
            fullName,
            userName,
            password,
            email,
            phone,
        });

        return res.status(201).json({ message: "Registration successful", user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPasswordController = () => {};

export const getLogoutController = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Lỗi khi đăng xuất:", err);
            return res.status(500).json({ message: "Lỗi khi đăng xuất" });
        }
        res.clearCookie("connect.sid");
        return res.json({ message: "Đăng xuất thành công" });
    });
};
