import db from "../models/index";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import user from "../models/user";

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
let deleteUserController = async (req, res) => {
  try {
    const { userId } = req.body; // Lấy ID người dùng từ request

    // Xóa người dùng từ database
    const result = await User.destroy({ where: { id: userId } });

    if (result === 0) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    // Lấy tất cả người dùng còn lại và sắp xếp lại ID
    const users = await User.findAll({ order: [["id", "ASC"]] });

    // Cập nhật lại ID tuần tự
    const transaction = await User.sequelize.transaction();
    try {
      for (let i = 0; i < users.length; i++) {
        await users[i].update({ id: i + 1 }, { transaction });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

    return res
      .status(200)
      .json({ message: "Xóa người dùng thành công và sắp xếp lại ID." });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi xóa người dùng." });
  }
};
let getUserList = async (req, res) => {
  try {
    const { search } = req.query;
    let whereCondition = {};
    if (search) {
      whereCondition[Op.or] = [
        { username: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { id: isNaN(Number(search)) ? -1 : Number(search) },
        { phone: { [Op.like]: `%${search}%` } },
      ];
    }
    // Truy vấn danh sách người dùng từ database
    const users = await User.findAll({
      where: whereCondition,
      attributes: ["id", "username", "email", "phone", "status", "userrole"],
    });
    // Render giao diện và truyền danh sách người dùng, giữ lại giá trị search
    return res.render("user_list", { users, search });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    return res.status(500).send("Đã xảy ra lỗi khi lấy danh sách người dùng.");
  }
};

let checkUserStatus = async (req, res) => {
  try {
    const { username, email } = req.body; // Lấy tên và email từ request

    // Truy vấn người dùng từ database
    const user = await User.findOne({
      where: { username, email },
      attributes: ["status"], // Chỉ lấy trạng thái
    });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    // Kiểm tra trạng thái
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái người dùng:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi." });
  }
};
let updateUserController = async (req, res) => {
  try {
    const { id, username, email, phone, status, userrole, password } = req.body; // Lấy thông tin từ request

    // Tạo payload để cập nhật
    const updateData = { username, email, phone, status, userrole };

    // Chỉ thêm password vào payload nếu được cung cấp
    if (password) {
      updateData.password = password;
    }

    // Cập nhật thông tin người dùng trong database
    const result = await User.update(updateData, { where: { id } });

    if (result[0] === 0) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    return res
      .status(200)
      .json({ message: "Cập nhật thông tin người dùng thành công." });
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật thông tin người dùng." });
  }
};
let addUserController = async (req, res) => {
  try {
    const { username, email, phone, status, userrole, password } = req.body;

    // Kiểm tra trùng lặp email, username, hoặc số điện thoại
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }, { phone }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          message: "Email đã được sử dụng. Vui lòng nhập email khác.",
        });
      }
      if (existingUser.username === username) {
        return res.status(400).json({
          message: "Tên người dùng đã được sử dụng. Vui lòng nhập tên khác.",
        });
      }
      if (existingUser.phone === phone) {
        return res.status(400).json({
          message: "Số điện thoại đã được sử dụng. Vui lòng nhập số khác.",
        });
      }
    }

    // Lấy số lượng người dùng hiện tại để tính toán ID mới
    const users = await User.findAll({ order: [["id", "ASC"]] });
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1; // Gán ID mới

    // Thêm người dùng mới vào cơ sở dữ liệu
    const newUser = await User.create({
      id: newId,
      username,
      email,
      phone,
      status,
      userrole,
      password,
    });

    return res
      .status(201)
      .json({ message: "Người dùng mới đã được thêm!", user: newUser });
  } catch (error) {
    console.error("Lỗi khi thêm người dùng:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi thêm người dùng. Vui lòng thử lại.",
    });
  }
};

module.exports = {
  getLoginPage: getLoginPage,
  getLoginController: getLoginController,
  getPasswordController: getPasswordController,
  getLogoutController: getLogoutController,
  deleteUserController: deleteUserController,
  getUserList,
  checkUserStatus,
  updateUserController,
  addUserController,
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ["id", "username", "email", "phone", "status", "userrole"],
      });
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }
      return res.json(user);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi lấy thông tin người dùng." });
    }
  },
};
