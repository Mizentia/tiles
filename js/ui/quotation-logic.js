window.QtState = { genId: () => Math.random().toString(36).substr(2,9) };

window.SetupQuotation = function() {
    const sec = document.getElementById('section-quotation');
    if (!sec) return;

    const d = document.getElementById('qt-date');
    if (d) d.value = AppState.todayStr;

    document.getElementById('btn-qt-add-floor').addEventListener('click', () => {
        const fId = QtState.genId();
        document.getElementById('qt-floors-list').insertAdjacentHTML('beforeend', window.QtFloorBlock(fId));
        document.getElementById(`qt-items-${fId}`).insertAdjacentHTML('beforeend', window.QtItemRow(fId, QtState.genId()));
        attachQtEvents();
    });

    document.getElementById('btn-qt-save').addEventListener('click', saveQuotation);
    document.getElementById('btn-qt-clear').addEventListener('click', clearQuotation);

    renderSavedQuotations();
};

function attachQtEvents() {
    document.querySelectorAll('.btn-qt-rm-floor').forEach(btn => {
        btn.onclick = () => { btn.closest('.qt-floor').remove(); recalcQuotation(); };
    });
    document.querySelectorAll('.btn-qt-rm-item').forEach(btn => {
        btn.onclick = () => { btn.closest('.qt-item').remove(); recalcQuotation(); };
    });
    document.querySelectorAll('.btn-qt-add-item').forEach(btn => {
        btn.onclick = () => {
            const fId = btn.dataset.fid;
            document.getElementById(`qt-items-${fId}`).insertAdjacentHTML('beforeend', window.QtItemRow(fId, QtState.genId()));
            attachQtEvents();
        };
    });
    document.querySelectorAll('.qt-calc-trigger').forEach(el => {
        el.oninput = () => recalcQuotation();
        el.onchange = () => recalcQuotation();
    });
}

function recalcQuotation() {
    let totalSqft = 0, totalRft = 0, totalQty = 0, grandTotal = 0;
    document.querySelectorAll('.qt-floor').forEach(floor => {
        let floorTotal = 0;
        floor.querySelectorAll('.qt-item').forEach(item => {
            const type = item.querySelector('.qt-item-type').value;
            const rate = parseFloat(item.querySelector('.qt-item-rate').value) || 0;
            const qInput = item.querySelector('.qt-item-qty');
            let qty = 0;
            if (type !== 'qty') {
                const l = (parseFloat(item.querySelector('.qt-l-ft').value)||0) + (parseFloat(item.querySelector('.qt-l-in').value)||0)/12;
                const w = type === 'sqft' ? (parseFloat(item.querySelector('.qt-w-ft').value)||0) + (parseFloat(item.querySelector('.qt-w-in').value)||0)/12 : 1;
                qty = type === 'sqft' ? l * w : l;
                if (l > 0) qInput.value = qty.toFixed(2);
            } else {
                qty = parseFloat(qInput.value) || 0;
            }
            const total = qty * rate;
            item.querySelector('.qt-item-total').innerText = total.toFixed(2);
            if (type === 'sqft') totalSqft += qty;
            else if (type === 'rft') totalRft += qty;
            else totalQty += qty;
            floorTotal += total;
        });
        const ftEl = floor.querySelector('.qt-floor-total');
        if (ftEl) ftEl.innerText = `৳ ${Utils.formatCurrency(floorTotal)}`;
        grandTotal += floorTotal;
    });
    document.getElementById('qt-total-sqft').innerText = totalSqft.toFixed(2);
    document.getElementById('qt-total-rft').innerText = totalRft.toFixed(2);
    document.getElementById('qt-total-qty').innerText = totalQty.toFixed(2);
    document.getElementById('qt-grand-total').innerText = `৳ ${Utils.formatCurrency(grandTotal)}`;
}

function saveQuotation() {
    const name = document.getElementById('qt-project-name').value.trim();
    const date = document.getElementById('qt-date').value || AppState.todayStr;
    if (!name) { Utils.showToast('প্রজেক্টের নাম দিন!', 'error'); return; }
    const floors = [];
    document.querySelectorAll('.qt-floor').forEach(floor => {
        const items = [];
        floor.querySelectorAll('.qt-item').forEach(item => {
            items.push({
                desc: item.querySelector('.qt-item-desc').value,
                type: item.querySelector('.qt-item-type').value,
                lFt: parseFloat(item.querySelector('.qt-l-ft').value)||0,
                lIn: parseFloat(item.querySelector('.qt-l-in').value)||0,
                wFt: parseFloat(item.querySelector('.qt-w-ft').value)||0,
                wIn: parseFloat(item.querySelector('.qt-w-in').value)||0,
                qty: parseFloat(item.querySelector('.qt-item-qty').value)||0,
                rate: parseFloat(item.querySelector('.qt-item-rate').value)||0,
                total: parseFloat(item.querySelector('.qt-item-total').innerText)||0
            });
        });
        floors.push({ name: floor.querySelector('.qt-floor-name').value, items });
    });
    const grandTotal = parseFloat(document.getElementById('qt-grand-total').innerText.replace(/[^\d.]/g,''))||0;
    const data = { name, date, floors, grandTotal, savedAt: new Date().toISOString() };
    db.collection('quotations').add({ ...data, uid: AppState.currentUser?.uid || 'anon' })
        .then(() => { Utils.showToast('কোটেশন সেভ হয়েছে!'); clearQuotation(); renderSavedQuotations(); })
        .catch(() => Utils.showToast('সেভ করতে সমস্যা হয়েছে!', 'error'));
}

function clearQuotation() {
    document.getElementById('qt-project-name').value = '';
    document.getElementById('qt-floors-list').innerHTML = '';
    recalcQuotation();
}

function renderSavedQuotations() {
    const list = document.getElementById('qt-saved-list');
    if (!list) return;
    db.collection('quotations').orderBy('savedAt','desc').limit(20).get().then(snap => {
        if (snap.empty) { list.innerHTML = '<p class="p-4 text-center text-gray-400 text-sm italic">কোনো কোটেশন সংরক্ষিত নেই।</p>'; return; }
        document.getElementById('qt-count-badge').innerText = `মোট: ${snap.size}টি`;
        list.innerHTML = '';
        snap.forEach(doc => {
            const d = doc.data();
            list.innerHTML += `
            <div class="p-4 hover:bg-violet-50 transition flex justify-between items-center gap-3 flex-wrap">
              <div>
                <p class="font-semibold text-gray-800"><i class="fas fa-building text-violet-500 mr-1"></i>${d.name}</p>
                <p class="text-xs text-gray-400">${Utils.formatDate(d.date)} • ${d.floors?.length||0}টি তলা</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="font-bold text-violet-700">৳ ${Utils.formatCurrency(d.grandTotal||0)}</span>
                <button data-id="${doc.id}" class="btn-del-quotation text-red-400 hover:text-red-600 transition"><i class="fas fa-trash pointer-events-none"></i></button>
              </div>
            </div>`;
        });
        list.querySelectorAll('.btn-del-quotation').forEach(btn => {
            btn.onclick = () => {
                if(confirm('এই কোটেশনটি ডিলিট করবেন?')) {
                    db.collection('quotations').doc(btn.dataset.id).delete().then(() => { Utils.showToast('মুছে ফেলা হয়েছে','info'); renderSavedQuotations(); });
                }
            };
        });
    });
}
