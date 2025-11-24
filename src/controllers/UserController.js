const db = require("../models/index");
const User = db.User;
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
            { id: isNaN(Number(search)) ? -1 : Number(search) },
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
    let { fullName, username, email, phone, status, role, password } = req.body;
    // Trim inputs to avoid accidental spaces
    fullName = fullName ? fullName.trim() : fullName;
    username = username ? username.trim() : username;
    email = email ? email.trim() : email;
    phone = phone ? phone.trim() : phone;

    // Check duplicates: username, email, phone
    const { Op } = db.Sequelize;
    const duplicate = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }, { phone }],
      },
      raw: true,
    });
    if (duplicate) {
      let msg = "";
      if (duplicate.username === username) msg += "Username đã được sử dụng. ";
      if (duplicate.email === email) msg += "Email đã được sử dụng. ";
      if (duplicate.phone === phone) msg += "Số điện thoại đã được sử dụng. ";
      return res.status(400).json({
        message: msg.trim() || "Thông tin đã bị trùng. Vui lòng nhập lại.",
      });
    }

    // Save plain password (trimmed) for now to match existing behavior
    const storedPassword = password ? String(password).trim() : null;
    await db.User.create({
      fullName,
      username,
      email,
      phone,
      status,
      role,
      password: storedPassword,
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
    let { fullName, username, email, phone, status, role, password } = req.body;

    fullName = fullName ? fullName.trim() : fullName;
    username = username ? username.trim() : username;
    email = email ? email.trim() : email;
    phone = phone ? phone.trim() : phone;
    status = status ? status.trim() : status;
    role = role ? role.trim() : role;
    // Check duplicates for username/email/phone among other users (exclude current id)
    const { Op } = db.Sequelize;
    const dup = await User.findOne({
      where: {
        [Op.and]: [
          { id: { [Op.ne]: id } },
          { [Op.or]: [{ username }, { email }, { phone }] },
        ],
      },
      raw: true,
    });
    if (dup) {
      let msg = "";
      if (dup.username === username) msg += "Username đã được sử dụng. ";
      if (dup.email === email) msg += "Email đã được sử dụng. ";
      if (dup.phone === phone) msg += "Số điện thoại đã được sử dụng. ";
      return res
        .status(400)
        .json({ message: msg.trim() || "Thông tin đã bị trùng." });
    }

    const updateObj = { fullName, username, email, phone, status, role };
    if (password) {
      // nếu có password mới, lưu plain-text (trimmed)
      updateObj.password = String(password).trim();
    }

    await db.User.update(updateObj, { where: { id } });
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

exports.getUser = async (req, res) => {
  console.log("SESSION:", req.session);

  console.log("UserId:", req.session?.userId);
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const user = await User.findByPk(req.session.userId, {
      attributes: ["id", "fullName", "username", "email", "phone"],
    });
    console.log("FOUND USER:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
