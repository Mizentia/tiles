// Manages worker-select-db change: fill fields, track originals, show Cancel Update btn
window.WorkerSelectHandler = {
    _originals: {}, // { rowDataId: {name, phone, role, location} }

    onSelect: function(row, dbId) {
        row.querySelector('.worker-db-id').value = dbId;
        const cancelBtn = row.querySelector('.btn-cancel-worker-update');

        if (dbId && window.AppState && window.AppState.workersData) {
            const w = window.AppState.workersData.find(x => x.id === dbId);
            if (w) {
                const orig = { name: w.name||'', phone: w.phone||'', role: w.role||'Mistri', location: w.location||'', dailyRate: w.dailyRate||0 };
                this._originals[row.dataset.id] = orig;
                row.querySelector('.worker-name').value     = orig.name;
                row.querySelector('.worker-phone').value    = orig.phone;
                row.querySelector('.worker-role').value     = orig.role;
                row.querySelector('.worker-location').value = orig.location;
                const rateEl = row.querySelector('.worker-rate');
                if(rateEl) { rateEl.value = orig.dailyRate; rateEl.dispatchEvent(new Event('input', {bubbles: true})); }
                if (cancelBtn) cancelBtn.classList.add('hidden');
            }
        } else {
            delete this._originals[row.dataset.id];
            row.querySelector('.worker-name').value     = '';
            row.querySelector('.worker-phone').value    = '';
            row.querySelector('.worker-location').value = '';
            const rateEl = row.querySelector('.worker-rate');
            if(rateEl) { rateEl.value = ''; rateEl.dispatchEvent(new Event('input', {bubbles: true})); }
            if (cancelBtn) cancelBtn.classList.add('hidden');
        }
    },

    onFieldChange: function(row) {
        const rowId = row.dataset.id;
        if (!this._originals[rowId]) return; // no saved original
        const cancelBtn = row.querySelector('.btn-cancel-worker-update');
        if (cancelBtn) cancelBtn.classList.remove('hidden');
    },

    onCancel: function(row) {
        const rowId = row.dataset.id;
        const orig  = this._originals[rowId];
        if (!orig) return;
        row.querySelector('.worker-name').value     = orig.name;
        row.querySelector('.worker-phone').value    = orig.phone;
        row.querySelector('.worker-role').value     = orig.role;
        row.querySelector('.worker-location').value = orig.location;
        const rateEl = row.querySelector('.worker-rate');
        if(rateEl) { rateEl.value = orig.dailyRate; rateEl.dispatchEvent(new Event('input', {bubbles: true})); }
        const cancelBtn = row.querySelector('.btn-cancel-worker-update');
        if (cancelBtn) cancelBtn.classList.add('hidden');
    }
};
