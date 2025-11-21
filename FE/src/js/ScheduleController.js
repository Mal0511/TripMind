/* FE copy of ScheduleController - adapted to export an init function */
class ItineraryApp {
  constructor() {
    this.locations = [];
    this.currentTrip = null;
    this.isEditing = false;
    this.draggedElement = null;
    this.timeValues = {}; // Store temporary time values
    this.editingLocationIndex = -1; // -1 when adding new, >=0 when editing a location
    this.init();
  }
  // Khởi tạo ứng dụng
  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.loadSavedTrips();
    this.setMinDate();
  }
  // Lưu trữ các phần tử DOM được sử dụng thường xuyên
  cacheElements() {
    this.el = {
      tripName: document.getElementById("trip-name"),
      startLocation: document.getElementById("start-location"),
      startDate: document.getElementById("start-date"),
      startTime: document.getElementById("start-time"),
      endLocation: document.getElementById("end-location"),
      endDate: document.getElementById("end-date"),
      endTime: document.getElementById("end-time"),
      locationName: document.getElementById("location-name"),
      arrivalTime: document.getElementById("arrival-time"),
      departureTime: document.getElementById("departure-time"),
      locationDate: document.getElementById("location-date"),
      locationList: document.getElementById("location-list"),
      messages: document.getElementById("messages"),
      savedList: document.getElementById("saved-list"),
      detailPanel: document.getElementById("detail-panel"),
      detailTitle: document.getElementById("detail-title"),
      detailContent: document.getElementById("detail-content"),
      saveEditBtn: document.getElementById("save-edit-btn"),
      cancelEditBtn: document.getElementById("cancel-edit-btn"),
      editBtn: document.getElementById("edit-btn"),
      deleteBtn: document.getElementById("delete-btn"),
      deleteBtnPanel: document.getElementById("delete-btn-panel"),
    };
  }
  // Gắn các trình xử lý sự kiện
  attachEventListeners() {
    if (this._listenersAttached) return;
    this._listenersAttached = true;
    const addBtn = document.getElementById("add-location-btn");
    if (addBtn) addBtn.addEventListener("click", () => this.addLocation());
    const newBtn = document.getElementById("new-btn");
    if (newBtn) newBtn.addEventListener("click", () => this.newTrip());
    const saveBtn = document.getElementById("save-btn");
    if (saveBtn) saveBtn.addEventListener("click", () => this.saveTrip());
    const closeBtn = document.getElementById("close-detail");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeDetail());
    if (this.el.editBtn) this.el.editBtn.addEventListener("click", () => this.enableEditPanel());
    if (this.el.deleteBtn) this.el.deleteBtn.addEventListener("click", () => this.deleteTrip());
    if (this.el.deleteBtnPanel) this.el.deleteBtnPanel.addEventListener("click", () => this.deleteTripFromPanel());
    if (this.el.saveEditBtn) this.el.saveEditBtn.addEventListener("click", () => this.saveEditPanel());
    if (this.el.cancelEditBtn) this.el.cancelEditBtn.addEventListener("click", () => this.cancelEditPanel());
   

  // Nhập hỗ trợ phím cho đầu vào vị trí
    [this.el.locationName, this.el.locationDate].forEach((el) => {
      if (!el) return;
      el.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.addLocation();
      });
    });

  // Hỗ trợ đóng panel bằng phím Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeDetail();
    });
  }
  // Tải các chuyến đi đã lưu từ localStorage
  loadSavedTrips() {
    try {
      const raw = localStorage.getItem("itinerary_trips");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      this.saved = parsed;
      if (Array.isArray(parsed) && parsed.length > 0) {
        this.currentTrip = parsed[0];
        this.renderSavedList();
      }
      // đảm bảo các nút hành động phản ánh trạng thái hiện tại
      this.updateActionButtons();
    } catch (e) {
      console.error("Load saved trips error:", e);
    }
  }
  // Lập lịch ngày tối thiểu cho ngày bắt đầu chuyến đi
  setMinDate() {
    const start = this.el.startDate;
    if (start) {
      const today = new Date().toISOString().split("T")[0];
      start.setAttribute("min", today);
    }
  }
  // Thêm địa điểm vào danh sách
  addLocation() {
    const name = this.el.locationName && this.el.locationName.value;
    const date = this.el.locationDate && this.el.locationDate.value;
    const dateEnd = document.getElementById('location-date-end')?.value || '';
    if (!name) return this.showMessage("Vui lòng nhập tên địa điểm", "error");
    // ngăn chặn tên địa điểm trùng lặp (không phân biệt chữ hoa chữ thường), bỏ qua chỉ số đang chỉnh sửa
    const lower = (name || '').trim().toLowerCase();
    const dup = this.locations.find((l, i) => i !== this.editingLocationIndex && (l.name || '').trim().toLowerCase() === lower);
    if (dup) return this.showMessage('Tên địa điểm đã tồn tại trong danh sách. Vui lòng nhập tên khác.', 'error');
    const arrival = this.el.arrivalTime && this.el.arrivalTime.value;
    const departure = this.el.departureTime && this.el.departureTime.value;
    // nếu cả hai thời gian được cung cấp cho vị trí, đảm bảo giờ đến < giờ đi
    if (arrival && departure) {
      try {
        const a = new Date((date || '') + 'T' + arrival);
        const d = new Date((date || '') + 'T' + departure);
        if (!isNaN(a.getTime()) && !isNaN(d.getTime()) && d.getTime() <= a.getTime()) {
          return this.showMessage('Giờ kết thúc của điểm phải lớn hơn giờ bắt đầu', 'error');
        }
      } catch (e) {}
    }
    const item = { name, dateStart: date, dateEnd, arrival, departure };
    if (this.editingLocationIndex >= 0 && this.editingLocationIndex < this.locations.length) {
      // cập nhật vị trí hiện có
      this.locations[this.editingLocationIndex] = item;
      this.editingLocationIndex = -1;
    } else {
      this.locations.push(item);
    }
    this.renderLocations();
    this.el.locationName.value = "";
    this.el.locationDate.value = "";
    if (this.el.arrivalTime) this.el.arrivalTime.value = "";
    if (this.el.departureTime) this.el.departureTime.value = "";
    // nếu panel đang mở ở chế độ chỉnh sửa, làm mới nội dung có thể chỉnh sửa của panel để phản ánh this.locations
    if (this.isEditing && this.el.detailContent && this.el.detailPanel && this.el.detailPanel.classList.contains('show')) {
      this.renderDetailContent(Object.assign({}, this.currentTrip || {}, { locations: this.locations }), true);
    }
  }

  // Xóa form để tạo chuyến đi mới
  newTrip() {
    this.currentTrip = null;
    this.locations = [];
    if (this.el.tripName) this.el.tripName.value = "";
    if (this.el.startLocation) this.el.startLocation.value = "";
    if (this.el.startDate) this.el.startDate.value = "";
    if (this.el.startTime) this.el.startTime.value = "";
    if (this.el.endLocation) this.el.endLocation.value = "";
    if (this.el.endDate) this.el.endDate.value = "";
    if (this.el.endTime) this.el.endTime.value = "";
    this.renderLocations();
    this.showMessage("Form đã được làm mới", "success");
    this.updateActionButtons();
  }

  // Xóa chỉ các trường đầu vào (không thay đổi lựa chọn đã lưu)
  clearFormFields() {
    if (this.el.tripName) this.el.tripName.value = "";
    if (this.el.startLocation) this.el.startLocation.value = "";
    if (this.el.startDate) this.el.startDate.value = "";
    if (this.el.startTime) this.el.startTime.value = "";
    if (this.el.endLocation) this.el.endLocation.value = "";
    if (this.el.endDate) this.el.endDate.value = "";
    if (this.el.endTime) this.el.endTime.value = "";
    this.locations = [];
    this.renderLocations();
    this.editingLocationIndex = -1;
  }
  // Xác thực dữ liệu chuyến đi trước khi lưu
  validateTrip(trip) {
    if (!trip.name || !trip.name.trim()) return { ok: false, msg: "Tên chuyến đi là trường bắt buộc" };
    if (!trip.start || !trip.start.trim()) return { ok: false, msg: "Điểm đi là trường bắt buộc" };
    if (!trip.startDate || !trip.startDate.trim()) return { ok: false, msg: "Ngày bắt đầu là trường bắt buộc" };
    if (!trip.startTime || !trip.startTime.trim()) return { ok: false, msg: "Giờ bắt đầu là trường bắt buộc" };
    if (!trip.end || !trip.end.trim()) return { ok: false, msg: "Điểm đến là trường bắt buộc" };
    if (!trip.endDate || !trip.endDate.trim()) return { ok: false, msg: "Ngày kết thúc là trường bắt buộc" };
    if (!trip.endTime || !trip.endTime.trim()) return { ok: false, msg: "Giờ kết thúc là trường bắt buộc" };
    // kiểm tra rằng ngày giờ kết thúc phải sau ngày giờ bắt đầu
    try {
      const sDate = new Date(trip.startDate + 'T' + (trip.startTime || '00:00'));
      const eDate = new Date(trip.endDate + 'T' + (trip.endTime || '00:00'));
      if (isNaN(sDate.getTime()) || isNaN(eDate.getTime())) {
        return { ok: false, msg: 'Ngày/giờ không hợp lệ' };
      }
      if (eDate.getTime() <= sDate.getTime()) return { ok: false, msg: 'Ngày kết thúc phải lớn hơn ngày/giờ bắt đầu' };
    } catch (e) {}
    return { ok: true };
  }
  // Cập nhật trạng thái hiển thị của các nút hành động dựa trên trạng thái hiện tại
  updateActionButtons() {
    // nút xóa chính
    try {
      if (this.el.deleteBtn) {
        if (this.currentTrip) this.el.deleteBtn.classList.remove('hidden'); else this.el.deleteBtn.classList.add('hidden');
      }
      // nút xóa trên panel
      if (this.el.deleteBtnPanel) {
        if (this.currentTrip) this.el.deleteBtnPanel.classList.remove('hidden'); else this.el.deleteBtnPanel.classList.add('hidden');
      }
    } catch (e) {}
  }
  // Kết xuất danh sách địa điểm trong giao diện người dùng
  renderLocations() {
    const list = this.el.locationList;
    if (!list) return;
    list.innerHTML = "";
    this.locations.forEach((loc, idx) => {
      const li = document.createElement("li");
      li.className = "location-item";
      li.innerHTML = `<div class="drag-handle">☰</div>
        <div class="item-content">
          <div class="item-name">${loc.name}</div>
          <div class="item-time">
            ${loc.dateStart || ''} ${loc.arrival || ''} - ${loc.dateEnd || ''} ${loc.departure || ''}
          </div>
        </div>
        <div class="item-actions">
          <button class="btn btn-small btn-edit-loc" data-idx="${idx}">Sửa</button>
          <button class="btn btn-small btn-delete-loc" data-idx="${idx}">Xóa</button>
        </div>`;
      list.appendChild(li);
    });

   // đính kèm trình xử lý cho chỉnh sửa/xóa mỗi vị trí
    Array.from(list.querySelectorAll('.btn-edit-loc')).forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.idx, 10);
        this.editLocationToForm(idx);
      });
    });
    Array.from(list.querySelectorAll('.btn-delete-loc')).forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.idx, 10);
        this.removeLocation(idx);
      });
    });
  }
  // Chỉnh sửa vị trí đã cho trong biểu mẫu đầu vào
  editLocationToForm(idx) {
    if (idx < 0 || idx >= this.locations.length) return;
    const loc = this.locations[idx];
    if (this.el.locationName) this.el.locationName.value = loc.name || '';
    if (this.el.locationDate) this.el.locationDate.value = loc.date || '';
    if (this.el.arrivalTime) this.el.arrivalTime.value = loc.arrival || '';
    if (this.el.departureTime) this.el.departureTime.value = loc.departure || '';
    this.editingLocationIndex = idx;
    // tập trung vào tên đầu vào để chỉnh sửa tín hiệu
    try { this.el.locationName.focus(); } catch (e) {}
  }
  // Xóa vị trí đã cho khỏi danh sách
  removeLocation(idx) {
    if (idx < 0 || idx >= this.locations.length) return;
    this.locations.splice(idx, 1);
    this.renderLocations();
  }
  // Lưu chuyến đi hiện tại vào localStorage
  saveTrip() {
    const trip = {
      name: this.el.tripName && this.el.tripName.value,
      startLocation: this.el.startLocation && this.el.startLocation.value,
      startDate: this.el.startDate && this.el.startDate.value,
      startTime: this.el.startTime && this.el.startTime.value,
      endLocation: this.el.endLocation && this.el.endLocation.value,
      endDate: this.el.endDate && this.el.endDate.value,
      endTime: this.el.endTime && this.el.endTime.value,
      locations: this.locations,
    };

    // xác thực các trường bắt buộc (ngoại trừ danh sách vị trí)
    const v = this.validateTrip({ name: trip.name, start: trip.startLocation, startDate: trip.startDate, startTime: trip.startTime, end: trip.endLocation, endDate: trip.endDate, endTime: trip.endTime });
    if (!v.ok) {
      this.showMessage(v.msg, 'error');
      return;
    }

    // Validate location dates: ngày phải >= ngày bắt đầu và <= ngày kết thúc
    for (let i = 0; i < trip.locations.length; i++) {
      const loc = trip.locations[i];
      if (loc.date) {
        const startDate = new Date(trip.startDate);
        const endDate = new Date(trip.endDate);
        const locDate = new Date(loc.date);
        if (isNaN(locDate.getTime())) {
          this.showMessage(`Ngày của địa điểm thứ ${i+1} không hợp lệ`, 'error');
          return;
        }
        if (locDate.getTime() < startDate.getTime() || locDate.getTime() > endDate.getTime()) {
          this.showMessage(`Ngày của địa điểm thứ ${i+1} phải nằm trong khoảng từ ngày bắt đầu đến ngày kết thúc của chuyến đi`, 'error');
          return;
        }
      }
    }

    const existing = JSON.parse(localStorage.getItem("itinerary_trips") || "[]");

    // kiểm tra tên trùng lặp (không phân biệt chữ hoa chữ thường). Nếu đang cập nhật chuyến đi hiện có, cho phép cùng tên.
    const lowerName = (trip.name || '').trim().toLowerCase();
    const nameConflict = existing.find(t => (t.name || '').trim().toLowerCase() === lowerName && (!this.currentTrip || t.createdAt !== this.currentTrip.createdAt));
    if (nameConflict) {
      this.showMessage('Tên chuyến đi đã tồn tại. Vui lòng đổi tên khác.', 'error');
      return;
    }

    if (this.currentTrip && this.currentTrip.createdAt) {
      // cập nhật chuyến đi hiện có
      const idx = existing.findIndex(t => t.createdAt === this.currentTrip.createdAt);
      if (idx !== -1) {
        trip.createdAt = this.currentTrip.createdAt; // giữ dấu thời gian gốc
        existing[idx] = trip;
        localStorage.setItem("itinerary_trips", JSON.stringify(existing));
        this.currentTrip = trip;
        // sau khi cập nhật, xóa các trường đầu vào chính (người dùng yêu cầu xóa form khi lưu)
        this.clearFormFields();
        this.locations = [];
        this.renderLocations();
        this.showMessage('Cập nhật lịch trình thành công', 'success');
        this.renderSavedList();
        this.updateActionButtons();
        return;
      }
    }

    // tạo chuyến đi mới
    trip.createdAt = new Date().toISOString();
    existing.unshift(trip);
    localStorage.setItem("itinerary_trips", JSON.stringify(existing.slice(0, 50)));
    this.currentTrip = trip;
    this.showMessage("Lưu lịch trình thành công!", "success");
    this.renderSavedList();
    this.updateActionButtons();
    // xóa các trường đầu vào tạo sau khi lưu
    this.clearFormFields();
    this.locations = [];
    this.renderLocations();
  }
  // Xóa chuyến đi hiện tại
  deleteTrip() {
    if (!this.currentTrip || !this.currentTrip.createdAt) {
      this.showMessage('Vui lòng chọn lịch để xóa', 'error');
      return;
    }
    if (!confirm(`Bạn có chắc chắn muốn xóa lịch trình "${this.currentTrip.name}"?`)) return;
    const existing = JSON.parse(localStorage.getItem("itinerary_trips") || "[]");
    const filtered = existing.filter(t => t.createdAt !== this.currentTrip.createdAt);
    localStorage.setItem("itinerary_trips", JSON.stringify(filtered));
    this.showMessage('Xóa lịch trình thành công', 'success');
    this.newTrip();
    this.renderSavedList();
    this.updateActionButtons();
  }
  // Kết xuất danh sách các chuyến đi đã lưu
  renderSavedList() {
    const box = this.el.savedList;
    if (!box) return;
    const items = JSON.parse(localStorage.getItem("itinerary_trips") || "[]");
    box.innerHTML = "";
    items.forEach((t, i) => {
      const li = document.createElement("li");
      li.className = "saved-item";
      const dateLabel = t.createdAt ? new Date(t.createdAt).toLocaleString() : (t.start || '');
      li.innerHTML = ` <div class="saved-item-name">${t.name || 'Chuyến đi #' + (i+1)}</div>
                        <div class="saved-item-date">${dateLabel}</div>`;
      li.addEventListener('click', () => { 
        // open detail panel instead of populating create form
        this.showDetail(t);
        // active class toggle
        const prev = box.querySelector('.saved-item.active');
        if (prev) prev.classList.remove('active');
        li.classList.add('active');
      });
      // mark active if matches currentTrip
      if (this.currentTrip && t.createdAt && this.currentTrip.createdAt === t.createdAt) {
        li.classList.add('active');
      }
      box.appendChild(li);
    });
  }
  // Tải chuyến đi vào biểu mẫu tạo/chỉnh sửa
  loadTrip(t) {
    this.currentTrip = t;
    // kế thừa: điền vào form tạo nếu cần
    this.el.tripName && (this.el.tripName.value = t.name || "");
    this.el.startLocation && (this.el.startLocation.value = t.startLocation || "");
    this.el.startDate && (this.el.startDate.value = t.startDate || "");
    this.el.startTime && (this.el.startTime.value = t.startTime || "");
    this.el.endLocation && (this.el.endLocation.value = t.endLocation || "");
    this.el.endDate && (this.el.endDate.value = t.endDate || "");
    this.el.endTime && (this.el.endTime.value = t.endTime || "");
    this.locations = t.locations || [];
    this.renderLocations();
    // tập trung vào biểu mẫu và cuộn vào chế độ xem
    try {
      if (this.el.tripName) {
        this.el.tripName.focus();
        this.el.tripName.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch (e) {}
  }

  // Hiển thị bảng chi tiết với chế độ chỉ đọc
  showDetail(t) {
    this.currentTrip = t;
    const panel = this.el.detailPanel;
    const content = this.el.detailContent;
    if (!panel || !content) return;
    panel.classList.remove('hidden');
    panel.classList.add('show');
    // hiển thị nội dung chỉ đọc
    this.renderDetailContent(t, false);
    // đảm bảo các nút hành động trên bảng điều khiển là chính xác
    if (this.el.saveEditBtn) this.el.saveEditBtn.classList.add('hidden');
    if (this.el.cancelEditBtn) this.el.cancelEditBtn.classList.add('hidden');
    if (this.el.editBtn) this.el.editBtn.classList.remove('hidden');
    // cập nhật hiển thị nút xóa
    this.updateActionButtons();
  }

  // Hiển thị nội dung chi tiết; editable=false => chế độ chỉ đọc
  renderDetailContent(t, editable = false) {
    const content = this.el.detailContent;
    if (!content) return;
    if (!t) { content.innerHTML = '<p>Không có dữ liệu</p>'; return; }
    if (!editable) {
      // xây dựng HTML chỉ đọc
      const locHtml = (t.locations || []).map((l, i) => `<li class="location-item">
        <div><strong>${i+1}. ${l.name}</strong></div>
        <div>
          ${l.dateStart || ''} ${l.arrival || ''} - ${l.dateEnd || ''} ${l.departure || ''}
        </div>
      </li>`).join('');
      content.innerHTML = `
        <div class="detail-block detail-header-block"><h3 class="detail-title">${t.name || ''}</h3></div>
        <div class="detail-block detail-grid">
          <div class="detail-row"><div class="label">Điểm đi</div><div class="value">${t.startLocation || ''}</div></div>
          <div class="detail-row"><div class="label">Ngày bắt đầu</div><div class="value">${t.startDate || ''} ${t.startTime || ''}</div></div>
          <div class="detail-row"><div class="label">Điểm đến</div><div class="value">${t.endLocation || ''}</div></div>
          <div class="detail-row"><div class="label">Ngày kết thúc</div><div class="value">${t.endDate || ''} ${t.endTime || ''}</div></div>
        </div>
        <div class="detail-block">
          <h4>Các điểm tham quan</h4>
          <ul class="location-list locations-vertical">${locHtml || '<li>Chưa có điểm tham quan</li>'}</ul>
        </div>
      `;
    } else {
      // hiển thị biểu mẫu có thể chỉnh sửa bên trong bảng điều khiển
      const locFields = (t.locations || []).map((l, i) => `
        <div class="panel-loc-block" data-idx="${i}">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <label style="font-weight:600">Địa điểm ${i+1}</label>
            <div>
              <button class="btn btn-small btn-edit-loc-panel" data-idx="${i}">Sửa</button>
              <button class="btn btn-small btn-danger btn-panel-loc-remove" data-idx="${i}">Xóa</button>
            </div>
          </div>
          <input class="panel-loc-name" data-idx="${i}" value="${l.name || ''}" style="border:1px solid #aaa;padding:4px;border-radius:4px;" />
          <div style="display:flex;gap:8px;margin-top:6px;">
            <input type="date" class="panel-loc-date-start" data-idx="${i}" value="${l.dateStart || ''}" style="border:1px solid #aaa;padding:4px;border-radius:4px;" placeholder="Ngày bắt đầu" />
            <input type="date" class="panel-loc-date-end" data-idx="${i}" value="${l.dateEnd || ''}" style="border:1px solid #aaa;padding:4px;border-radius:4px;" placeholder="Ngày kết thúc" />
          </div>
          <div style="display:flex;gap:8px;margin-top:6px;">
            <input type="time" class="panel-loc-arrival" data-idx="${i}" value="${l.arrival || ''}" style="border:1px solid #aaa;padding:4px;border-radius:4px;" />
            <input type="time" class="panel-loc-departure" data-idx="${i}" value="${l.departure || ''}" style="border:1px solid #aaa;padding:4px;border-radius:4px;" />
          </div>
        </div>
      `).join('');
      content.innerHTML = `
        <div class="form-group"><label>Tên chuyến đi</label><input id="panel-trip-name" value="${t.name || ''}" /></div>
        <div class="form-group"><label>Điểm đi</label><input id="panel-start-location" value="${t.startLocation || ''}" /></div>
        <div class="form-group"><label>Ngày bắt đầu</label><input id="panel-start-date" type="date" value="${t.startDate || ''}" /></div>
        <div class="form-group"><label>Giờ bắt đầu</label><input id="panel-start-time" type="time" value="${t.startTime || ''}" /></div>
        <div class="form-group"><label>Điểm đến</label><input id="panel-end-location" value="${t.endLocation || ''}" /></div>
        <div class="form-group"><label>Ngày kết thúc</label><input id="panel-end-date" type="date" value="${t.endDate || ''}" /></div>
        <div class="form-group"><label>Giờ kết thúc</label><input id="panel-end-time" type="time" value="${t.endTime || ''}" /></div>
        <hr />
        <div class="panel-locations">${locFields}</div>
        <div style="margin-top:8px;text-align:right;"><button id="panel-add-loc" class="btn btn-success">Thêm điểm</button></div>
      `;

     // đính kèm các trình xử lý xóa cho mỗi vị trí trong bảng điều khiển
      Array.from(content.querySelectorAll('.btn-panel-loc-remove')).forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.dataset.idx, 10);
          // xóa khỏi mô hình và hiển thị lại bảng điều khiển
          if (idx >= 0 && idx < this.locations.length) {
            this.locations.splice(idx, 1);
            // hiển thị lại nội dung có thể chỉnh sửa của bảng điều khiển
            this.renderDetailContent(Object.assign({}, this.currentTrip, { locations: this.locations }), true);
          }
        });
      });

      // đính kèm các trình xử lý chỉnh sửa cho các khối vị trí trong bảng điều khiển (điền vào biểu mẫu chính)
      Array.from(content.querySelectorAll('.btn-edit-loc-panel')).forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.dataset.idx, 10);
          if (idx >= 0 && idx < this.locations.length) {
            // điền vào biểu mẫu chính để chỉnh sửa vị trí đó
            this.editLocationToForm(idx);
            // đóng bảng điều khiển để người dùng chỉnh sửa trong biểu mẫu chính
            this.closeDetail();
          }
        });
      });

      // đính kèm trình xử lý để thêm một khối vị trí trống mới trong bảng điều khiển
      const addPanelBtn = content.querySelector('#panel-add-loc');
      if (addPanelBtn) {
        addPanelBtn.addEventListener('click', (e) => {
          e.preventDefault();
          // Lấy lại danh sách địa điểm hiện tại từ panel DOM để tránh mất dữ liệu khi thêm mới
          const locNames = Array.from(content.querySelectorAll('.panel-loc-name'));
          const newLocations = locNames.map((el) => {
            const idx = el.dataset.idx;
            return {
              name: (el.value || '').trim(),
              date: content.querySelector(`.panel-loc-date[data-idx="${idx}"]`)?.value || '',
              arrival: content.querySelector(`.panel-loc-arrival[data-idx="${idx}"]`)?.value || '',
              departure: content.querySelector(`.panel-loc-departure[data-idx="${idx}"]`)?.value || '',
            };
          });
          // Thêm một địa điểm trống mới vào cuối danh sách
          newLocations.push({ name: '', date: '', arrival: '', departure: '' });
          this.locations = JSON.parse(JSON.stringify(newLocations));
          this.renderDetailContent(Object.assign({}, this.currentTrip, { locations: this.locations }), true);
        });
      }
    }
  }
  // Kích hoạt chế độ chỉnh sửa trong bảng điều khiển chi tiết
  enableEditPanel() {
    if (!this.currentTrip) { this.showMessage('Vui lòng chọn lịch để chỉnh sửa', 'error'); return; }
    // Mở bảng điều khiển chi tiết ở chế độ có thể chỉnh sửa
    const panel = this.el.detailPanel;
    if (panel) {
      panel.classList.remove('hidden');
      panel.classList.add('show');
    }
    // đảm bảo this.locations phản ánh currentTrip trong khi chỉnh sửa
    this.locations = JSON.parse(JSON.stringify(this.currentTrip.locations || []));
    this.renderDetailContent(Object.assign({}, this.currentTrip, { locations: this.locations }), true);
    // hiển thị/ẩn các nút hành động trong bảng điều khiển
    if (this.el.saveEditBtn) this.el.saveEditBtn.classList.remove('hidden');
    if (this.el.cancelEditBtn) this.el.cancelEditBtn.classList.remove('hidden');
    if (this.el.editBtn) this.el.editBtn.classList.add('hidden');
    this.isEditing = true;
    this.showMessage('Chỉnh sửa trong khung chi tiết, sửa xong nhấn Lưu.', 'success');
    this.updateActionButtons();
  }
  // Hủy chỉnh sửa và quay lại chế độ chỉ đọc
  cancelEditPanel() {
    // quay lại chế độ chỉ đọc
    if (this.currentTrip) {
      this.renderDetailContent(this.currentTrip, false);
      if (this.el.saveEditBtn) this.el.saveEditBtn.classList.add('hidden');
      if (this.el.cancelEditBtn) this.el.cancelEditBtn.classList.add('hidden');
      if (this.el.editBtn) this.el.editBtn.classList.remove('hidden');
      this.isEditing = false;
    }
  }
  // Lưu các chỉnh sửa từ bảng điều khiển chi tiết
  saveEditPanel() {
    if (!this.currentTrip) { this.showMessage('Không có lịch để lưu', 'error'); return; }
    const content = this.el.detailContent;
    try {
      const updated = Object.assign({}, this.currentTrip);
      const nameIn = content.querySelector('#panel-trip-name');
      updated.name = nameIn ? nameIn.value : updated.name;
      updated.startLocation = content.querySelector('#panel-start-location')?.value || updated.startLocation;
      updated.startDate = content.querySelector('#panel-start-date')?.value || updated.startDate;
      updated.startTime = content.querySelector('#panel-start-time')?.value || updated.startTime;
      updated.endLocation = content.querySelector('#panel-end-location')?.value || updated.endLocation;
      updated.endDate = content.querySelector('#panel-end-date')?.value || updated.endDate;
      updated.endTime = content.querySelector('#panel-end-time')?.value || updated.endTime;

      // địa điểm
      const locNames = Array.from(content.querySelectorAll('.panel-loc-name'));
      updated.locations = locNames.map((el) => {
        const idx = el.dataset.idx;
        return {
          name: (el.value || '').trim(),
          dateStart: content.querySelector(`.panel-loc-date-start[data-idx="${idx}"]`)?.value || '',
          dateEnd: content.querySelector(`.panel-loc-date-end[data-idx="${idx}"]`)?.value || '',
          arrival: content.querySelector(`.panel-loc-arrival[data-idx="${idx}"]`)?.value || '',
          departure: content.querySelector(`.panel-loc-departure[data-idx="${idx}"]`)?.value || '',
        };
      });

      // luôn đồng bộ lại this.locations với dữ liệu mới nhất từ panel
      this.locations = JSON.parse(JSON.stringify(updated.locations || []));

      // xác thực địa điểm: yêu cầu tên, ngày bắt đầu/kết thúc hợp lệ, arrival < departure nếu cả hai đều có
      for (let i = 0; i < updated.locations.length; i++) {
        const loc = updated.locations[i];
        if (!loc.name || !loc.name.trim()) return this.showMessage(`Vui lòng nhập tên cho địa điểm thứ ${i+1}`, 'error');
        // Validate ngày bắt đầu/kết thúc của địa điểm
        const tripStart = new Date(updated.startDate);
        const tripEnd = new Date(updated.endDate);
        const locStart = new Date(loc.dateStart);
        const locEnd = new Date(loc.dateEnd);
        if (isNaN(locStart.getTime()) || isNaN(locEnd.getTime())) {
          return this.showMessage(`Ngày bắt đầu/kết thúc của địa điểm thứ ${i+1} không hợp lệ`, 'error');
        }
        if (locStart.getTime() < tripStart.getTime() || locStart.getTime() > locEnd.getTime()) {
          return this.showMessage(`Ngày bắt đầu của địa điểm thứ ${i+1} phải lớn hơn hoặc bằng ngày bắt đầu chuyến đi và nhỏ hơn ngày kết thúc của địa điểm`, 'error');
        }
        if (locEnd.getTime() > tripEnd.getTime() || locEnd.getTime() < locStart.getTime()) {
          return this.showMessage(`Ngày kết thúc của địa điểm thứ ${i+1} phải nhỏ hơn hoặc bằng ngày kết thúc chuyến đi và lớn hơn ngày bắt đầu của địa điểm`, 'error');
        }
        if (loc.arrival && loc.departure) {
          try {
            const a = new Date((loc.dateStart || '') + 'T' + loc.arrival);
            const d = new Date((loc.dateEnd || '') + 'T' + loc.departure);
            if (!isNaN(a.getTime()) && !isNaN(d.getTime()) && d.getTime() <= a.getTime()) {
              return this.showMessage(`Giờ kết thúc của địa điểm thứ ${i+1} phải lớn hơn giờ bắt đầu`, 'error');
            }
          } catch (e) {}
        }
      }

      // xác thực
      const v = this.validateTrip({ name: updated.name, start: updated.startLocation, startDate: updated.startDate, startTime: updated.startTime, end: updated.endLocation, endDate: updated.endDate, endTime: updated.endTime });
      if (!v.ok) { this.showMessage(v.msg, 'error'); return; }

      // lưu vào localStorage
      const existing = JSON.parse(localStorage.getItem('itinerary_trips') || '[]');
      const idx = existing.findIndex(t => t.createdAt === this.currentTrip.createdAt);
      if (idx !== -1) {
        existing[idx] = updated;
        localStorage.setItem('itinerary_trips', JSON.stringify(existing));
        this.currentTrip = updated;
        this.renderSavedList();
        this.renderDetailContent(this.currentTrip, false);
        // ẩn các nút chỉnh sửa trong bảng điều khiển và khôi phục trạng thái
        if (this.el.saveEditBtn) this.el.saveEditBtn.classList.add('hidden');
        if (this.el.cancelEditBtn) this.el.cancelEditBtn.classList.add('hidden');
        if (this.el.editBtn) this.el.editBtn.classList.remove('hidden');
        this.isEditing = false;
        this.updateActionButtons();
        this.showMessage('Cập nhật lịch trình thành công', 'success');
      } else {
        this.showMessage('Không tìm thấy lịch để cập nhật', 'error');
      }
    } catch (e) {
      console.error('saveEditPanel error', e);
      this.showMessage('Lưu chỉnh sửa thất bại', 'error');
    }
  }
  // Xóa chuyến đi từ bảng điều khiển chi tiết và đóng bảng điều khiển
  deleteTripFromPanel() {
    // Bí danh cho deleteTrip nhưng đảm bảo bảng điều khiển được đóng
    this.deleteTrip();
    this.closeDetail();
  }
  // Đóng bảng chi tiết
  closeDetail() {
    const panel = this.el.detailPanel;
    if (!panel) return;
    panel.classList.remove('show');
    panel.classList.add('hidden');
  }
  // Hiển thị thông báo cho người dùng
  showMessage(text, type = 'success') {
    const box = this.el.messages;
    if (!box) return;
    box.className = 'messages show ' + (type === 'error' ? 'error' : 'success');
    box.textContent = text;
    setTimeout(() => { box.className = 'messages'; box.textContent = ''; }, 4000);
  }
  // Xử lý phím ESC để đóng bảng điều khiển chi tiết
  destroy() {
    // dọn dẹp nếu cần
    try {
      document.removeEventListener('keydown', this._escHandler);
    } catch (e) {}
  }
}
// Hàm khởi tạo ứng dụng lịch trình
export function initItineraryApp() {
  try {
    if (!window.app) {
      window.ItineraryApp = ItineraryApp;
      window.app = new ItineraryApp();
    }
  } catch (e) {
    console.error('initItineraryApp error', e);
  }
}

// Cũng cung cấp init mặc định khi tải (cho các tải không phải mô-đun)
try {
  if (typeof window !== 'undefined' && !window.app) {
    window.ItineraryApp = ItineraryApp;
  }
} catch (e) {}
