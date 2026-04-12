window.LoadWorkForEdit = function(id) {
    if(!confirm("আপনি কি এই কাজটি মডিফাই/এডিট করতে চান?")) return;
    const work = window.AppState.worksData.find(w => w.id === id);
    if (!work) return;

    window.WS.currentEditId = id;
    const form = document.getElementById('form-add-work');
    const btn = document.getElementById('btn-save-work');
    btn.innerHTML = '<i class="fas fa-edit mr-1"></i> আপডেট করুন';
    btn.classList.replace('bg-blue-600', 'bg-emerald-600');
    btn.classList.replace('hover:bg-blue-700', 'hover:bg-emerald-700');
    document.getElementById('btn-cancel-edit').classList.remove('hidden');

    document.getElementById('work-start-date').value = work.dateStart || work.date || '';
    document.getElementById('work-end-date').value = work.dateEnd || work.date || '';
    document.getElementById('malik-received').value = work.malikPaid || '';

    const wContainer = document.getElementById('workers-list-ui');
    wContainer.innerHTML = '';
    if(work.workers && work.workers.length) {
        work.workers.forEach(w => {
            const wId = window.WS.genId();
            wContainer.insertAdjacentHTML('beforeend', window.TemplateWorkerRow(wId));
            const row = wContainer.lastElementChild;
            row.querySelector('.worker-name').value = w.name || '';
            row.querySelector('.worker-phone').value = w.phone || '';
            row.querySelector('.worker-role').value = w.role || 'Mistri';
            row.querySelector('.worker-location').value = w.location || '';
            row.querySelector('.worker-rate').value = w.rate || '';
            row.querySelector('.worker-paid').value = w.paid || '';
        });
    }

    const fContainer = document.getElementById('floors-list-ui');
    fContainer.innerHTML = '';
    if(work.floors && work.floors.length) {
        work.floors.forEach(f => {
            const fId = window.WS.genId();
            fContainer.insertAdjacentHTML('beforeend', window.TemplateFloorBlock(fId));
            const block = fContainer.lastElementChild;
            block.querySelector('.floor-name').value = f.name || '';
            const itemsContainer = document.getElementById(`items-${fId}`);
            f.items.forEach(i => {
                const iId = window.WS.genId();
                itemsContainer.insertAdjacentHTML('beforeend', window.TemplateFloorItem(fId, iId));
                const iRow = itemsContainer.lastElementChild;
                iRow.querySelector('.item-desc').value = i.desc || '';
                iRow.querySelector('.item-measure-type').value = i.mType || 'sqft';
                iRow.querySelector('.item-l-ft').value = i.lFt || '';
                iRow.querySelector('.item-l-in').value = i.lIn || '';
                iRow.querySelector('.item-w-ft').value = i.wFt || '';
                iRow.querySelector('.item-w-in').value = i.wIn || '';
                iRow.querySelector('.item-qty').value = i.qty || '';
                iRow.querySelector('.item-rate').value = i.rate || '';
                iRow.querySelector('.item-measure-type').dispatchEvent(new Event('change', {bubbles: true}));
            });
        });
    }

    const eContainer = document.getElementById('expenses-list-ui');
    eContainer.innerHTML = '';
    if(work.expenses && work.expenses.length) {
        work.expenses.forEach(x => {
            eContainer.insertAdjacentHTML('beforeend', window.TemplateExpenseRow(window.WS.genId()));
            const r = eContainer.lastElementChild;
            r.querySelector('.exp-desc').value = x.desc || '';
            r.querySelector('.exp-amount').value = x.amount || '';
            r.querySelector('.exp-type').value = x.type || 'worker';
            r.querySelector('.exp-type').dispatchEvent(new Event('change', {bubbles: true}));
            if(x.type === 'worker' && x.workers) {
                // Pre-check the workers if they exist. Needs small delay or immediate execution if workers exist.
                setTimeout(() => {
                    x.workers.forEach(wid => {
                        const cb = r.querySelector(`.exp-worker-cb[value="${wid}"]`);
                        if(cb) cb.checked = true;
                    });
                    window.WS.recalcAll();
                }, 10);
            }
        });
    }

    window.WS.recalcAll();
    document.getElementById('section-works').scrollIntoView({ behavior: 'smooth' });
};
