// User.jsx
import React, { useEffect, useState } from "react";

/**
 * Yêu cầu API backend (ví dụ như trong hướng dẫn trước):
 * GET  /api/user                 -> lấy user hiện tại (auth required)
 * PUT  /api/user                 -> cập nhật profile (multipart/form-data)
 * POST /api/user/change-password -> đổi mật khẩu (auth required)
 * POST /api/user/logout-others   -> đăng xuất hết (keep current session)
 * POST /api/user/delete-account  -> xóa/khóa tài khoản (auth required)
 * POST /api/2fa/setup            -> tạo TOTP secret (trả về { qr, secretTemp })
 * POST /api/2fa/verify           -> verify & enable 2FA (body: { token })
 * POST /api/2fa/disable          -> disable 2FA
 * GET  /api/2fa/backup-codes     -> lấy backup codes (auth)
 * GET  /api/trips                -> list trips (auth)
 * POST /api/trips               -> create trip
 * PUT  /api/trips/:id           -> update
 * DELETE /api/trips/:id         -> delete
 * GET /api/trips/export/csv     -> export CSV (auth)
 * GET /api/trips/export/pdf     -> export PDF (auth)
 *
 * Tất cả fetch đều dùng credentials: "include"
 */

export default function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // UI states
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [twoFASetupOpen, setTwoFASetupOpen] = useState(false);
  const [tripsOpen, setTripsOpen] = useState(false);

  // Profile edit form state
  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "other",
    publicProfile: true,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  // 2FA state
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [totpToken, setTotpToken] = useState("");
  const [backupCodes, setBackupCodes] = useState([]);
  const [twoFALoading, setTwoFALoading] = useState(false);

  // Change password
  const [pwdState, setPwdState] = useState({ currentPassword: "", newPassword: "" });
  const [pwdLoading, setPwdLoading] = useState(false);

  // Trips
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [newTripTitle, setNewTripTitle] = useState("");

  // Load current user
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("http://localhost:1105/api/user", { credentials: "include" });
        if (!res.ok) {
          if (res.status === 401) setErrorMsg("Bạn cần đăng nhập.");
          else setErrorMsg("Không thể tải dữ liệu người dùng.");
          setUser(null);
        } else {
          const data = await res.json();
          if (mounted) {
            setUser(data);
            setForm({
              fullName: data.fullName || "",
              userName: data.userName || "",
              email: data.email || "",
              phone: data.phone || "",
              dob: data.dob ? data.dob.slice(0, 10) : "",
              gender: data.gender || "other",
              publicProfile: typeof data.publicProfile === "boolean" ? data.publicProfile : true,
            });
          }
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Lỗi kết nối tới server.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Fetch trips
  const loadTrips = async () => {
    setTripsLoading(true);
    try {
      const res = await fetch("http://localhost:1105/api/trips", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setTrips(data);
      } else {
        console.warn("Không lấy được trips", res.status);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTripsLoading(false);
    }
  };

  // Profile save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("userName", form.userName);
      formData.append("phone", form.phone);
      formData.append("dob", form.dob);
      formData.append("gender", form.gender);
      formData.append("publicProfile", form.publicProfile);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await fetch("http://localhost:1105/api/user", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) throw new Error("Lưu profile thất bại");
      const data = await res.json();
      // backend trả về user mới trong data.user
      if (data.user) {
        setUser(prev => ({ ...prev, ...data.user }));
      } else {
        // fallback: reload user
        const r = await fetch("http://localhost:1105/api/user", { credentials: "include" });
        const u = await r.json();
        setUser(u);
      }
      setEditing(false);
    } catch (err) {
      console.error(err);
      setErrorMsg("Lưu thất bại, thử lại.");
    } finally {
      setSavingProfile(false);
    }
  };

  // Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdLoading(true);
    try {
      const res = await fetch("http://localhost:1105/api/user/change-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: pwdState.currentPassword,
          newPassword: pwdState.newPassword,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(()=>({}));
        throw new Error(body.msg || "Đổi mật khẩu thất bại");
      }
      alert("Đổi mật khẩu thành công");
      setChangingPassword(false);
      setPwdState({ currentPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Đổi mật khẩu thất bại");
    } finally {
      setPwdLoading(false);
    }
  };

  // Logout current session (simple logout)
  const handleLogout = async () => {
    try {
      // simple: call backend logout endpoint (you should implement /api/auth/logout)
      await fetch("http://localhost:1105/api/auth/logout", { method: "POST", credentials: "include" });
      // redirect to login page (or refresh)
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setErrorMsg("Logout thất bại");
    }
  };

  // Logout others
  const handleLogoutOthers = async () => {
    if (!confirm("Bạn có chắc muốn đăng xuất khỏi tất cả thiết bị khác?")) return;
    try {
      const res = await fetch("http://localhost:1105/api/user/logout-others", {
        method: "POST", credentials: "include"
      });
      if (!res.ok) throw new Error("Thao tác thất bại");
      alert("Đã đăng xuất khỏi các thiết bị khác");
    } catch (err) {
      console.error(err);
      setErrorMsg("Không thể đăng xuất các thiết bị khác");
    }
  };

  // Delete / lock account
  const handleDeleteAccount = async () => {
    if (!confirm("Bạn có muốn khóa/xóa tài khoản theo yêu cầu? Hành động này có thể không hoàn tác.")) return;
    try {
      const res = await fetch("http://localhost:1105/api/user/delete-account", {
        method: "POST", credentials: "include"
      });
      if (!res.ok) throw new Error("Thất bại");
      alert("Yêu cầu xóa/khóa tài khoản đã gửi. Bạn sẽ được đăng xuất.");
      // redirect
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setErrorMsg("Không thể xóa/khóa tài khoản");
    }
  };

  // 2FA setup
  const openTwoFASetup = async () => {
    setTwoFALoading(true);
    try {
      const res = await fetch("http://localhost:1105/api/2fa/setup", { method: "POST", credentials: "include" });
      if (!res.ok) throw new Error("Không thể tạo secret 2FA");
      const data = await res.json();
      // data.qr: dataURL; data.secret: temp secret (optional)
      setQrDataUrl(data.qr || data.otpauth_url || null);
      setTwoFASetupOpen(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Thiết lập 2FA thất bại");
    } finally {
      setTwoFALoading(false);
    }
  };

  const verifyTwoFA = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1105/api/2fa/verify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: totpToken }),
      });
      if (!res.ok) {
        const b = await res.json().catch(()=>({}));
        throw new Error(b.msg || "Verify thất bại");
      }
      const body = await res.json();
      alert("2FA đã bật. Mã dự phòng: " + (body.backupCodes ? body.backupCodes.join(", ") : "đã gửi"));
      setBackupCodes(body.backupCodes || []);
      setTwoFASetupOpen(false);
      // refresh user
      const r = await fetch("http://localhost:1105/api/user", { credentials: "include" });
      const u = await r.json();
      setUser(u);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Xác thực 2FA thất bại");
    }
  };

  const fetchBackupCodes = async () => {
    try {
      const res = await fetch("http://localhost:1105/api/2fa/backup-codes", { credentials: "include" });
      if (!res.ok) throw new Error("Không lấy được backup codes");
      const body = await res.json();
      setBackupCodes(body.codes || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Không lấy mã dự phòng");
    }
  };

  // Trips actions
  const handleCreateTrip = async (e) => {
    e.preventDefault();
    if (!newTripTitle) return;
    try {
      const res = await fetch("http://localhost:1105/api/trips", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTripTitle, itinerary: {} }),
      });
      if (!res.ok) throw new Error("Tạo trip thất bại");
      const t = await res.json();
      setTrips(prev => [t, ...prev]);
      setNewTripTitle("");
    } catch (err) {
      console.error(err);
      setErrorMsg("Không thể tạo chuyến");
    }
  };

  const handleDeleteTrip = async (id) => {
    if (!confirm("Xóa hành trình này?")) return;
    try {
      const res = await fetch(`http://localhost:1105/api/trips/${id}`, {
        method: "DELETE", credentials: "include"
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      setTrips(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
      setErrorMsg("Xóa chuyến thất bại");
    }
  };

  const handleExport = (type = "csv") => {
    // mở link download trực tiếp (cookie auth)
    window.open(`http://localhost:1105/api/trips/export/${type}`, "_blank");
  };

  // JSX render helpers
  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">{errorMsg || "User not found"}</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-purple-600 text-center">User Profile</h1>

      <div className="mt-6 bg-white shadow-lg rounded-xl p-6 space-y-4">
        {/* Profile Info */}
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl font-bold overflow-hidden">
            {user.avatarUrl ? (
              // avatarUrl assumed to be accessible path
              <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover"/>
            ) : (
              <span>{user.fullName ? user.fullName[0] : "U"}</span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.fullName}</h2>
            <p className="text-gray-600">@{user.userName || "user"}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <p className="text-gray-500 text-sm">Ngày sinh: {user.dob ? user.dob.slice(0,10) : "Chưa cập nhật"}</p>
            <p className="text-gray-500 text-sm">Giới tính: {user.gender || "Chưa"}</p>
            <p className="text-gray-500 text-sm">Hồ sơ: {user.publicProfile ? "Công khai" : "Riêng tư"}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button onClick={() => setEditing(true)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Edit Profile
          </button>

          <button onClick={() => setChangingPassword(true)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
            Đổi mật khẩu
          </button>

          <button onClick={openTwoFASetup} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            {user.twoFactorEnabled ? "Quản lý 2FA" : "Thiết lập 2FA"}
          </button>

          <button onClick={handleLogoutOthers} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            Đăng xuất các thiết bị khác
          </button>

          <button onClick={() => { setTripsOpen(prev => !prev); if (!tripsOpen) loadTrips(); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
            Quản lý chuyến đi
          </button>

          <button onClick={handleLogout} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">
            Logout
          </button>

          <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-900 text-white rounded-lg hover:opacity-90 transition">
            Khóa/Xóa tài khoản
          </button>
        </div>

        {/* Error */}
        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
      </div>

      {/* Edit modal (basic inline) */}
      {editing && (
        <div className="mt-6 bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold mb-2">Chỉnh sửa hồ sơ</h3>
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <input className="w-full p-2 border rounded" placeholder="Họ & tên" value={form.fullName}
              onChange={e=>setForm({...form, fullName: e.target.value})} />
            <input className="w-full p-2 border rounded" placeholder="Username" value={form.userName}
              onChange={e=>setForm({...form, userName: e.target.value})} />
            <input className="w-full p-2 border rounded" placeholder="Số điện thoại" value={form.phone}
              onChange={e=>setForm({...form, phone: e.target.value})} />
            <div className="flex gap-2">
              <input type="date" className="p-2 border rounded" value={form.dob}
                onChange={e=>setForm({...form, dob: e.target.value})} />
              <select className="p-2 border rounded" value={form.gender} onChange={e=>setForm({...form, gender: e.target.value})}>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.publicProfile} onChange={e=>setForm({...form, publicProfile: e.target.checked})} />
                Công khai
              </label>
            </div>

            <div>
              <label className="block text-sm">Avatar</label>
              <input type="file" accept="image/*" onChange={e=>setAvatarFile(e.target.files?.[0]||null)} />
            </div>

            <div className="flex gap-3">
              <button disabled={savingProfile} type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                {savingProfile ? "Đang lưu..." : "Lưu"}
              </button>
              <button type="button" onClick={()=>setEditing(false)} className="px-4 py-2 bg-gray-200 rounded">Hủy</button>
            </div>
          </form>
        </div>
      )}

      {/* Change password */}
      {changingPassword && (
        <div className="mt-6 bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold mb-2">Đổi mật khẩu</h3>
          <form onSubmit={handleChangePassword} className="space-y-3">
            <input type="password" required placeholder="Mật khẩu hiện tại" className="w-full p-2 border rounded"
              value={pwdState.currentPassword} onChange={e=>setPwdState({...pwdState, currentPassword: e.target.value})} />
            <input type="password" required placeholder="Mật khẩu mới" className="w-full p-2 border rounded"
              value={pwdState.newPassword} onChange={e=>setPwdState({...pwdState, newPassword: e.target.value})} />
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled={pwdLoading}>{pwdLoading ? "Đang..." : "Đổi mật khẩu"}</button>
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={()=>setChangingPassword(false)}>Hủy</button>
            </div>
          </form>
        </div>
      )}

      {/* 2FA setup */}
      {twoFASetupOpen && (
        <div className="mt-6 bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold mb-2">Thiết lập Xác thực 2 lớp (TOTP)</h3>
          <div className="flex gap-4">
            <div>
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR for authenticator" className="w-48 h-48" />
              ) : (
                <p>Đang tạo QR...</p>
              )}
            </div>
            <div className="flex-1">
              <p>Quét mã QR bằng Google Authenticator / Authy / Microsoft Authenticator.</p>
              <form onSubmit={verifyTwoFA} className="mt-3">
                <input className="p-2 border rounded w-full" placeholder="Nhập mã 6 chữ số" value={totpToken}
                  onChange={e=>setTotpToken(e.target.value)} />
                <div className="flex gap-3 mt-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded">Xác thực & Bật 2FA</button>
                  <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={()=>{ setTwoFASetupOpen(false); setQrDataUrl(null); setTotpToken(""); }}>Hủy</button>
                </div>
              </form>

              <div className="mt-4">
                <button className="px-3 py-2 bg-indigo-500 text-white rounded" onClick={fetchBackupCodes}>Xem mã dự phòng</button>
                {backupCodes.length > 0 && (
                  <ul className="mt-2 list-disc pl-5">
                    {backupCodes.map((c, idx) => <li key={idx} className="text-sm font-mono">{c}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trips management */}
      {tripsOpen && (
        <div className="mt-6 bg-white shadow rounded p-6">
          <h3 className="text-lg font-semibold mb-2">Lịch sử & Hành trình</h3>

          <form onSubmit={handleCreateTrip} className="flex gap-2 mb-4">
            <input value={newTripTitle} onChange={e=>setNewTripTitle(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Tiêu đề hành trình mới" />
            <button className="px-4 py-2 bg-green-600 text-white rounded">Tạo</button>
          </form>

          <div className="flex gap-2 mb-4">
            <button onClick={()=>handleExport("csv")} className="px-3 py-2 bg-gray-200 rounded">Export CSV</button>
            <button onClick={()=>handleExport("pdf")} className="px-3 py-2 bg-gray-200 rounded">Export PDF</button>
            <button onClick={loadTrips} className="px-3 py-2 bg-blue-500 text-white rounded">Tải lại</button>
          </div>

          {tripsLoading ? <p>Loading trips...</p> : (
            <div className="space-y-2">
              {trips.length === 0 && <p className="text-sm text-gray-500">Chưa có hành trình.</p>}
              {trips.map(t => (
                <div key={t._id} className="p-3 border rounded flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-sm text-gray-500">Tạo: {t.createdAt ? new Date(t.createdAt).toLocaleString() : ""}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-yellow-400 rounded">Tái sử dụng</button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={()=>handleDeleteTrip(t._id)}>Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
