window.EditModal = {
    init: () => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div id="edit-modal" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-[100] hidden flex flex-col items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300">
                <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative sm:max-w-2xl max-h-[90vh] overflow-y-auto transform scale-100 transition-transform">
                    <button type="button" onclick="EditModal.close()" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"><i class="fas fa-times text-2xl"></i></button>
                    <h3 class="text-xl font-bold mb-5 border-b pb-3 text-gray-800" id="edit-modal-title">এডিট করুন</h3>
                    <form id="edit-modal-form" class="space-y-5"></form>
                </div>
            </div>
        `;
        document.body.appendChild(div);

        document.getElementById('edit-modal-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> সেভ হচ্ছে...'; 
            btn.disabled = true;

            let data = {};
            if(EditModal.currentCollection === 'payments') {
                data = {
                    date: document.getElementById('em-date').value,
                    amount: parseFloat(document.getElementById('em-amount').value) || 0,
                    note: document.getElementById('em-note').value
                };
            } else if (EditModal.currentCollection === 'works') {
                const rate = parseFloat(document.getElementById('em-work-rate').value) || 0;
                const qty = parseFloat(document.getElementById('em-work-qty').value) || 0;
                data = {
                    date: document.getElementById('em-work-date').value,
                    workType: document.getElementById('em-work-type').value,
                    rate: rate, qty: qty, total: rate * qty
                };
                const mType = document.getElementById('em-measure-type')?.value;
                if(mType) data.measureType = mType;
                ['lFt', 'lIn', 'wFt', 'wIn'].forEach(f => {
                    const el = document.getElementById('em-'+f);
                    if(el && el.value !== '') data[f] = parseFloat(el.value) || 0;
                });
            }

            await window.FBOperations.updateDocument(EditModal.currentCollection, EditModal.currentEditId, data);
            EditModal.close();
        });
    },
    currentEditId: null, currentCollection: null,
    close: () => document.getElementById('edit-modal').classList.add('hidden'),
    openPayment: (id) => {
        const item = AppState.paymentsData.find(p => p.id === id);
        if(!item) return;
        EditModal.currentEditId = id; EditModal.currentCollection = 'payments';
        document.getElementById('edit-modal-title').innerHTML = '<i class="fas fa-edit text-emerald-500 mr-2"></i>পেমেন্ট এডিট';
        document.getElementById('edit-modal-form').innerHTML = `
            <div><label class="block text-sm font-medium text-gray-700 mb-1">তারিখ</label><input type="date" id="em-date" value="${item.date}" required class="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-emerald-500 outline-none"></div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">টাকার পরিমাণ</label><input type="number" id="em-amount" value="${item.amount}" required class="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-emerald-500 outline-none"></div>
            <div><label class="block text-sm font-medium text-gray-700 mb-1">নোট</label><input type="text" id="em-note" value="${item.note || ''}" class="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-emerald-500 outline-none"></div>
            <div class="text-right mt-6"><button type="submit" class="bg-emerald-600 text-white font-medium px-6 py-2.5 rounded hover:bg-emerald-700 transition shadow"><i class="fas fa-save mr-1"></i> আপডেট করুন</button></div>
        `;
        document.getElementById('edit-modal').classList.remove('hidden');
    },
    openWork: (id) => {
        const item = AppState.worksData.find(w => w.id === id);
        if(!item) return;
        EditModal.currentEditId = id; EditModal.currentCollection = 'works';
        document.getElementById('edit-modal-title').innerHTML = '<i class="fas fa-edit text-blue-500 mr-2"></i>কাজের হিসাব এডিট';
        
        let extraFields = '';
        if(item.measureType && item.measureType !== 'qty') {
            extraFields = `<input type="hidden" id="em-measure-type" value="${item.measureType}">
                <div class="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded border border-gray-200">
                    <div><label class="text-xs font-semibold text-gray-600 block mb-1">লম্বা (Ft - In)</label>
                        <div class="flex gap-2"><input type="number" id="em-lFt" value="${item.lFt!==undefined?item.lFt:''}" placeholder="Ft" class="w-1/2 border p-2 rounded text-sm"><input type="number" id="em-lIn" value="${item.lIn!==undefined?item.lIn:''}" placeholder="In" class="w-1/2 border p-2 rounded text-sm"></div>
                    </div>
                    ${item.measureType === 'sqft' ? `<div><label class="text-xs font-semibold text-gray-600 block mb-1">চওড়া (Ft - In)</label>
                        <div class="flex gap-2"><input type="number" id="em-wFt" value="${item.wFt!==undefined?item.wFt:''}" placeholder="Ft" class="w-1/2 border p-2 rounded text-sm"><input type="number" id="em-wIn" value="${item.wIn!==undefined?item.wIn:''}" placeholder="In" class="w-1/2 border p-2 rounded text-sm"></div>
                    </div>` : ''}
                </div>`;
        }

        document.getElementById('edit-modal-form').innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-gray-700 mb-1">তারিখ</label><input type="date" id="em-work-date" value="${item.date}" required class="w-full border p-2.5 rounded focus:ring-blue-500 outline-none"></div>
                <div><label class="block text-sm font-medium text-gray-700 mb-1">বিবরণ</label><input type="text" id="em-work-type" value="${item.workType}" required class="w-full border p-2.5 rounded focus:ring-blue-500 outline-none"></div>
            </div>
            ${extraFields}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-gray-700 mb-1">পরিমাণ (Qty)</label><input type="number" step="0.01" id="em-work-qty" value="${item.qty}" required class="w-full border p-2.5 rounded" oninput="EditModal.calcWork()"></div>
                <div><label class="block text-sm font-medium text-gray-700 mb-1">রেট</label><input type="number" step="0.01" id="em-work-rate" value="${item.rate}" required class="w-full border p-2.5 rounded" oninput="EditModal.calcWork()"></div>
            </div>
            <div class="bg-blue-50 p-4 rounded flex justify-between items-center border border-blue-100">
                <span class="font-bold text-gray-700">মোট বিল:</span>
                <span class="text-xl font-bold text-blue-700">৳ <span id="em-work-total">${item.total.toFixed(2)}</span></span>
            </div>
            <div class="text-right mt-6"><button type="submit" class="bg-blue-600 text-white font-medium px-6 py-2.5 rounded hover:bg-blue-700 transition shadow"><i class="fas fa-save mr-1"></i> আপডেট করুন</button></div>
        `;
        ['em-lFt', 'em-lIn', 'em-wFt', 'em-wIn'].forEach(id => { const el = document.getElementById(id); if(el) el.addEventListener('input', EditModal.calcDim); });
        document.getElementById('edit-modal').classList.remove('hidden');
    },
    calcDim: () => {
        const mType = document.getElementById('em-measure-type')?.value; if(!mType) return;
        let lFt = parseFloat(document.getElementById('em-lFt')?.value)||0, lIn = parseFloat(document.getElementById('em-lIn')?.value)||0;
        let wFt = parseFloat(document.getElementById('em-wFt')?.value)||0, wIn = parseFloat(document.getElementById('em-wIn')?.value)||0;
        let totalQty = mType === 'sqft' ? (lFt + lIn/12) * (wFt + wIn/12) : (lFt + lIn/12);
        document.getElementById('em-work-qty').value = totalQty ? totalQty.toFixed(2) : '';
        EditModal.calcWork();
    },
    calcWork: () => {
        const rate = parseFloat(document.getElementById('em-work-rate').value) || 0;
        const qty = parseFloat(document.getElementById('em-work-qty').value) || 0;
        document.getElementById('em-work-total').innerText = (rate * qty).toFixed(2);
    }
};
