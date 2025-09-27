import db from "../models/index";

const User = db.User;
const Admin = db.Admin;

let getHomePage = async (req, res) => {
  try {
    let user = null;
    if (req.session.userId) {
      if (req.session.userType === "admin") {
        user = await Admin.findByPk(req.session.userId);
        user.userrole = "admin"; // Thêm userrole để tương thích với view
      } else {
        user = await User.findByPk(req.session.userId);
      }
    }
    return res.render("main_screen", { user });
  } catch (error) {
    console.error("Lỗi khi lấy trang chủ:", error);
    return res.status(500).send("Đã xảy ra lỗi khi tải trang chủ");
  }
};

module.exports = {
  getHomePage: getHomePage,
};
