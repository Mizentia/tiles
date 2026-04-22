window.SetupWorkersSection = function() {
    const form = document.getElementById('form-add-worker-master');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-save-worker-master');
        const editId = btn.dataset.editId || null;
        const data = {
            name:      document.getElementById('wm-name').value.trim(),
            phone:     document.getElementById('wm-phone').value.trim(),
            role:      document.getElementById('wm-role').value,
            location:  document.getElementById('wm-location').value.trim(),
            dailyRate: parseFloat(document.getElementById('wm-daily-rate').value) || 0,
            transport: parseFloat(document.getElementById('wm-transport').value) || 0,
        };
        if (!data.name) { Utils.showToast('নাম দেওয়া আবশ্যক!', 'error'); return; }

        btn.disabled = true;
        if (editId) {
            await window.FBOperations.updateDocument('workers', editId, data);
            btn.dataset.editId = '';
            btn.innerHTML = '<i class="fas fa-save mr-1"></i>সেভ করুন';
        } else {
            await db.collection('workers').add({
                ...data,
                totalPaid: 0, totalDue: 0, totalEarned: 0,
                daysWorked: 0, totalExtra: 0, workHistory: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            Utils.showToast('লোক যুক্ত হয়েছে!');
        }
        form.reset();
        btn.disabled = false;
    });

    document.getElementById('wm-filter-role').addEventListener('change', window.RenderWorkers);
    document.getElementById('wm-filter-work').addEventListener('change', window.RenderWorkers);
};

window.RenderWorkers = function() {
    renderWorkersSummary();
    renderWorkersList();
};

function renderWorkersSummary() {
    const data = AppState.workersData || [];
    const workedIds = _getWorkedIds();
    document.getElementById('wm-total-count').innerText  = data.length;
    document.getElementById('wm-worked-count').innerText = workedIds.size;
    const totalDue  = data.reduce((s, w) => s + (Number(w.totalDue)  || 0), 0);
    const totalPaid = data.reduce((s, w) => s + (Number(w.totalPaid) || 0), 0);
    const dueEl  = document.getElementById('wm-total-due');
    const paidEl = document.getElementById('wm-total-paid');
    if (dueEl)  dueEl.innerText  = Utils.formatCurrency(totalDue);
    if (paidEl) paidEl.innerText = Utils.formatCurrency(totalPaid);
}

function _getWorkedIds() {
    const ids = new Set();
    (AppState.worksData || []).forEach(work =>
        (work.workers || []).forEach(w => { if (w.dbId) ids.add(w.dbId); })
    );
    return ids;
}

function renderWorkersList() {
    const container = document.getElementById('wm-workers-list');
    if (!container) return;

    const roleFilter = document.getElementById('wm-filter-role')?.value || '';
    const workFilter = document.getElementById('wm-filter-work')?.value || '';
    const workedIds  = _getWorkedIds();

    let data = AppState.workersData || [];
    if (roleFilter)              data = data.filter(w => w.role === roleFilter);
    if (workFilter === 'worked') data = data.filter(w =>  workedIds.has(w.id));
    if (workFilter === 'idle')   data = data.filter(w => !workedIds.has(w.id));

    // Sort: workers who have worked come first
    data = [...data].sort((a, b) => {
        const diff = (workedIds.has(a.id) ? 0 : 1) - (workedIds.has(b.id) ? 0 : 1);
        return diff || (a.name || '').localeCompare(b.name || '');
    });

    if (!data.length) {
        container.innerHTML = '<p class="p-6 text-center text-gray-400 text-sm italic">কোনো লোক পাওয়া যায়নি।</p>';
        return;
    }
    container.innerHTML = data.map(w => window.WorkerCard(w, workedIds.has(w.id))).join('');

    container.querySelectorAll('.btn-delete-worker-master').forEach(btn => {
        btn.onclick = () => {
            if (confirm('এই লোককে মুছে ফেলবেন?'))
                window.FBOperations.deleteDocument('workers', btn.dataset.id);
        };
    });
    container.querySelectorAll('.btn-edit-worker-master').forEach(btn => {
        btn.onclick = () => loadWorkerForEdit(btn.dataset.id);
    });
}

function loadWorkerForEdit(id) {
    const w = AppState.workersData.find(x => x.id === id);
    if (!w) return;
    document.getElementById('wm-name').value      = w.name      || '';
    document.getElementById('wm-phone').value     = w.phone     || '';
    document.getElementById('wm-role').value      = w.role      || 'Mistri';
    document.getElementById('wm-location').value  = w.location  || '';
    document.getElementById('wm-daily-rate').value = w.dailyRate || 0;
    document.getElementById('wm-transport').value  = w.transport || 0;
    const btn = document.getElementById('btn-save-worker-master');
    btn.dataset.editId = id;
    btn.innerHTML = '<i class="fas fa-pen mr-1"></i>আপডেট করুন';
    document.getElementById('wm-name').scrollIntoView({ behavior: 'smooth' });
}
