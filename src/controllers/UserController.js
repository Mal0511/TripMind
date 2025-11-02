
const db = require("../models/index");

// Hiển thị danh sách người dùng (và tìm kiếm nếu có)
exports.getUserList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const { Op } = db.Sequelize;
    const where = search
      ? {
          [Op.or]: [
            { username: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};
    const users = await db.User.findAll({ where, raw: true });
    res.render("user_list", { users, search });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    res.status(500).send("Lỗi server");
  }
};

// Thêm người dùng mới
exports.addUser = async (req, res) => {
  try {
    const { username, email, phone, status, userrole, password } = req.body;
    await db.User.create({
      username,
      email,
      phone,
      status,
      userrole,
      password,
    });
    res.redirect("/user-list");
  } catch (error) {
    console.error("Lỗi khi thêm người dùng:", error);
    res.status(500).send("Không thể thêm người dùng");
  }
};

// Cập nhật người dùng
exports.updateUser = async (req, res) => {
  try {
    // Hỗ trợ lấy id từ params (PUT/POST /user/:id) hoặc từ body (frontend hiện gửi POST /user/update với {id})
    const id = req.params.id || req.body.id;
    const { username, email, phone, status, userrole, password } = req.body;
    await db.User.update(
      { username, email, phone, status, userrole, password },
      { where: { id } }
    );
    res.redirect("/user-list");
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res.status(500).send("Không thể cập nhật người dùng");
  }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
  try {
    // Frontend gửi DELETE /user/delete với body { userId }
    const id = req.params.id || req.body.userId || req.body.id;
    if (!id) return res.status(400).json({ message: "Missing user id" });
    await db.User.destroy({ where: { id } });
    // Nếu request AJAX (fetch) trả JSON, còn form submit thì redirect
    if (req.xhr || req.headers.accept.indexOf("json") !== -1) {
      return res.json({ ok: true });
    }
    return res.redirect("/user-list");
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.status(500).send("Không thể xóa người dùng");
  }
};

// Lấy user theo id (dùng cho chức năng edit: frontend gọi GET /user/:id)
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Missing user id" });
    const user = await db.User.findByPk(id, { raw: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    console.error("Lỗi khi lấy user theo id:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

import db from '../models/index.js';

const User = db.User;

let getUser = async (req, res) => {
    console.log("SESSION:", req.session);
   try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not logged in' });
        }

        const user = await User.findByPk(req.session.userId, {
            attributes: ['id', 'fullName', 'userName', 'email', 'phone'] 
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getUser : getUser,
}

