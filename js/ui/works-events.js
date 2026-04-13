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
        if(e.target.classList.contains('worker-field')) {
            window.WorkerSelectHandler.onFieldChange(e.target.closest('.worker-row'));
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
        const el = e.target;
        if(el.closest('.btn-remove-worker')) { el.closest('.worker-row').remove(); window.WS.recalcAll(); }
        else if(el.closest('.btn-remove-floor')) { el.closest('.floor-block').remove(); window.WS.recalcAll(); }
        else if(el.closest('.btn-remove-item')) { el.closest('.floor-item').remove(); window.WS.recalcAll(); }
        else if(el.closest('.btn-remove-expense')) { el.closest('.expense-row').remove(); window.WS.recalcAll(); }
        else if(el.closest('.btn-cancel-worker-update')) {
            window.WorkerSelectHandler.onCancel(el.closest('.worker-row'));
        } else if(el.closest('.btn-add-item')) {
            const b = el.closest('.btn-add-item');
            document.getElementById(`items-${b.dataset.floor}`).insertAdjacentHTML('beforeend', window.TemplateFloorItem(b.dataset.floor, window.WS.genId()));
        } else if(el.closest('#btn-add-expense')) {
            document.getElementById('expenses-list-ui').insertAdjacentHTML('beforeend', window.TemplateExpenseRow(window.WS.genId()));
            window.WS.updateExpenseCheckboxes();
        } else if(el.closest('#btn-cancel-edit')) {
            form.reset();
            document.getElementById('workers-list-ui').innerHTML = '';
            document.getElementById('floors-list-ui').innerHTML = '';
            window.WS.currentEditId = null;
            const bS = document.getElementById('btn-save-work');
            bS.className = bS.className.replace('bg-emerald-600', 'bg-blue-600').replace('hover:bg-emerald-700', 'hover:bg-blue-700');
            bS.innerHTML = '<i class="fas fa-save mr-1"></i> সেভ করুন';
            document.getElementById('btn-cancel-edit').classList.add('hidden');
            document.getElementById('expenses-list-ui').innerHTML = '';
            window.WS.recalcAll();
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
        
        if(e.target.classList.contains('worker-select-db')) {
            window.WorkerSelectHandler.onSelect(e.target.closest('.worker-row'), e.target.value);
        }
        if(e.target.classList.contains('worker-field')) {
            window.WorkerSelectHandler.onFieldChange(e.target.closest('.worker-row'));
        }
    });
};
