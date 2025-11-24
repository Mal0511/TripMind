// Biến lưu trạng thái đang sửa hay thêm mới
// Các hàm chính: showAddUserForm, hideAddUserForm, saveUser, editUserAndSave, deleteUser
// Quản lý logic thêm/sửa/xóa người dùng, gọi API và cập nhật giao diện
let editingUserId = null;

/**
 * Hiển thị form thêm/sửa người dùng.
 * - Nếu truyền vào đối tượng user: chuyển sang chế độ Sửa và đổ dữ liệu lên form
 * - Nếu không: chuyển sang chế độ Thêm mới, reset form
 */
function showAddUserForm(user = null) {
  document.getElementById("addUserForm").style.display = "block";

  if (user) {
    document.getElementById("fullName").value = user.fullName;
    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("status").value = user.status;
    document.getElementById("status").parentElement.style.display = "flex";
    document.getElementById("role").value = user.role;
    document.getElementById("password").parentElement.style.display = "none";
    editingUserId = user.id;
  } else {
    document.getElementById("fullName").value = "";
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("status").value = "Active";
    document.getElementById("status").parentElement.style.display = "none";
    document.getElementById("role").value = "Basic";
    document.getElementById("password").parentElement.style.display = "flex";
    editingUserId = null;
  }
}

/**
 * Ẩn form thêm/sửa người dùng.
 */
function hideAddUserForm() {
  document.getElementById("addUserForm").style.display = "none";
}

/**
 * Lưu thông tin người dùng.
 * - Khi thêm mới: POST /user/add (gửi kèm password)
 * - Khi chỉnh sửa: POST /user/update (không gửi password)
 */
function saveUser() {
  const fullName = document.getElementById("fullName").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const status = document.getElementById("status").value;
  const role = document.getElementById("role").value;
  const password = editingUserId
    ? null
    : document.getElementById("password").value.trim();

  if (!(fullName && username && email && phone && role)) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  const url = editingUserId ? "/user/update" : "/user/add";
  const payload = editingUserId
    ? { id: editingUserId, fullName, username, email, phone, status, role }
    : { fullName, username, email, phone, status, role, password };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (res.ok) {
        alert(
          editingUserId ? "Cập nhật thành công!" : "Thêm người dùng thành công!"
        );
        location.reload();
      } else {
        return res.json().then((data) => {
          alert(data.message || "Thao tác thất bại!");
        });
      }
    })
    .catch((err) => {
      console.error("Lỗi:", err);
      alert("Có lỗi xảy ra.");
    });
}

/**
 * Lấy dữ liệu user theo ID từ server và mở form ở chế độ Sửa.
 */
async function editUserAndSave(button, userId) {
  try {
    const res = await fetch(`/user/${userId}`);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.message || "Không lấy được dữ liệu người dùng.");
      return;
    }
    const user = await res.json();
    showAddUserForm(user);
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu user:", err);
    alert("Có lỗi xảy ra khi lấy dữ liệu người dùng.");
  }
}

/**
 * Xóa người dùng theo ID sau khi xác nhận.
 */
function deleteUser(button, userId) {
  if (!confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) return;
  fetch("/user/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ userId }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((d) => Promise.reject(d));
    })
    .then((data) => {
      alert("Xóa người dùng thành công!");
      // Xóa row khỏi DOM ngay lập tức
      const row = document.getElementById(`user-${userId}`);
      if (row) row.remove();
    })
    .catch((err) => {
      console.error("Lỗi:", err);
      alert(err.message || "Có lỗi xảy ra.");
    });
}
