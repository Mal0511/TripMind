// Settings.jsx
import React, { useEffect, useState, useRef } from "react";

/* ---------------- translations ---------------- */
const translations = {
  vi: {
    title: "Cài đặt",
    subtitle: "Tùy chỉnh trải nghiệm của bạn",
    generalTab: "Tổng quan",
    notificationsTab: "Thông báo",
    appearanceTab: "Giao diện",
    privacyTab: "Quyền riêng tư",
    currencyTab: "Tiền tệ",
    supportTab: "Trợ giúp",
    modulesTab: "Mở đầu",
    travelersTab: "Danh sách",
    languageHeader: "Ngôn ngữ",
    viet: "Tiếng Việt",
    eng: "English",
    zh: "中文",
    ko: "Tiếng Hàn",
    notificationsHeader: "Thông báo",
    toggleNotificationsDesc: "Bật hoặc tắt thông báo hệ thống",
    notifyByType: "Loại thông báo",
    chooseTypes: "Chọn loại thông báo",
    trip: "Chuyến đi",
    weather: "Thời tiết",
    promo: "Khuyến mãi",
    importantAlerts: "Cảnh báo quan trọng",
    importantDesc: "(trễ chuyến bay, thay đổi lịch)",
    simulateImportant: "Mô phỏng cảnh báo",
    testNotify: "Gửi thử thông báo",
    uiHeader: "Giao diện",
    modeDesc: "Dark / Light (áp dụng ngay)",
    themeColor: "Màu chủ đề",
    font: "Font chữ",
    privacyHeader: "Quyền riêng tư & Bảo mật",
    locationDesc: "Cho phép ứng dụng sử dụng vị trí để cảnh báo theo khu vực",
    locationOn: "Đã bật",
    enableLocation: "Bật vị trí",
    disableLocation: "Tắt trong app",
    savedLocal: "Đã lưu (local)",
    savedServer: "Đã lưu (server)",
    noNotificationSupport: "Trình duyệt không hỗ trợ thông báo",
    noGeoSupport: "Trình duyệt không hỗ trợ vị trí",
    allowPermission: "Cho phép quyền khi trình duyệt hỏi",
    currencyHeader: "Quy đổi tiền tệ",
    currencyDesc: "Chọn tiền tệ hiển thị - tỉ giá cập nhật tự động.",
    currencySelect: "Đơn vị tiền tệ",
    refreshRates: "Cập nhật tỉ giá",
    samplePrice: "Ví dụ: Giá tour (VND)",
    detectAuto: "Tự động (dựa trên trình duyệt)",
    savedRates: "Tỉ giá đã lưu",
    ratesFail: "Không lấy được tỉ giá",
    supportHeader: "Trợ giúp & Hỗ trợ",
    supportMethod: "Phương thức hỗ trợ",
    supportChat: "Chat",
    supportEmail: "Email",
    supportHotline: "Hotline",
    tutorialMini: "Hướng dẫn (mini-tutorial)",
    faqCenter: "Trung tâm trợ giúp (FAQ)",
    supportChatInfo: "Mở chat để kết nối với đội ngũ hỗ trợ (widget tích hợp).",
    supportEmailInfo: "Gửi email đến địa chỉ hỗ trợ của chúng tôi.",
    supportHotlineInfo: "Gọi số hotline để được hỗ trợ ngay lập tức.",
    modulesHeader: "Modules hiển thị trên Home",
    modulesDesc: "Chọn module bạn muốn hiển thị trên trang chủ",
    modSeasonal: "Gợi ý tour theo mùa",
    modTrending: "Tour theo xu hướng",
    modDiscount: "Tour giảm giá",
    modNearby: "Tour gần vị trí của bạn",
    modBlog: "Blog du lịch",
    modGallery: "Bộ sưu tập ảnh",
    modulesPreviewTitle: "Preview (mock)",
    modulesEnabledText: "Modules bật:",
    travelersHeader: "Danh sách người đi",
    travelerName: "Tên",
    travelerDob: "Ngày sinh",
    travelerId: "CCCD / ID",
    addTraveler: "Thêm người đi",
    setDefault: "Chọn mặc định",
    remove: "Xóa",
    autofillPreview: "Xem trước tự động điền khi đặt tour",
    noTravelers: "Chưa có danh sách người đi",
    assistantTitle: "TripMind AI",
    assistantIntro: "Hỏi trợ lý bất cứ điều gì về đặt tour, hủy, đổi lịch, hoàn tiền...",
    assistantPlaceholder: "Gõ câu hỏi của bạn... (ví dụ: hoàn tiền, hủy tour, đổi lịch)",
    assistantSend: "Gửi",
    assistantWaiting: "Đang trả lời...",
    assistantNoAnswer: "Xin lỗi, mình chưa hiểu. Vui lòng hỏi khác hoặc liên hệ Hotline.",
    resetDefaults: "Reset",
    saved: "Đã lưu",
  },
  en: {
    title: "Settings",
    subtitle: "Customize your experience",
    generalTab: "General",
    notificationsTab: "Notifications",
    appearanceTab: "Appearance",
    privacyTab: "Privacy",
    currencyTab: "Currency",
    supportTab: "Support",
    modulesTab: "Home Modules",
    travelersTab: "Travelers",
    languageHeader: "Language",
    viet: "Vietnamese",
    eng: "English",
    zh: "Chinese",
    ko: "Korean",
    notificationsHeader: "Notifications",
    toggleNotificationsDesc: "Turn system notifications on or off",
    notifyByType: "Notification types",
    chooseTypes: "Choose types you want to receive",
    trip: "Trip",
    weather: "Weather",
    promo: "Promotions",
    importantAlerts: "Important alerts",
    importantDesc: "(flight delays, schedule changes)",
    simulateImportant: "Simulate alert",
    testNotify: "Test notification",
    uiHeader: "Appearance",
    modeDesc: "Dark / Light (applies immediately)",
    themeColor: "Theme color",
    font: "Font",
    privacyHeader: "Privacy & Security",
    locationDesc: "Allow app to use location for area-based alerts",
    locationOn: "Enabled",
    enableLocation: "Enable location",
    disableLocation: "Disable in-app",
    savedLocal: "Saved (local)",
    savedServer: "Saved (server)",
    noNotificationSupport: "Browser doesn't support notifications",
    noGeoSupport: "Browser doesn't support geolocation",
    allowPermission: "Allow permission when prompted",
    currencyHeader: "Currency & Locale",
    currencyDesc: "Choose display currency; exchange rates update automatically.",
    currencySelect: "Currency",
    refreshRates: "Refresh rates",
    samplePrice: "Sample: Tour price (VND)",
    detectAuto: "Auto (from browser locale)",
    savedRates: "Saved rates",
    ratesFail: "Failed to fetch rates",
    supportHeader: "Help & Support",
    supportMethod: "Support method",
    supportChat: "Chat",
    supportEmail: "Email",
    supportHotline: "Hotline",
    tutorialMini: "Mini tutorial",
    faqCenter: "Help Center (FAQ)",
    supportChatInfo: "Open chat to connect with our support team (widget integration).",
    supportEmailInfo: "Send email to our support address.",
    supportHotlineInfo: "Call the hotline for immediate support.",
    modulesHeader: "Home modules",
    modulesDesc: "Choose which modules show on Home",
    modSeasonal: "Seasonal suggestions",
    modTrending: "Trending tours",
    modDiscount: "Discounted tours",
    modNearby: "Nearby tours",
    modBlog: "Travel blog",
    modGallery: "Destination gallery",
    modulesPreviewTitle: "Modules preview",
    modulesEnabledText: "Modules enabled:",
    travelersHeader: "Travelers list",
    travelerName: "Name",
    travelerDob: "DOB",
    travelerId: "ID",
    addTraveler: "Add traveler",
    setDefault: "Set default",
    remove: "Remove",
    autofillPreview: "Autofill preview when booking",
    noTravelers: "No travelers saved",
    assistantTitle: "AI Assistant",
    assistantIntro: "Ask the assistant anything about booking, cancellations, refunds, schedules...",
    assistantPlaceholder: "Type your question... (e.g. refund, cancel, reschedule)",
    assistantSend: "Send",
    assistantWaiting: "Thinking...",
    assistantNoAnswer: "Sorry, I didn't understand. Try another question or contact Hotline.",
    resetDefaults: "Reset",
    saved: "Saved",
  },
};
// zh and ko reuse en keys (you can extend)
translations.zh = { ...translations.en };
translations.ko = { ...translations.en };

