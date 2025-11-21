import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Setting() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // State để quản lý Tab đang chọn 
  const [activeTab, setActiveTab] = useState("profile");

  // Nếu chưa đăng nhập, hiển thị thông báo hoặc chuyển hướng
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null; // Ngăn không cho render nếu chưa login

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Settings</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="overflow-hidden bg-white shadow-md rounded-xl">
            <nav className="flex flex-col">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-4 text-left font-medium transition ${
                  activeTab === "profile"
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <i className="mr-3 fas fa-user"></i> Edit Profile
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`px-6 py-4 text-left font-medium transition ${
                  activeTab === "security"
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <i className="mr-3 fas fa-lock"></i> Password & Security
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`px-6 py-4 text-left font-medium transition ${
                  activeTab === "notifications"
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <i className="mr-3 fas fa-bell"></i> Notifications
              </button>
            </nav>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="p-8 bg-white shadow-md rounded-xl">
            {/* Hiển thị nội dung dựa trên Tab đang chọn */}
            {activeTab === "profile" && <ProfileSettings user={currentUser} />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT CON: PROFILE (Chỉnh sửa thông tin) ---
function ProfileSettings({ user }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Đã lưu thông tin: ${name}`);
    // Sau này gọi API cập nhật user ở đây
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Edit Profile</h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex items-center space-x-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Avatar"
            className="rounded-full w-24 h-24 object-cover border-2 border-blue-100"
          />
          <button type="button" className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
            Change Avatar
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              disabled // Thường không cho sửa email dễ dàng
              className="w-full px-4 py-2 mt-1 text-gray-500 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="+84 123 456 789"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              placeholder="Vietnam"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="pt-4 text-right">
          <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

// --- COMPONENT CON: SECURITY (Đổi mật khẩu) ---
function SecuritySettings() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Password & Security</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input type="password" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input type="password" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input type="password" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="pt-4 text-right">
          <button type="button" className="px-6 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

// --- COMPONENT CON: NOTIFICATIONS (Thông báo) ---
function NotificationSettings() {
  const [emailNoti, setEmailNoti] = useState(true);
  const [pushNoti, setPushNoti] = useState(false);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Notification Preferences</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-500">Receive emails about your trip updates.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={emailNoti} onChange={() => setEmailNoti(!emailNoti)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Push Notifications</h3>
            <p className="text-sm text-gray-500">Receive push notifications on your device.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={pushNoti} onChange={() => setPushNoti(!pushNoti)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
}