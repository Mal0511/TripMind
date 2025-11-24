  const db = require("../models/index");
  const { Op } = require("sequelize");

  const Partner = db.Partner;

  // Lấy danh sách tất cả đối tác
  let getPartnerList = async (req, res) => {
    try {
      const { serviceType, status, search } = req.query;

      // Tạo điều kiện tìm kiếm
      let whereCondition = {};

      if (serviceType) {
        whereCondition.serviceType = serviceType;
      }

      if (status) {
        whereCondition.status = status;
      }

      if (search) {
        whereCondition[Op.or] = [
          { companyName: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } },
          { id: isNaN(Number(search)) ? -1 : Number(search) },
          { phone: { [Op.like]: `%${search}%` } },
        ];
      }
      // Lấy danh sách đối tác, sắp xếp theo id tăng dần
      const partners = await Partner.findAll({
        where: whereCondition,
        order: [["id", "ASC"]],
      });
      
      // Render ra view partner_list, truyền thêm filter và search
      return res.render("partner_list", {
        partners,
        serviceTypes: ["hotel", "restaurant", "transport", "attraction"],
        statuses: ["active", "inactive", "pending"],
        search,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đối tác:", error);
      return res.status(500).send("Đã xảy ra lỗi khi lấy danh sách đối tác.");
    }
  };

  // Lấy thông tin chi tiết một đối tác
  let getPartnerDetail = async (req, res) => {
    try {
      const { id } = req.params;// Lấy id từ URL
      const partner = await Partner.findByPk(id);// Tìm theo khóa chính

      if (!partner) {
        return res.status(404).json({ message: "Đối tác không tồn tại." });
      }

      return res.json(partner);// Trả về JSON thông tin đối tác
    } catch (error) {
      console.error("Lỗi khi lấy thông tin đối tác:", error);
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi lấy thông tin đối tác." });
    }
  };

  // Thêm đối tác mới
  let addPartner = async (req, res) => {
    try {
      const { companyName, email, phone, address, serviceType, description, rating } =
        req.body;

      // Kiểm tra trùng lặp tên công ty, email, sdt, địa chỉ
      const duplicate = await Partner.findOne({
        where: {
          [Op.or]: [{ companyName }, { email }, { phone }, { address }],
        },
      });
      if (duplicate) {
        let msg = "";
        if (duplicate.companyName === companyName)
          msg += "Tên công ty đã được sử dụng. ";
        if (duplicate.email === email) msg += "Email đã được sử dụng. ";
        if (duplicate.phone === phone) msg += "Số điện thoại đã được sử dụng. ";
        if (duplicate.address === address) msg += "Địa chỉ đã được sử dụng. ";
        return res
          .status(400)
          .json({
            message: msg.trim() || "Thông tin đã bị trùng. Vui lòng nhập lại.",
          });
      }

      // Tạo đối tác mới (không truyền rating)
      const newPartner = await Partner.create({
        companyName,
        email,
        phone,
        address,
        serviceType,
        description,
        status: "Pending",
        rating: null,
      });

      return res.status(201).json({
        message: "Đối tác mới đã được thêm thành công!",
        partner: newPartner,
      });
    } catch (error) {
      console.error("Lỗi khi thêm đối tác:", error);
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi thêm đối tác. Vui lòng thử lại.",
      });
    }
  };

  // Cập nhật thông tin đối tác
  let updatePartner = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        companyName,
        email,
        phone,
        address,
        serviceType,
        description,
        status,
        rating,
      } = req.body;

      // Kiểm tra email trùng lặp (trừ đối tác hiện tại)
      if (email) {
        const existingPartner = await Partner.findOne({
          where: {
            email,
            id: { [Op.ne]: id },
          },
        });

        if (existingPartner) {
          return res.status(400).json({
            message: "Email đã được sử dụng. Vui lòng nhập email khác.",
          });
        }
      }

      // Cập nhật thông tin đối tác
      const result = await Partner.update(
        {
          companyName,
          email,
          phone,
          address,
          serviceType,
          description,
          status,
          rating,
        },
        { where: { id } }
      );

      if (result[0] === 0) {
        return res.status(404).json({ message: "Đối tác không tồn tại." });
      }

      return res.status(200).json({
        message: "Cập nhật thông tin đối tác thành công.",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật đối tác:", error);
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi cập nhật đối tác.",
      });
    }
  };

  // Xóa đối tác
  let deletePartner = async (req, res) => {
    try {
      const { id } = req.params;

      // Kiểm tra đối tác có tồn tại không
      const partner = await Partner.findByPk(id);
      if (!partner) {
        return res.status(404).json({ message: "Đối tác không tồn tại." });
      }

      // Xóa đối tác
      await Partner.destroy({ where: { id } });

      return res.status(200).json({
        message: "Xóa đối tác thành công.",
      });
    } catch (error) {
      console.error("Lỗi khi xóa đối tác:", error);
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi xóa đối tác.",
      });
    }
  };

  // Cập nhật trạng thái đối tác
  let updatePartnerStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await Partner.update({ status }, { where: { id } });

      if (result[0] === 0) {
        return res.status(404).json({ message: "Đối tác không tồn tại." });
      }

      return res.status(200).json({
        message: "Cập nhật trạng thái đối tác thành công.",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đối tác:", error);
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi cập nhật trạng thái đối tác.",
      });
    }
  };

  module.exports = {
    getPartnerList,
    getPartnerDetail,
    addPartner,
    updatePartner,
    deletePartner,
    updatePartnerStatus,
  };