/* ---------------- theme colors ---------------- */
const THEME_HEX = { Orange: "#fb923c", Blue: "#3b82f6", Green: "#10b981", Purple: "#8b5cf6", Red: "#ef4444" };

/* ---------------- storage helpers ---------------- */
const readJSON = (k, fallback) => {
  try {
    const s = localStorage.getItem(k);
    return s ? JSON.parse(s) : fallback;
  } catch {
    return fallback;
  }
};
const writeJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

/* ---------------- canned assistant answers (fallback) ---------------- */
const canned = {
  refund: { en: "Refunds typically process within ~7 business days. Provide booking ID to support.", vi: "Hoàn tiền thường xử lý trong ~7 ngày làm việc. Gửi mã đặt chỗ cho hỗ trợ." },
  cancel: { en: "Cancellation rules vary by product. Check your booking page or contact support.", vi: "Chính sách hủy khác nhau theo sản phẩm. Kiểm tra trang đặt chỗ hoặc liên hệ hỗ trợ." },
  reschedule: { en: "To reschedule, provide booking ID and desired date. Support can assist.", vi: "Để đổi lịch, cung cấp mã đặt chỗ và ngày muốn đổi. Hỗ trợ sẽ giúp." },
  price: { en: "Prices change by date & availability. Use flexible date filters for best price.", vi: "Giá tùy theo ngày và tình trạng. Dùng bộ lọc ngày linh hoạt để tìm giá tốt." },
  visa: { en: "Visa rules depend on nationality and destination; check government sources or ask support.", vi: "Quy định visa phụ thuộc quốc tịch và điểm đến; kiểm tra nguồn chính phủ hoặc hỏi hỗ trợ." },
  covid: { en: "Check latest travel restrictions & entry rules before booking.", vi: "Kiểm tra quy định nhập cảnh & hạn chế trước khi đặt." },
  default: { en: "I can help with bookings, refunds, cancellations, schedules. For urgent requests call hotline.", vi: "Mình hỗ trợ đặt tour, hoàn tiền, hủy, đổi lịch. Nếu gấp hãy gọi hotline." },
};

