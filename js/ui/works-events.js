window.SetupWorksEvents = function() {
    const wc = document.getElementById('works-workers-container');
    const fc = document.getElementById('works-floors-container');
    if (!wc || !fc) return;
    
    wc.innerHTML = window.TemplateWorkersContainer;
    fc.innerHTML = window.TemplateFloorsContainer;
    document.getElementById('works-expenses-container').innerHTML = window.TemplateExpensesContainer;

    document.getElementById('btn-add-worker').addEventListener('click', () => {
        document.getElementById('workers-list-ui').insertAdjacentHTML('beforeend', window.TemplateWorkerRow(window.WS.genId()));
    });

    document.getElementById('btn-add-floor').addEventListener('click', () => {
        const fId = window.WS.genId();
        document.getElementById('floors-list-ui').insertAdjacentHTML('beforeend', window.TemplateFloorBlock(fId));
        document.getElementById(`items-${fId}`).insertAdjacentHTML('beforeend', window.TemplateFloorItem(fId, window.WS.genId()));
    });

    const form = document.getElementById('form-add-work');
    form.addEventListener('input', (e) => {
        if(e.target.classList.contains('calc-trigger') || e.target.id === 'malik-received') {
            window.WS.recalcAll();
        }
    });

    form.addEventListener('change', (e) => {
        if(e.target.classList.contains('item-measure-type')) {
            const dims = e.target.closest('.floor-item').querySelector('.item-dimensions');
            if(dims) dims.style.display = e.target.value === 'qty' ? 'none' : 'flex';
            if(e.target.value === 'rft') {
                e.target.closest('.floor-item').querySelectorAll('.item-w-ft, .item-w-in').forEach(i=>i.style.display='none');
            } else if(e.target.value === 'sqft') {
                e.target.closest('.floor-item').querySelectorAll('.item-w-ft, .item-w-in').forEach(i=>i.style.display='block');
            }
            window.WS.recalcAll();
        }
    });

    form.addEventListener('click', (e) => {
        if(e.target.closest('.btn-remove-worker')) {
            e.target.closest('.worker-row').remove(); window.WS.recalcAll();
        } else if(e.target.closest('.btn-remove-floor')) {
            e.target.closest('.floor-block').remove(); window.WS.recalcAll();
        } else if(e.target.closest('.btn-add-item')) {
            const btn = e.target.closest('.btn-add-item');
            document.getElementById(`items-${btn.dataset.floor}`).insertAdjacentHTML('beforeend', window.TemplateFloorItem(btn.dataset.floor, window.WS.genId()));
        } else if(e.target.closest('.btn-remove-item')) {
            e.target.closest('.floor-item').remove(); window.WS.recalcAll();
        } else if(e.target.closest('#btn-cancel-edit')) {
            form.reset();
            document.getElementById('workers-list-ui').innerHTML = '';
            document.getElementById('floors-list-ui').innerHTML = '';
            window.WS.currentEditId = null;
            const btnSave = document.getElementById('btn-save-work');
            btnSave.classList.replace('bg-emerald-600', 'bg-blue-600');
            btnSave.classList.replace('hover:bg-emerald-700', 'hover:bg-blue-700');
            btnSave.innerHTML = '<i class="fas fa-save mr-1"></i> সেভ করুন';
            document.getElementById('btn-cancel-edit').classList.add('hidden');
            document.getElementById('expenses-list-ui').innerHTML = '';
            window.WS.recalcAll();
        } else if(e.target.closest('#btn-add-expense')) {
            document.getElementById('expenses-list-ui').insertAdjacentHTML('beforeend', window.TemplateExpenseRow(window.WS.genId()));
            window.WS.updateExpenseCheckboxes();
        } else if(e.target.closest('.btn-remove-expense')) {
            e.target.closest('.expense-row').remove(); window.WS.recalcAll();
        }
    });

    form.addEventListener('change', (e) => {
        if(e.target.classList.contains('exp-type')) {
            const expRow = e.target.closest('.expense-row');
            const selectionDiv = expRow.querySelector('.exp-workers-selection');
            if(e.target.value === 'worker') {
                selectionDiv.style.display = 'block';
                window.WS.updateExpenseCheckboxes();
            } else {
                selectionDiv.style.display = 'none';
            }
            window.WS.recalcAll();
        }
    });
};
