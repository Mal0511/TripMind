let editingPartnerId = null;

/**
 * Hiển thị form thêm/sửa đối tác.
 * - Nếu truyền đối tượng partner: chuyển sang chế độ Sửa và đổ dữ liệu lên form
 * - Nếu không truyền: chuyển sang chế độ Thêm mới, reset form
 */
function showAddPartnerForm(partner = null) {
  document.getElementById("addPartnerForm").style.display = "block";

  if (partner) {
    document.getElementById("companyName").value = partner.companyName;
    document.getElementById("email").value = partner.email;
    document.getElementById("phone").value = partner.phone;
    document.getElementById("address").value = partner.address;
    document.getElementById("serviceType").value = partner.serviceType;
    document.getElementById("status").value = partner.status;
    document.getElementById("description").value = partner.description || "";
    document.getElementById("rating").value = partner.rating || "";
    document.getElementById("rating-group").style.display = "block";
    editingPartnerId = partner.id;
    const saveBtn = document.querySelector(".btn-save");
    if (saveBtn) {
      saveBtn.textContent = "Cập nhật";
      saveBtn.classList.add("is-edit");
    }
  } else {
    document.getElementById("companyName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("serviceType").value = "hotel";
    document.getElementById("status").value = "pending";
    document.getElementById("description").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("rating-group").style.display = "none";
    editingPartnerId = null;
    const saveBtn = document.querySelector(".btn-save");
    if (saveBtn) {
      saveBtn.textContent = "Lưu";
      saveBtn.classList.remove("is-edit");
    }
  }
}

/**
 * Ẩn form thêm/sửa đối tác.
 */
function hideAddPartnerForm() {
  document.getElementById("addPartnerForm").style.display = "none";
}

/**
 * Lưu thông tin đối tác.
 * - Khi đang thêm: gọi API POST /partner/add
 * - Khi đang sửa: gọi API PUT /partner/:id
 * - Sử dụng FormData để hỗ trợ mở rộng sau này (upload file, ...)
 */
function savePartner() {
  const companyName = document.getElementById("companyName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const serviceType = document.getElementById("serviceType").value;
  const status = document.getElementById("status").value;
  const description = document.getElementById("description").value;
  let rating = "";
  if (editingPartnerId) {
    rating = document.getElementById("rating").value;
  }

  // Kiểm tra bắt buộc (bỏ description)
  if (
    !companyName ||
    !email ||
    !phone ||
    !address ||
    !serviceType ||
    !status ||
    (editingPartnerId && rating === "")
  ) {
    alert("Vui lòng nhập đầy đủ các mục bắt buộc!");
    return;
  }

  const url = editingPartnerId
    ? `/partner/${editingPartnerId}`
    : "/partner/add";
  const method = editingPartnerId ? "PUT" : "POST";

  const payload = {
    companyName,
    email,
    phone,
    address,
    serviceType,
    description,
    status,
  };
  if (editingPartnerId) {
    payload.rating = parseFloat(rating);
  }

  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = {};
      }
      if (!res.ok) {
        alert(data.message || "Thao tác thất bại!");
        // Giữ nguyên dữ liệu form, không reset
        return;
      }
      alert(data.message);
      if (data.message && data.message.includes("thành công")) {
        location.reload();
      }
    })
    .catch((err) => {
      console.error("Lỗi:", err);
      alert("Có lỗi xảy ra.");
    });
}

/**
 * Lấy dữ liệu từ hàng được chọn và mở form ở chế độ Sửa.
 * - Đọc dữ liệu hiển thị trong bảng
 * - Chuyển text hiển thị về value tương ứng cho select (serviceType, status)
 */
function editPartnerAndSave(button, partnerId) {
  // Lấy dữ liệu partner từ API để đảm bảo lấy đúng thông tin
  fetch(`/partner/${partnerId}`)
    .then((res) => res.json())
    .then((partner) => {
      if (partner) {
        showAddPartnerForm(partner);
      } else {
        alert("Không tìm thấy dữ liệu đối tác!");
      }
    })
    .catch((err) => {
      console.error("Lỗi lấy dữ liệu đối tác:", err);
      alert("Có lỗi khi lấy dữ liệu đối tác.");
    });
}

/**
 * Xóa đối tác theo ID sau khi người dùng xác nhận.
 * - Gọi API DELETE /partner/:id
 * - Reload lại trang nếu xóa thành công
 */
function deletePartner(partnerId) {
  if (confirm("Bạn có chắc chắn muốn xóa đối tác này không?")) {
    fetch(`/partner/${partnerId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.message.includes("thành công")) {
          location.reload();
        }
      })
      .catch((err) => {
        console.error("Lỗi:", err);
        alert("Có lỗi xảy ra.");
      });
  }
}