/* ---------------- main component ---------------- */
export default function Settings() {
  const defaultSettings = {
    language: "en", // default color theme will be Blue
    notificationsEnabled: true,
    notificationTypes: { trip: true, weather: true, promo: false },
    importantAlerts: true,
    theme: { mode: "light", color: "Blue", font: "Inter" },
    privacy: { locationAccess: false, coords: null },
    preferences: {
      currency: "VND",
      homeModules: { seasonal: true, trending: true, discount: true, nearby: false, blog: true, gallery: true },
      defaultTravelerId: null,
    },
    support: { method: "Chat", miniTutorial: true },
    payment: { defaultMethodId: null },
  };

  const [settings, setSettings] = useState(readJSON("app_settings_v1", defaultSettings));
  const [statusMessage, setStatusMessage] = useState("");
  const [previewAlert, setPreviewAlert] = useState(null);
  const [activeTab, setActiveTab] = useState("modules");
  const serverTimer = useRef(null);

  const [rates, setRates] = useState(readJSON("exchange_rates_v1", { base: "VND", rates: { USD: 0.000043, EUR: 0.000039, VND: 1 }, fetchedAt: null }));
  const [fetchingRates, setFetchingRates] = useState(false);
  const [sampleVND, setSampleVND] = useState(1500000);
  const [travelers, setTravelers] = useState(readJSON("travelers_v1", []));

  // assistant state
  const [assistantMessages, setAssistantMessages] = useState([]);
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantThinking, setAssistantThinking] = useState(false);

  // robust t function
  const t = (k) => {
    const lang = settings.language || "en";
    if (translations[lang] && translations[lang][k]) return translations[lang][k];
    if (translations.en && translations.en[k]) return translations.en[k];
    return k;
  };

  /* persist settings */
  useEffect(() => {
    try {
      writeJSON("app_settings_v1", settings);
      setStatusMessage(t("savedLocal"));
    } catch (e) {
      setStatusMessage("Save failed: " + e.message);
    }
    if (serverTimer.current) clearTimeout(serverTimer.current);
    serverTimer.current = setTimeout(() => setStatusMessage(t("savedServer") || t("saved")), 700);
    return () => { if (serverTimer.current) clearTimeout(serverTimer.current); };
  }, [settings]);

  /* apply theme */
  useEffect(() => {
    if (settings.theme.mode === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    const hex = THEME_HEX[settings.theme.color] || THEME_HEX.Blue;
    document.documentElement.style.setProperty("--theme-hex", hex);
    if (settings.theme.mode === "dark") {
      document.documentElement.style.setProperty("--bg", "#0b1220");
      document.documentElement.style.setProperty("--panel", "#071022");
      document.documentElement.style.setProperty("--text", "#e6eef8");
      document.documentElement.style.setProperty("--muted", "#94a3b8");
    } else {
      document.documentElement.style.setProperty("--bg", "#f8fafc");
      document.documentElement.style.setProperty("--panel", "#ffffff");
      document.documentElement.style.setProperty("--text", "#0f172a");
      document.documentElement.style.setProperty("--muted", "#6b7280");
    }
    const fontMap = { Inter: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto", Roboto: "Roboto, 'Helvetica Neue', Arial", System: "system-ui, -apple-system, 'Segoe UI', Roboto", "Times New Roman": "'Times New Roman', Times, serif" };
    document.body.style.fontFamily = fontMap[settings.theme.font] || fontMap.System;
  }, [settings.theme]);

  /* rates fetcher */
  const fetchRates = async () => {
    setFetchingRates(true);
    setStatusMessage("Fetching rates...");
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/VND");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      const next = { base: data.base_code || "VND", rates: data.rates || {}, fetchedAt: Date.now() };
      setRates(next);
      writeJSON("exchange_rates_v1", next);
      setStatusMessage(t("saved"));
    } catch (err) {
      console.warn(err);
      const cached = readJSON("exchange_rates_v1", null);
      if (cached) { setRates(cached); setStatusMessage(t("saved")); } else setStatusMessage(t("ratesFail"));
    } finally {
      setFetchingRates(false);
      setTimeout(() => setStatusMessage(""), 1200);
    }
  };

  useEffect(() => {
    const cached = readJSON("exchange_rates_v1", null);
    const twelveHours = 1000 * 60 * 60 * 12;
    if (!cached || !cached.fetchedAt || Date.now() - cached.fetchedAt > twelveHours) fetchRates();
    else setRates(cached);
  }, []);

  /* currency helpers */
  const convertFromVND = (amountVND, toCurrency) => {
    if (amountVND == null || Number.isNaN(Number(amountVND))) return null;
    if (toCurrency === "VND") return Number(amountVND);
    if (!rates || !rates.base || !rates.rates) return null;
    if (rates.base === "VND") {
      const toRate = rates.rates[toCurrency];
      if (!toRate) return null;
      return Number(amountVND) * Number(toRate);
    }
    const r = rates.rates;
    if (r["VND"]) {
      const vndToBase = 1 / r["VND"];
      if (toCurrency === rates.base) return Number(amountVND) * vndToBase;
      if (r[toCurrency]) return Number(amountVND) * vndToBase * r[toCurrency];
    }
    return null;
  };
  const formatCurrency = (value, currencyCode) => {
    if (value == null || Number.isNaN(Number(value))) return "-";
    const localeMap = { vi: "vi-VN", en: "en-US", zh: "zh-CN", ko: "ko-KR" };
    const locale = localeMap[settings.language] || "en-US";
    try {
      return new Intl.NumberFormat(locale, { style: "currency", currency: currencyCode }).format(Number(value));
    } catch {
      return `${currencyCode} ${Number(value).toFixed(2)}`;
    }
  };

  /* helpers */
  const update = (fn) => setSettings((prev) => (typeof fn === "function" ? fn(prev) : { ...prev, ...fn }));
  const toggleModule = (k) => update((p) => ({ ...p, preferences: { ...p.preferences, homeModules: { ...p.preferences.homeModules, [k]: !p.preferences.homeModules[k] } } }));

  /* assistant: integration point + fallback */
  const sendAssistant = async (text) => {
    if (!text || assistantThinking) return;
    const trimmed = text.trim();
    setAssistantMessages((m) => [...m, { id: "u" + Date.now(), role: "user", text: trimmed }]);
    setAssistantInput("");
    setAssistantThinking(true);

    // simulate short delay
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));

    // Optional: call backend LLM route if you implement it:
    // try {
    //   const res = await fetch("/api/assistant", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ q: trimmed, lang: settings.language }) });
    //   if (res.ok) {
    //     const json = await res.json();
    //     setAssistantMessages((m) => [...m, { id: "a" + Date.now(), role: "assistant", text: json.answer }]);
    //     setAssistantThinking(false);
    //     return;
    //   }
    // } catch (e) { console.warn("assistant backend error", e); }

    // fallback rule-based reply
    const l = trimmed.toLowerCase();
    let reply = canned.default[settings.language] || canned.default.en;
    if (l.includes("refund") || l.includes("hoàn")) reply = canned.refund[settings.language] || canned.refund.en;
    else if (l.includes("cancel") || l.includes("hủy")) reply = canned.cancel[settings.language] || canned.cancel.en;
    else if (l.includes("resched") || l.includes("đổi") || l.includes("thay")) reply = canned.reschedule[settings.language] || canned.reschedule.en;
    else if (l.includes("price") || l.includes("giá") || l.includes("ticket")) reply = canned.price[settings.language] || canned.price.en;
    else if (l.includes("visa")) reply = canned.visa[settings.language] || canned.visa.en;
    else if (l.includes("covid")) reply = canned.covid ? (canned.covid[settings.language] || canned.covid.en) : (canned.default[settings.language] || canned.default.en);

    const suggestions = settings.language === "vi" ? "Xem FAQ, Chính sách hủy, hoặc gọi hotline." : "See FAQ, cancellation policy, or call hotline.";
    const finalText = reply + "\n\n" + suggestions;

    setAssistantMessages((m) => [...m, { id: "a" + Date.now(), role: "assistant", text: finalText }]);
    setAssistantThinking(false);
  };

  /* small icon */
  const Icon = ({ name, className = "" }) => {
    const icons = {
      settings: (<svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-.29 2.83 2 2 0 0 1-2.83-.29l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V20a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83.29 2 2 0 0 1-.29-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L5.3 4.7A2 2 0 0 1 8.13 3.87l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v.09c.12.5.48.93 1 1.51.51.57.98 1.04 1.82.33l.06-.06A2 2 0 0 1 20.7 4.7l-.06.06a1.65 1.65 0 0 0-.33 1.82V8a1.65 1.65 0 0 0 1 1.51H20a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
      bell: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 17H9a3 3 0 0 1-3-3V9a6 6 0 1 1 12 0v5a3 3 0 0 1-3 3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>),
      palette: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12a3.5 3.5 0 1 0 0-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.24 16.24A9 9 0 1 1 7.76 3.76 9 9 0 0 0 20.24 16.24z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>)
    };
    return icons[name] || null;
  };

  /* support info mock */
  const SUPPORT = { phone: "+84 123 456 789", email: "support@tripmind.com", chatUrl: "https://example.com/chat" };

  /* module label map */
  const MODULE_LABEL_MAP = {
    seasonal: "modSeasonal",
    trending: "modTrending",
    discount: "modDiscount",
    nearby: "modNearby",
    blog: "modBlog",
    gallery: "modGallery",
  };

  /* render */
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 p-6">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 sticky top-6">
          <div style={{ background: "var(--panel)", padding: 16, borderRadius: 12 }}>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 44, height: 44, background: "var(--theme-hex)", borderRadius: 10 }} />
              <div>
                <div className="font-semibold text-lg">TripMind</div>
                <div className="text-sm muted">{t("subtitle")}</div>
              </div>
            </div>

            <nav className="mt-4">
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab("modules")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "modules" ? "bg-[var(--theme-hex)] text-white" : "hover:bg-gray-100"}`}>🏠 {t("modulesTab")}</button></li>
                <li><button onClick={() => setActiveTab("general")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "general" ? "bg-[var(--theme-hex)] text-white" : "hover:bg-gray-100"}`}>⚙️ {t("generalTab")}</button></li>
                <li><button onClick={() => setActiveTab("notifications")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "notifications" ? "bg-[var(--theme-hex)] text-white" : "hover:bg-gray-100"}`}>🔔 {t("notificationsTab")}</button></li>
                <li><button onClick={() => setActiveTab("appearance")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "appearance" ? "bg-[var(--theme-hex)] text-white" : "hover:bg-gray-100"}`}>🎨 {t("appearanceTab")}</button></li>
                <li><button onClick={() => setActiveTab("privacy")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "privacy" ? "bg-[var(--theme-hex)] text-white" : "hover:bg-gray-100"}`}>🔒 {t("privacyTab")}</button></li>
                <li><button onClick={() => setActiveTab("currency")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "currency" ? "bg-[var(--theme-hex)] text-white" : "hover:bg-gray-100"}`}>💱 {t("currencyTab")}</button></li>
                <li><button onClick={() => setActiveTab("support")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "support" ? "bg-[var(--theme-hex)] text-white" : "hover:bg-gray-100"}`}>🆘 {t("supportTab")}</button></li>
                <li><button onClick={() => setActiveTab("travelers")} className={`w-full text-left px-3 py-2 rounded ${activeTab === "travelers" ? "bg-[var(--theme-hex)] text-white" : "hover:bg-gray-100"}`}>👥 {t("travelersTab")}</button></li>
              </ul>
            </nav>

            <div className="mt-6 text-xs muted">{statusMessage}</div>
          </div>
        </aside>

        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <header className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <p className="text-sm muted">{t("subtitle")}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm muted">{settings.language.toUpperCase()}</div>
                <div style={{ width: 10 }} />
                <button className="px-3 py-2 rounded" onClick={() => { localStorage.removeItem("app_settings_v1"); localStorage.removeItem("exchange_rates_v1"); localStorage.removeItem("travelers_v1"); setSettings(defaultSettings); setTravelers([]); setStatusMessage(t("saved")); }}>{t("resetDefaults")}</button>
              </div>
            </div>
          </header>

          <section aria-live="polite">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* MODULES */}
              {activeTab === "modules" && (
                <div style={{ background: "var(--panel)", padding: 18, borderRadius: 12 }}>
                  <h3 className="font-semibold text-lg">{t("modulesHeader")}</h3>
                  <p className="text-sm muted mb-3">{t("modulesDesc")}</p>

                  <div className="grid grid-cols-1 gap-2">
                    {Object.keys(settings.preferences.homeModules).map((k) => (
                      <label key={k} className="flex items-center justify-between">
                        <span>{t(MODULE_LABEL_MAP[k] || k)}</span>
                        <input type="checkbox" checked={settings.preferences.homeModules[k]} onChange={() => toggleModule(k)} />
                      </label>
                    ))}
                  </div>

                  <div className="mt-4 p-3 border rounded bg-[var(--bg)]">
                    <div className="text-sm font-medium">{t("modulesPreviewTitle")}</div>
                    <div className="text-sm muted">{t("modulesEnabledText")}{" "}
                      {Object.entries(settings.preferences.homeModules).filter(([k, v]) => v).map(([k]) => t(MODULE_LABEL_MAP[k] || k)).join(", ") || "—"}
                    </div>
                  </div>
                </div>
              )}

              {/* GENERAL */}
              {activeTab === "general" && (
                <div style={{ background: "var(--panel)", padding: 18, borderRadius: 12 }}>
                  <h3 className="font-semibold text-lg mb-2">{t("languageHeader")}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2"><input type="radio" name="lang" checked={settings.language === "vi"} onChange={() => update((p) => ({ ...p, language: "vi" }))} /> <span>{t("viet")}</span></label>
                      <label className="flex items-center gap-2"><input type="radio" name="lang" checked={settings.language === "en"} onChange={() => update((p) => ({ ...p, language: "en" }))} /> <span>{t("eng")}</span></label>
                      <label className="flex items-center gap-2"><input type="radio" name="lang" checked={settings.language === "zh"} onChange={() => update((p) => ({ ...p, language: "zh" }))} /> <span>{t("zh")}</span></label>
                      <label className="flex items-center gap-2"><input type="radio" name="lang" checked={settings.language === "ko"} onChange={() => update((p) => ({ ...p, language: "ko" }))} /> <span>{t("ko")}</span></label>
                    </div>
                    <div className="ml-auto">
                      <select aria-label="Language select" value={settings.language} onChange={(e) => update((p) => ({ ...p, language: e.target.value }))} className="p-2 border rounded">
                        <option value="vi">{t("viet")}</option>
                        <option value="en">{t("eng")}</option>
                        <option value="zh">{t("zh")}</option>
                        <option value="ko">{t("ko")}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {(activeTab === "general" || activeTab === "notifications") && (
                <div style={{ background: "var(--panel)", padding: 18, borderRadius: 12 }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{t("notificationsHeader")}</h3>
                      <p className="text-sm muted">{t("toggleNotificationsDesc")}</p>
                    </div>
                    <label className="inline-flex items-center">
                      <input aria-label="Enable notifications" type="checkbox" checked={settings.notificationsEnabled} onChange={() => update((p) => ({ ...p, notificationsEnabled: !p.notificationsEnabled }))} />
                    </label>
                  </div>

                  <div className="mt-4">
                    <div className="font-medium">{t("notifyByType")}</div>
                    <div className="text-sm muted mb-2">{t("chooseTypes")}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <label className="flex items-center gap-2"><input type="checkbox" checked={settings.notificationTypes.trip} onChange={() => update((p) => ({ ...p, notificationTypes: { ...p.notificationTypes, trip: !p.notificationTypes.trip } }))} disabled={!settings.notificationsEnabled} /> {t("trip")}</label>
                      <label className="flex items-center gap-2"><input type="checkbox" checked={settings.notificationTypes.weather} onChange={() => update((p) => ({ ...p, notificationTypes: { ...p.notificationTypes, weather: !p.notificationTypes.weather } }))} disabled={!settings.notificationsEnabled} /> {t("weather")}</label>
                      <label className="flex items-center gap-2"><input type="checkbox" checked={settings.notificationTypes.promo} onChange={() => update((p) => ({ ...p, notificationTypes: { ...p.notificationTypes, promo: !p.notificationTypes.promo } }))} disabled={!settings.notificationsEnabled} /> {t("promo")}</label>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button className="px-3 py-2 rounded" style={{ background: "var(--theme-hex)", color: "#fff" }} onClick={() => { setPreviewAlert({ title: t("importantAlerts"), body: t("importantDesc") }); setTimeout(() => setPreviewAlert(null), 8000); }}>{t("simulateImportant")}</button>
                      <button className="px-3 py-2 btn-outline" onClick={() => setPreviewAlert(null)}>Clear</button>
                    </div>
                  </div>
                </div>
              )}

              {/* APPEARANCE */}
              {activeTab === "appearance" && (
                <div style={{ background: "var(--panel)", padding: 18, borderRadius: 12 }}>
                  <h3 className="font-semibold text-lg">{t("uiHeader")}</h3>
                  <p className="text-sm muted">{t("modeDesc")}</p>

                  <div className="mt-4 flex items-center gap-3">
                    <button onClick={() => update((p) => ({ ...p, theme: { ...p.theme, mode: "light" } }))} className={`px-3 py-2 rounded ${settings.theme.mode === "light" ? "ring-2" : "btn-outline"}`}>Light</button>
                    <button onClick={() => update((p) => ({ ...p, theme: { ...p.theme, mode: "dark" } }))} className={`px-3 py-2 rounded ${settings.theme.mode === "dark" ? "ring-2" : "btn-outline"}`}>Dark</button>
                  </div>

                  <div className="mt-4">
                    <div className="font-medium">{t("themeColor")}</div>
                    <div className="flex gap-2 mt-2">
                      {Object.keys(THEME_HEX).map((c) => (
                        <button key={c} onClick={() => update((p) => ({ ...p, theme: { ...p.theme, color: c } }))} className={`px-3 py-2 rounded`} style={{ background: settings.theme.color === c ? THEME_HEX[c] : "transparent", color: settings.theme.color === c ? "#fff" : "var(--text)", border: "1px solid rgba(0,0,0,0.06)" }}>{c}</button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="font-medium">{t("font")}</div>
                    <select className="mt-2 p-2 border rounded" value={settings.theme.font} onChange={(e) => update((p) => ({ ...p, theme: { ...p.theme, font: e.target.value } }))}>
                      <option>Inter</option>
                      <option>Roboto</option>
                      <option>System</option>
                      <option>Times New Roman</option>
                    </select>
                  </div>
                </div>
              )}

              {/* PRIVACY */}
              {activeTab === "privacy" && (
                <div style={{ background: "var(--panel)", padding: 18, borderRadius: 12 }}>
                  <h3 className="font-semibold text-lg">{t("privacyHeader")}</h3>
                  <p className="text-sm muted">{t("locationDesc")}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{t("locationDesc")}</div>
                      {settings.privacy.coords && <div className="text-sm muted">{t("locationOn")}: {settings.privacy.coords.lat.toFixed(4)}, {settings.privacy.coords.lon.toFixed(4)}</div>}
                    </div>
                    <div>
                      {settings.privacy.locationAccess ? (
                        <div className="flex flex-col items-end">
                          <div className="mb-2">{t("locationOn")}</div>
                          <button className="btn-outline" onClick={() => { setSettings((p) => ({ ...p, privacy: { ...p.privacy, locationAccess: false, coords: null } })); setStatusMessage(t("saved")); }}>{t("disableLocation")}</button>
                        </div>
                      ) : (
                        <button className="px-3 py-2" style={{ background: "var(--theme-hex)", color: "#fff" }} onClick={() => { if (!navigator.geolocation) { setStatusMessage(t("noGeoSupport")); return; } navigator.geolocation.getCurrentPosition((pos) => { setSettings((prev) => ({ ...prev, privacy: { ...prev.privacy, locationAccess: true, coords: { lat: pos.coords.latitude, lon: pos.coords.longitude } } })); setStatusMessage(t("saved")); }, (err) => { setStatusMessage("Location error: " + err.message); }, { timeout: 10000 }); }}>{t("enableLocation")}</button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* CURRENCY */}
              {activeTab === "currency" && (
                <div style={{ background: "var(--panel)", padding: 18, borderRadius: 12 }}>
                  <h3 className="font-semibold text-lg">{t("currencyHeader")}</h3>
                  <p className="text-sm muted mb-4">{t("currencyDesc")}</p>

                  <div className="mb-3">
                    <div className="font-medium mb-2">{t("currencySelect")}</div>
                    <div className="flex items-center gap-2">
                      <select value={settings.preferences.currency} onChange={(e) => update((p) => ({ ...p, preferences: { ...p.preferences, currency: e.target.value } }))} className="p-2 border rounded">
                        <option value="VND">VNĐ (VND)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="AUTO">{t("detectAuto")}</option>
                      </select>
                      <button className="px-3 py-2 border rounded" onClick={() => fetchRates()} disabled={fetchingRates}>{t("refreshRates")}</button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="font-medium mb-2">{t("samplePrice")}</div>
                    <div className="flex items-center gap-3">
                      <input className="p-2 border rounded w-40" value={sampleVND} onChange={(e) => setSampleVND(Number(e.target.value || 0))} type="number" />
                      <div className="text-sm muted">
                        {(() => {
                          const pref = settings.preferences.currency;
                          const target = pref === "AUTO" ? (navigator.language && navigator.language.startsWith("vi") ? "VND" : "USD") : pref;
                          if (target === "VND") return formatCurrency(sampleVND, "VND");
                          const conv = convertFromVND(Number(sampleVND), target);
                          if (conv == null) return t("ratesFail");
                          return `${formatCurrency(conv, target)} (${target})`;
                        })()}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{rates && rates.fetchedAt ? `${t("savedRates")}: ${new Date(rates.fetchedAt).toLocaleString()}` : ""}</div>
                  </div>
                </div>
              )}

              {/* SUPPORT (AI Assistant) */}
              {activeTab === "support" && (
                <div style={{ background: "var(--panel)", padding: 18, borderRadius: 12 }}>
                  <h3 className="font-semibold text-lg">{t("supportHeader")}</h3>
                  <p className="text-sm muted mb-3">{t("supportMethod")}</p>

                  <div className="flex flex-col gap-2 mb-4">
                    <label className="flex items-center gap-2"><input type="radio" name="supportMethod" checked={settings.support.method === "Chat"} onChange={() => update((p) => ({ ...p, support: { ...p.support, method: "Chat" } }))} /> {t("supportChat")}</label>
                    <label className="flex items-center gap-2"><input type="radio" name="supportMethod" checked={settings.support.method === "Email"} onChange={() => update((p) => ({ ...p, support: { ...p.support, method: "Email" } }))} /> {t("supportEmail")}</label>
                    <label className="flex items-center gap-2"><input type="radio" name="supportMethod" checked={settings.support.method === "Hotline"} onChange={() => update((p) => ({ ...p, support: { ...p.support, method: "Hotline" } }))} /> {t("supportHotline")}</label>
                  </div>

                  <div className="p-4 border rounded bg-[var(--bg)] mb-4">
                    {settings.support.method === "Chat" && (
                      <>
                        <div className="font-medium">{t("supportChat")}</div>
                        <div className="text-sm muted mb-2">{t("supportChatInfo")}</div>
                        <div className="flex gap-2"><button className="px-3 py-2 bg-[var(--theme-hex)] text-white rounded" onClick={() => window.open(SUPPORT.chatUrl, "_blank")}>{t("supportChat")}</button></div>
                      </>
                    )}
                    {settings.support.method === "Email" && (
                      <>
                        <div className="font-medium">{t("supportEmail")}</div>
                        <div className="text-sm muted mb-2">{t("supportEmailInfo")}</div>
                        <div><a href={`mailto:${SUPPORT.email}`} className="text-sm text-[var(--theme-hex)]">{SUPPORT.email}</a></div>
                      </>
                    )}
                    {settings.support.method === "Hotline" && (
                      <>
                        <div className="font-medium">{t("supportHotline")}</div>
                        <div className="text-sm muted mb-2">{t("supportHotlineInfo")}</div>
                        <div><a href={`tel:${SUPPORT.phone}`} className="text-sm text-[var(--theme-hex)]">{SUPPORT.phone}</a></div>
                      </>
                    )}
                  </div>

                  {/* AI ASSISTANT UI */}
                  <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 6px 20px rgba(2,6,23,0.06)" }}>
                    <div style={{ background: "linear-gradient(90deg, var(--theme-hex), rgba(59,130,246,0.85))", color: "#fff", padding: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>AI</div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{t("assistantTitle")}</div>
                          <div style={{ fontSize: 12, opacity: 0.9 }}>{t("assistantIntro")}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, opacity: 0.95 }}>{settings.language.toUpperCase()}</div>
                    </div>

                    <div style={{ background: "var(--panel)", padding: 12 }}>
                      <div style={{ maxHeight: 300, overflow: "auto", padding: 6, display: "flex", flexDirection: "column", gap: 8 }}>
                        {assistantMessages.length === 0 && <div style={{ color: "var(--muted)" }}>{t("assistantIntro")}</div>}
                        {assistantMessages.map((m) => (
                          <div key={m.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 4 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: m.role === "user" ? "rgba(59,130,246,0.08)" : "rgba(2,6,23,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                              {m.role === "user" ? (settings.language === "vi" ? "Bạn" : "You") : "AI"}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, lineHeight: 1.35, whiteSpace: "pre-wrap" }}>{m.text}</div>
                            </div>
                          </div>
                        ))}
                        {assistantThinking && <div style={{ fontStyle: "italic", color: "var(--muted)" }}>{t("assistantWaiting")}</div>}
                      </div>

                      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                        <textarea placeholder={t("assistantPlaceholder")} value={assistantInput} onChange={(e) => setAssistantInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendAssistant(assistantInput); } }} style={{ flex: 1, padding: 10, minHeight: 56, borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)" }} />
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <button onClick={() => sendAssistant(assistantInput)} style={{ background: "var(--theme-hex)", color: "#fff", padding: "8px 12px", borderRadius: 8, border: "none" }}>{t("assistantSend")}</button>
                          <button onClick={() => { setAssistantMessages([]); setAssistantInput(""); }} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", background: "transparent" }}>Clear</button>
                        </div>
                      </div>

                      <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {["refund", "cancel", "reschedule", "price", "visa", "covid"].map((s) => (
                          <button key={s} onClick={() => sendAssistant(s)} style={{ padding: "6px 10px", borderRadius: 16, border: "1px solid rgba(0,0,0,0.06)", background: "transparent", fontSize: 13 }}>{s}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TRAVELERS */}
              {activeTab === "travelers" && (
                <div style={{ background: "var(--panel)", padding: 18, borderRadius: 12 }}>
                  <h3 className="font-semibold text-lg">{t("travelersHeader")}</h3>
                  <p className="text-sm muted mb-3">{t("autofillPreview")}</p>

                  <TravelerForm t={t} onAdd={(name, dob, id) => {
                    const trav = { id: "trav_" + Math.random().toString(36).slice(2, 9), name, dob, idNumber: id };
                    const next = [trav, ...travelers];
                    setTravelers(next);
                    writeJSON("travelers_v1", next);
                    if (!settings.preferences.defaultTravelerId) update((p) => ({ ...p, preferences: { ...p.preferences, defaultTravelerId: trav.id } }));
                    setStatusMessage(t("saved"));
                    setTimeout(() => setStatusMessage(""), 1200);
                  }} />

                  <div className="mt-4">
                    {travelers.length ? (
                      <div className="space-y-2">
                        {travelers.map((tr) => (
                          <div key={tr.id} className="flex items-center justify-between p-2 border rounded">
                            <div>
                              <div className="font-medium">{tr.name} {settings.preferences.defaultTravelerId === tr.id && <span className="text-xs px-1 ml-2 rounded bg-[var(--theme-hex)] text-white">Default</span>}</div>
                              <div className="text-xs muted">DOB: {tr.dob} • ID: {tr.idNumber}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-xs" onClick={() => { update((p) => ({ ...p, preferences: { ...p.preferences, defaultTravelerId: tr.id } })); setStatusMessage(t("saved")); setTimeout(() => setStatusMessage(""), 800); }}>{t("setDefault")}</button>
                              <button className="text-xs" onClick={() => { const next = travelers.filter((t) => t.id !== tr.id); setTravelers(next); writeJSON("travelers_v1", next); }}>{t("remove")}</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : <div className="text-sm muted">{t("noTravelers")}</div>}
                  </div>

                  <div className="mt-4 p-3 border rounded bg-[var(--bg)]">
                    <div className="text-sm font-medium">{t("autofillPreview")}</div>
                    <div className="text-xs muted">{travelers.length ? JSON.stringify(travelers.find((t) => t.id === settings.preferences.defaultTravelerId) || travelers[0], null, 2) : t("noTravelers")}</div>
                  </div>
                </div>
              )}

            </div>

            {/* preview alert */}
            {previewAlert && (
              <div style={{ marginTop: 18, padding: 14, borderRadius: 10, background: "linear-gradient(90deg, rgba(255,255,255,0.03), rgba(0,0,0,0.03))", borderLeft: `4px solid var(--theme-hex)` }}>
                <div className="font-semibold">{previewAlert.title}</div>
                <div className="text-sm muted">{previewAlert.body}</div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------------- small component: TravelerForm ---------------- */
function TravelerForm({ onAdd, t }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [idNum, setIdNum] = useState("");
  return (
    <div className="p-3 border rounded bg-[var(--bg)]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input placeholder={t("travelerName") || "Full name"} className="p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder={t("travelerDob") || "YYYY-MM-DD"} className="p-2 border rounded" value={dob} onChange={(e) => setDob(e.target.value)} />
        <input placeholder={t("travelerId") || "CCCD / ID"} className="p-2 border rounded" value={idNum} onChange={(e) => setIdNum(e.target.value)} />
      </div>
      <div className="mt-2 flex gap-2">
        <button className="px-3 py-2 bg-[var(--theme-hex)] text-white rounded" onClick={() => { if (!name || !dob || !idNum) return; onAdd(name, dob, idNum); setName(""); setDob(""); setIdNum(""); }}>{t("addTraveler") || "Add"}</button>
      </div>
    </div>
  );
}
