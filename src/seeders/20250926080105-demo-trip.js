'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Trips', [
      {
        partnerId: 1,
        title: 'Ha Noi City Tour',
        description: 'Khám phá thủ đô Hà Nội với các điểm đến nổi bật như Hồ Gươm, Văn Miếu, Lăng Bác.',
        image: 'http://localhost:1105/images/hanoicity.jpg',
        country: 'Vietnam',
        city: 'Hanoi',
        start_date: new Date('2025-10-01'),
        end_date: new Date('2025-10-05'),
        price: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partnerId: 2,
        title: 'Sai Gon Food Tour',
        description: 'Trải nghiệm ẩm thực Sài Gòn với các món ăn đường phố nổi tiếng.',
        image: 'http://localhost:1105/images/hochiminhcity.jpg',
        country: 'Vietnam',
        city: 'Ho Chi Minh City',
        start_date: new Date('2025-11-10'),
        end_date: new Date('2025-11-15'),
        price: 200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        partnerId: 1,
        title: 'Da Nang Beach Holiday',
        description: 'Thư giãn tại bãi biển Mỹ Khê và khám phá phố cổ Hội An gần đó.',
        image: 'http://localhost:1105/images/beachdanang.jpg',
        country: 'Vietnam',
        city: 'Da Nang',
        start_date: new Date('2025-12-20'),
        end_date: new Date('2025-12-27'),
        price: 300.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        partnerId: 1,
        title: "Bà Rịa Vũng Tàu 3 ngày 2 đêm",
        description: "Chuyến đi biển nghỉ dưỡng",
        image: "http://localhost:1105/images/P1.jpg",
        country: "Việt Nam",
        city: "Vũng Tàu",
        start_date: new Date("2025-08-01"),
        end_date: new Date("2025-08-03"),
        price: 3000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partnerId: 1,
        title: "Sa Pa 2 ngày 1 đêm",
        description: "Khám phá núi rừng Sa Pa",
        image: "http://localhost:1105/images/P1.jpg",
        country: "Việt Nam",
        city: "Sa Pa",
        start_date: new Date("2025-09-02"),
        end_date: new Date("2025-09-03"),
        price: 2500000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partnerId: 1,
        title: "Kuala Lumpur 4 ngày 3 đêm",
        description: "Thành phố hiện đại và sôi động",
        image: "http://localhost:1105/images/P1.jpg",
        country: "Malaysia",
        city: "Kuala Lumpur",
        start_date: new Date("2025-08-04"),
        end_date: new Date("2025-08-07"),
        price: 8000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partnerId: 1,
        title: "Đà Lạt 5 ngày 4 đêm",
        description: "Khám phá thành phố ngàn hoa",
        image: "http://localhost:1105/images/P1.jpg",
        country: "Việt Nam",
        city: "Đà Lạt",
        start_date: new Date("2025-07-10"),
        end_date: new Date("2025-07-14"),
        price: 5000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partnerId: 1,
        title: "Khám phá Hà Nội",
        description: "Văn hóa và ẩm thực thủ đô",
        image: "http://localhost:1105/images/P1.jpg",
        country: "Việt Nam",
        city: "Hà Nội",
        start_date: new Date("2025-08-15"),
        end_date: new Date("2025-08-15"), // same day
        price: 1500000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partnerId: 1,
        title: "Switzerland Alps Tour",
        description: "Khám phá dãy núi Alps hùng vĩ",
        image: "http://localhost:1105/images/P1.jpg",
        country: "Thụy Sĩ",
        city: "Bern",
        start_date: new Date("2025-08-20"),
        end_date: new Date("2025-08-26"),
        price: 20000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        partnerId: 1,
        title: "Tokyo & Kyoto Adventure",
        description: "Hành trình khám phá Nhật Bản",
        image: "http://localhost:1105/images/P1.jpg",
        country: "Nhật Bản",
        city: "Tokyo",
        start_date: new Date("2025-09-01"),
        end_date: new Date("2025-09-08"),
        price: 25000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Trips', null, {});
  }
};
