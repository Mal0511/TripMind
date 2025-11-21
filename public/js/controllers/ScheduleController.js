/* Deprecated stub. This file is no longer used.
   The canonical ScheduleController is in `src/controllers/ScheduleController.js`
   and is served at `/js/ScheduleController.js` via the copy in `src/views/js`.
   You can safely remove this file. */
(function(){
  console.warn('Deprecated: public/js/controllers/ScheduleController.js is unused.');
})();

  removeLocation(id) {
    this.locations = this.locations.filter((loc) => loc.id !== id);
    this.renderLocations();
  }

  renderLocations() {
    this.el.locationList.innerHTML = "";

    if (!this.locations || this.locations.length === 0) {
      this.el.locationList.innerHTML =
        '<div class="empty-state">Chưa có điểm tham quan nào</div>';
      return;
    }

    this.locations.forEach((loc) => {
      const li = document.createElement("li");
      li.className = "location-item";
      li.draggable = true;
      li.dataset.id = String(loc.id);

      li.innerHTML = `
        <div class="drag-handle" aria-hidden="true">☰</div>
        <div class="item-content">
          <div class="item-name">${this.escapeHtml(loc.name)}</div>
          <div class="item-time">
            ${loc.date ? `• ${loc.date}` : ""} 
            ${loc.date && (loc.arrival || loc.departure) ? " | " : ""}
            ${loc.arrival ? `Đến: ${loc.arrival}` : ""} 
            ${loc.arrival && loc.departure ? " | " : ""}
            ${loc.departure ? `Đi: ${loc.departure}` : ""}
          </div>
        </div>
        <div class="item-actions">
          <button class="btn btn-danger btn-small" data-id="${
            loc.id
          }">Xóa</button>
        </div>
      `;

      const delBtn = li.querySelector("button");
      delBtn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        this.removeLocation(id);
      });

      // drag events
      li.addEventListener("dragstart", (e) => this.handleDragStart(e));
      li.addEventListener("dragover", (e) => this.handleDragOver(e));
      li.addEventListener("drop", (e) => this.handleDrop(e));
      li.addEventListener("dragend", (e) => this.handleDragEnd(e));

      this.el.locationList.appendChild(li);
    });
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  handleDragStart(e) {
    const li = e.target.closest(".location-item");
    if (!li) return;
    this.draggedElement = li;
    li.classList.add("dragging");
    try {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", li.dataset.id);
    } catch (err) {
      // ignore if not supported
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    const target = e.target.closest(".location-item");
    if (!target || !this.draggedElement || target === this.draggedElement)
      return;

    const rect = target.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;

    if (e.clientY < midpoint) {
      target.parentNode.insertBefore(this.draggedElement, target);
    } else {
      target.parentNode.insertBefore(this.draggedElement, target.nextSibling);
    }
  }

  handleDrop(e) {
    e.preventDefault();
    this.updateLocationOrder();
  }

  handleDragEnd(e) {
    const li = e.target.closest(".location-item");
    if (li) li.classList.remove("dragging");
    this.draggedElement = null;
  }

  updateLocationOrder() {
    const items = Array.from(
      this.el.locationList.querySelectorAll(".location-item")
    );
    const newOrder = items
      .map((item) => {
        const id = parseInt(item.dataset.id);
        return this.locations.find((loc) => loc.id === id);
      })
      .filter(Boolean);
    this.locations = newOrder;
  }

  newTrip() {
    if (this.locations.length > 0 || this.el.tripName.value.trim()) {
      if (
        !confirm(
          "Bạn có chắc muốn tạo lịch trình mới? Dữ liệu hiện tại chưa lưu sẽ bị mất."
        )
      ) {
        return;
      }
    }

    this.clearForm();
    this.currentTrip = null;
    this.isEditing = false;
    this.closeDetail();
    this.showMessage("Đã tạo lịch trình mới", "success");
  }

  clearForm() {
    this.el.tripName.value = "";
    this.el.startLocation.value = "";
    this.el.startDate.value = "";
    this.el.startTime.value = "";
    this.el.endLocation.value = "";
    this.el.endDate.value = "";
    this.el.endTime.value = "";
    this.locations = [];
    this.renderLocations();
  }

  saveTrip() {
    const name = this.el.tripName.value.trim();
    if (!name) {
      this.showMessage("Vui lòng nhập tên chuyến đi", "error");
      return;
    }

    if (
      !this.el.startLocation.value.trim() ||
      !this.el.endLocation.value.trim()
    ) {
      this.showMessage("Vui lòng nhập điểm đi và điểm đến", "error");
      return;
    }

    const dateError = this.validateDates();
    if (dateError) {
      this.showMessage(dateError, "error");
      return;
    }

    const tripId = this.currentTrip ? this.currentTrip.id : Date.now();
    const createdAt = this.currentTrip
      ? this.currentTrip.createdAt
      : new Date().toISOString();

    const trip = {
      id: tripId,
      name,
      startLocation: this.el.startLocation.value.trim(),
      startDate: this.el.startDate.value,
      startTime: this.el.startTime.value,
      endLocation: this.el.endLocation.value.trim(),
      endDate: this.el.endDate.value,
      endTime: this.el.endTime.value,
      locations: this.locations,
      createdAt,
    };

    const trips = this.getSavedTrips();
    trips[String(trip.id)] = trip;
    localStorage.setItem("trips", JSON.stringify(trips));

    this.currentTrip = trip;
    this.isEditing = false;
    this.loadSavedTrips();
    this.showMessage("Đã lưu lịch trình thành công!", "success");
  }

  getSavedTrips() {
    try {
      return JSON.parse(localStorage.getItem("trips") || "{}");
    } catch (e) {
      return {};
    }
  }

  loadSavedTrips() {
    const trips = this.getSavedTrips();
    this.el.savedList.innerHTML = "";

    const tripArray = Object.values(trips).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    if (tripArray.length === 0) {
      this.el.savedList.innerHTML =
        '<div class="empty-state">Chưa có lịch trình nào</div>';
      return;
    }

    tripArray.forEach((trip) => {
      const li = document.createElement("li");
      li.className = "saved-item";
      if (this.currentTrip && String(this.currentTrip.id) === String(trip.id)) {
        li.classList.add("active");
      }

      const startDateTime = this.formatDateTime(trip.startDate, trip.startTime);

      li.innerHTML = `
        <div class="saved-item-name">${this.escapeHtml(trip.name)}</div>
        <div class="saved-item-date">${this.escapeHtml(startDateTime)}</div>
      `;

      li.addEventListener("click", () => {
        // mark active
        Array.from(this.el.savedList.querySelectorAll(".saved-item")).forEach(
          (n) => n.classList.remove("active")
        );
        li.classList.add("active");
        this.showTripDetail(trip);
      });
      this.el.savedList.appendChild(li);
    });
  }

  showTripDetail(trip) {
    this.currentTrip = trip;
    this.el.detailTitle.textContent = trip.name;

    const startDateTime = this.formatDateTime(trip.startDate, trip.startTime);
    const endDateTime = this.formatDateTime(trip.endDate, trip.endTime);

    let locationsHtml = "<p>Chưa có điểm tham quan</p>";
    if (trip.locations && trip.locations.length > 0) {
      locationsHtml = trip.locations
        .map(
          (loc, idx) => `      
        <div style="padding: 10px; background: #f8fbfd; border-radius: 6px; margin-bottom: 8px;">
          <strong>${idx + 1}. ${this.escapeHtml(loc.name)}</strong><br>
          <span style="font-size: 13px; color: #7f8c8d;">
            ${loc.date ? `Ngày: ${this.escapeHtml(loc.date)}` : ""}
            ${loc.date && (loc.arrival || loc.departure) ? " | " : ""}
            ${loc.arrival ? `Đến: ${this.escapeHtml(loc.arrival)}` : ""} 
            ${loc.arrival && loc.departure ? " | " : ""}
            ${loc.departure ? `Đi: ${this.escapeHtml(loc.departure)}` : ""}
          </span>
        </div>
      `
        )
        .join("");
    }

    this.el.detailContent.innerHTML = `
      <div class="detail-field">
        <label>Tên chuyến đi:</label>
        <div class="value">${this.escapeHtml(trip.name)}</div>
      </div>
      <div class="detail-field">
        <label>Điểm đi:</label>
        <div class="value">${this.escapeHtml(trip.startLocation)}</div>
      </div>
      <div class="detail-field">
        <label>Thời gian bắt đầu:</label>
        <div class="value">${this.escapeHtml(startDateTime)}</div>
      </div>
      <div class="detail-field">
        <label>Điểm đến:</label>
        <div class="value">${this.escapeHtml(trip.endLocation)}</div>
      </div>
      <div class="detail-field">
        <label>Thời gian kết thúc:</label>
        <div class="value">${this.escapeHtml(endDateTime)}</div>
      </div>
      <div class="detail-field">
        <label>Các điểm tham quan:</label>
        ${locationsHtml}
      </div>
    `;

    // show detail panel
    this.el.detailPanel.classList.remove("hidden");
    this.el.detailPanel.classList.add("show");

    // show correct action buttons
    this.el.saveEditBtn.classList.add("hidden");
    this.el.cancelEditBtn.classList.add("hidden");
    this.el.editBtn.classList.remove("hidden");
    this.el.deleteBtn.classList.remove("hidden");

    this.loadSavedTrips(); // refresh sidebar (so active highlight can be applied)
  }

  closeDetail() {
    this.el.detailPanel.classList.remove("show");
    setTimeout(() => {
      this.el.detailPanel.classList.add("hidden");
    }, 300);
    this.isEditing = false;
    // clear active highlight
    Array.from(this.el.savedList.querySelectorAll(".saved-item")).forEach((n) =>
      n.classList.remove("active")
    );
    this.loadSavedTrips();
  }

  enableEdit() {
    if (!this.currentTrip) return;

    this.el.tripName.value = this.currentTrip.name;
    this.el.startLocation.value = this.currentTrip.startLocation;
    this.el.startDate.value = this.currentTrip.startDate;
    this.el.startTime.value = this.currentTrip.startTime;
    this.el.endLocation.value = this.currentTrip.endLocation;
    this.el.endDate.value = this.currentTrip.endDate;
    this.el.endTime.value = this.currentTrip.endTime;
    this.locations = Array.isArray(this.currentTrip.locations)
      ? [...this.currentTrip.locations]
      : [];
    this.renderLocations();

    this.isEditing = true;

    // hide detail panel to focus the form (keeps previous UX)
    this.closeDetail();
    this.showMessage(
      'Đang chỉnh sửa lịch trình. Nhấn "Lưu lịch trình" để lưu thay đổi.',
      "success"
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  deleteTrip() {
    if (!this.currentTrip) return;

    if (
      !confirm(
        `Bạn có chắc chắn muốn xóa lịch trình "${this.currentTrip.name}"?`
      )
    ) {
      return;
    }

    const trips = this.getSavedTrips();
    delete trips[String(this.currentTrip.id)];
    localStorage.setItem("trips", JSON.stringify(trips));

    this.closeDetail();
    this.clearForm();
    this.currentTrip = null;
    this.loadSavedTrips();
    this.showMessage("Đã xóa lịch trình thành công!", "success");
  }

  saveEdit() {
    // saveEdit delegates to saveTrip (which respects currentTrip and createdAt)
    if (!this.currentTrip) {
      this.showMessage("Không có lịch trình để lưu chỉnh sửa", "error");
      return;
    }
    this.saveTrip();
    this.closeDetail();
  }

  cancelEdit() {
    this.clearForm();
    this.isEditing = false;
    this.closeDetail();
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  window.app = new ItineraryApp();
});
