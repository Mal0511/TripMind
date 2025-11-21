
import { useEffect } from "react";
import "../assets/create_schedule.css";
import { initItineraryApp } from "../js/ScheduleController.js";

export default function Schedule() {
  useEffect(() => {
    // Khởi tạo controller khi trang mount (FE local copy)
    try {
      initItineraryApp();
    } catch (e) {
      console.error('Failed to init itinerary app', e);
    }
    return () => {
      try { if (window.app && typeof window.app.destroy === 'function') window.app.destroy(); } catch (e) {}
      try { if (window.app) delete window.app; } catch (e) {}
    };
  }, []);

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      <div className="container">
        <aside id="sidebar" className="sidebar">
          <h3>Danh sách lịch trình</h3>
          <ul id="saved-list" className="saved-list"></ul>
        </aside>

        <main className="main-content">
          <h1>TẠO LỊCH TRÌNH DU LỊCH</h1>

          <section className="trip-info">
            <h2>Thông tin chuyến đi</h2>
            <div className="form-group">
              <label>
                Tên chuyến đi <span className="required">*</span>
              </label>
              <input id="trip-name" type="text" placeholder="Ví dụ: Du lịch Đà Nẵng - Hội An" />
            </div>

            <div className="datetime-row">
              <div className="form-group">
                <label>
                  Điểm đi <span className="required">*</span>
                </label>
                <input id="start-location" type="text" placeholder="Địa điểm xuất phát" />
              </div>
              <div className="form-group">
                <label>
                  Ngày bắt đầu <span className="required">*</span>
                </label>
                <input id="start-date" type="date" />
              </div>
              <div className="time-input-wrapper">
                <label>
                  Giờ bắt đầu <span className="required">*</span>
                </label>
                <input id="start-time" type="time" />
                <div id="start-time-buttons" className="time-buttons hidden">
                  <button className="btn btn-success btn-small" onClick={() => window.app && window.app.confirmTime && window.app.confirmTime('start-time')}>OK</button>
                  <button className="btn btn-secondary btn-small" onClick={() => window.app && window.app.cancelTime && window.app.cancelTime('start-time')}>Hủy</button>
                </div>
              </div>
            </div>
            <div className="datetime-row">
            <div className="form-group">
              <label>
                Điểm đến <span className="required">*</span>
              </label>
              <input id="end-location" type="text" placeholder="Điểm đến" />
            </div>
              <div className="form-group">
                <label>
                  Ngày kết thúc <span className="required">*</span>
                </label>
                <input id="end-date" type="date" required />
              </div>
              <div className="time-input-wrapper">
                <label>Giờ kết thúc</label>
                <input id="end-time" type="time" />
              </div>
              </div>
            
             <h2>Danh sách địa điểm</h2>
             <div className="form-group">
                  <label htmlFor="location-name">Tên địa điểm <span className="required">*</span></label>
                  <input id="location-name" type="text" placeholder="Tên địa điểm" style={{width:'100%'}} />
                </div>
            <div className="add-location" style={{marginBottom:'16px'}}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr 0.8fr',
                gap: '12px',
                alignItems: 'end',
                marginBottom: '8px',
                maxWidth: '100%'
              }}>
                
                <div className="form-group">
                  <label>Ngày bắt đầu <span className="required">*</span></label>
                  <input id="location-date" type="date" />
                </div>
                
                <div className="form-group">
                  <label>Giờ bắt đầu <span className="required">*</span></label>
                  <input id="arrival-time" type="time" />
                </div>
                <div className="form-group">
                  <label>Ngày kết thúc <span className="required">*</span></label>
                  <input id="location-date-end" type="date" />
                </div>
                <div className="form-group">
                  <label>Giờ kết thúc <span className="required">*</span></label>
                  <input id="departure-time" type="time" />
                </div>
                <div className="form-group" style={{display:'flex', alignItems:'flex-end', minWidth:'80px'}}>
                  <button id="add-location-btn" className="btn btn-add" style={{height:'40px', minWidth:'80px', width:'100%'}}>Thêm</button>
                </div>
              </div>
            </div>
            <ul id="location-list" className="location-list"></ul>
            <p className="muted">Ghi chú: "Ngày dự kiến", "Giờ bắt đầu", "Giờ kết thúc" cho từng điểm</p>
            <div className="form-actions">
              <button id="new-btn" className="btn btn-primary">Tạo mới</button>
              <button id="save-btn" className="btn btn-success">Lưu lịch trình</button>
              <button id="delete-btn" className="btn btn-danger hidden">Xóa</button>
            </div>
          </section>
          <div id="messages" className="messages" aria-live="polite"></div>
        </main>
      </div>
      {/* Detail panel shown when clicking a saved trip */}
          <div id="detail-panel" className="detail-panel hidden">
        <div className="detail-header">
          <h2 id="detail-title">Chi tiết lịch trình</h2>
          <button id="close-detail" className="btn-close">×</button>
        </div>
        <div id="detail-content" className="detail-content" style={{ padding: '16px', overflowY: 'auto' }}>
          {/* Content rendered by controller: read-only view or edit form */}
        </div>
          <div className="detail-actions" style={{ padding: '12px', borderTop: '1px solid #eef2f7', display: 'flex', gap: '8px' }}>
          <button id="edit-btn" className="btn btn-edit">Chỉnh sửa</button>
          <button id="save-edit-btn" className="btn btn-success">Lưu</button>
          <button id="cancel-edit-btn" className="btn btn-secondary">Hủy</button>
          <button id="delete-btn-panel" className="btn btn-danger hidden">Xóa</button>
        </div>
      </div>
    </div>
  );
}
