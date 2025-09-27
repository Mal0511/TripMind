const hero = document.getElementById("hero");
const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");

const slides = [
  {
    img: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
    title: "Relax at the Beach",
    desc: "Enjoy sunshine and blue ocean in your dream vacation.",
  },
  {
    img: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
    title: "Explore the Mountains",
    desc: "Discover majestic landscapes and fresh air.",
  },
  {
    img: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    title: "City Lights",
    desc: "Modern lifestyle with sparkling night scenes.",
  },
  {
    img: "https://images.pexels.com/photos/21014/pexels-photo.jpg",
    title: "Ancient Town",
    desc: "Walk through history with traditional beauty.",
  },
  {
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Sunset by the Sea",
    desc: "Feel peaceful moments by the golden horizon.",
  },
];

let index = 0;

function changeSlide() {
  const slide = slides[index];
  hero.style.backgroundImage = `url(${slide.img})`;

  // Ẩn chữ cũ
  heroTitle.classList.remove("fade-show");
  heroDesc.classList.remove("fade-show");
  heroTitle.classList.add("fade-hidden");
  heroDesc.classList.add("fade-hidden");

  setTimeout(() => {
    heroTitle.textContent = slide.title;
    heroDesc.textContent = slide.desc;

    // Hiện chữ mới
    heroTitle.classList.remove("fade-hidden");
    heroDesc.classList.remove("fade-hidden");
    heroTitle.classList.add("fade-show");
    heroDesc.classList.add("fade-show");
  }, 300); // chờ 0.3s cho chữ cũ mờ dần

  index = (index + 1) % slides.length;
}

setInterval(changeSlide, 5000);
changeSlide();
/* if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.ejs';
 }*/
document.querySelectorAll(".consultant-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    window.location.href = "partner.ejs";
  });
});

// Logout function
async function logout() {
  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Xóa thông tin đăng nhập trong localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      // Chuyển hướng về trang login
      window.location.href = "/";
    } else {
      console.error("Lỗi khi đăng xuất");
    }
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
  }
}
