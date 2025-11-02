"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Partners", [
      {
        companyName: "Xhome Hotel",
        email: "info@xhome.com",
        password: "123456",
        phone: "0123456789",
        address: "32 Chu Van An, Quan 1, TP.HCM",
        serviceType: "hotel",
        description:
          "Khách sạn 4 sao với dịch vụ tiện nghi hiện đại, phù hợp cho du khách du lịch và công tác.",
        status: "active",
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyName: "Nhà Hàng Hải Sản Biển Đông",
        email: "contact@bien-dong.com",
        password: "123456",
        phone: "0987654321",
        address: "123 Nguyễn Huệ, Quan 1, TP.HCM",
        serviceType: "restaurant",
        description:
          "Nhà hàng chuyên về hải sản tươi sống, không gian sang trọng phù hợp cho các bữa tiệc và họp mặt gia đình.",
        status: "active",
        rating: 4.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyName: "Xe Khách Phương Trang",
        email: "booking@phuongtrang.com",
        password: "123456",
        phone: "1900123456",
        address: "456 Lê Văn Việt, Quan 9, TP.HCM",
        serviceType: "transport",
        description:
          "Công ty vận tải hành khách uy tín, phục vụ các tuyến đường liên tỉnh với chất lượng cao.",
        status: "active",
        rating: 4.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyName: "Khu Du Lịch Suối Tiên",
        email: "info@suoitien.com",
        password: "123456",
        phone: "0281234567",
        address: "120 Hà Huy Giáp, Quan 12, TP.HCM",
        serviceType: "attraction",
        description:
          "Khu du lịch sinh thái với nhiều trò chơi giải trí, phù hợp cho gia đình và nhóm bạn.",
        status: "active",
        rating: 4.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyName: "Hotel Continental",
        email: "reservation@continental.com",
        password: "123456",
        phone: "02838229919",
        address: "132-134 Đồng Khởi, Quan 1, TP.HCM",
        serviceType: "hotel",
        description:
          "Khách sạn lịch sử 5 sao, tọa lạc tại trung tâm thành phố với kiến trúc cổ điển Pháp.",
        status: "pending",
        rating: 0.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyName: "Quán Cơm Tấm Sài Gòn",
        email: "comtam@saigon.com",
        password: "123456",
        phone: "0901234567",
        address: "78 Võ Văn Tần, Quan 3, TP.HCM",
        serviceType: "restaurant",
        description:
          "Quán ăn đặc sản cơm tấm Sài Gòn, phục vụ 24/7 với giá cả hợp lý.",
        status: "inactive",
        rating: 3.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyName: "Xe Bus Thành Bưởi",
        email: "info@thanhbuoi.com",
        password: "123456",
        phone: "1900123457",
        address: "789 Đường 3/2, Quan 10, TP.HCM",
        serviceType: "transport",
        description:
          "Dịch vụ xe bus nội thành và liên tỉnh với giá vé ưu đãi cho sinh viên.",
        status: "active",
        rating: 3.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyName: "Chợ Bến Thành",
        email: "info@benthanh.com",
        password: "123456",
        phone: "02838299999",
        address: "Chợ Bến Thành, Quan 1, TP.HCM",
        serviceType: "attraction",
        description:
          "Chợ truyền thống nổi tiếng của Sài Gòn, nơi mua sắm và thưởng thức ẩm thực địa phương.",
        status: "active",
        rating: 4.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Partners", null, {});
  },
};
