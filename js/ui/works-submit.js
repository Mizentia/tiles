window.SetupWorksSubmit = function() {
    const form = document.getElementById('form-add-work');
    if(!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-save-work');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; btn.disabled = true;

        const dateStart = document.getElementById('work-start-date').value || AppState.todayStr;
        const dateEnd = document.getElementById('work-end-date').value || dateStart;

        const workers = [];
        for(let row of Array.from(document.querySelectorAll('.worker-row'))) {
            const dbId = row.querySelector('.worker-db-id') ? row.querySelector('.worker-db-id').value : '';
            const wData = {
                name: row.querySelector('.worker-name').value,
                phone: row.querySelector('.worker-phone').value,
                role: row.querySelector('.worker-role').value,
                location: row.querySelector('.worker-location').value
            };
            if(wData.name || wData.phone) {
                if(dbId) db.collection('workers').doc(dbId).update(wData).catch(e=>console.log(e));
                else db.collection('workers').add({...wData, createdAt: firebase.firestore.FieldValue.serverTimestamp()}).catch(e=>console.log(e));
            }
            workers.push({
                ...wData,
                rate: parseFloat(row.querySelector('.worker-rate').value) || 0,
                paid: parseFloat(row.querySelector('.worker-paid').value) || 0,
                due: parseFloat(row.querySelector('.worker-due').value) || 0
            });
        }

        const floors = Array.from(document.querySelectorAll('.floor-block')).map(block => ({
            name: block.querySelector('.floor-name').value,
            items: Array.from(block.querySelectorAll('.floor-item')).map(item => ({
                desc: item.querySelector('.item-desc').value,
                mType: item.querySelector('.item-measure-type').value,
                lFt: parseFloat(item.querySelector('.item-l-ft').value) || 0,
                lIn: parseFloat(item.querySelector('.item-l-in').value) || 0,
                wFt: parseFloat(item.querySelector('.item-w-ft').value) || 0,
                wIn: parseFloat(item.querySelector('.item-w-in').value) || 0,
                qty: parseFloat(item.querySelector('.item-qty').value) || 0,
                rate: parseFloat(item.querySelector('.item-rate').value) || 0,
                total: parseFloat(item.querySelector('.item-total').innerText) || 0
            }))
        }));

        const expenses = Array.from(document.querySelectorAll('.expense-row')).map(row => {
            const type = row.querySelector('.exp-type').value;
            let checks = [];
            if(type === 'worker') {
                checks = Array.from(row.querySelectorAll('.exp-worker-cb:checked')).map(cb => cb.value);
            }
            return {
                desc: row.querySelector('.exp-desc').value,
                amount: parseFloat(row.querySelector('.exp-amount').value) || 0,
                type: type,
                workers: checks
            };
        });

        const data = {
            dateStart, dateEnd, workers, floors, expenses,
            malikPaid: parseFloat(document.getElementById('malik-received').value) || 0,
            laborCost: parseFloat(document.getElementById('calc-labor-cost').innerText.replace(/[^\d.-]/g, '') || 0),
            total: parseFloat(document.getElementById('calc-grand-total').innerText.replace(/[^\d.-]/g, '') || 0),
            malikDue: parseFloat(document.getElementById('calc-malik-due').innerText.replace(/[^\d.-]/g, '') || 0),
            netProfit: parseFloat(document.getElementById('calc-profit').innerText.replace(/[^\d.-]/g, '') || 0)
        };

        let success = false;
        if(window.WS.currentEditId) {
            success = await window.FBOperations.updateDocument('works', window.WS.currentEditId, data);
            if(success) {
                window.WS.currentEditId = null;
                btn.classList.replace('bg-emerald-600', 'bg-blue-600');
                btn.classList.replace('hover:bg-emerald-700', 'hover:bg-blue-700');
                document.getElementById('btn-cancel-edit').classList.add('hidden');
            }
        } else {
            success = await window.FBOperations.addWork(data, btn);
        }

        if (success) {
            e.target.reset();
            document.getElementById('workers-list-ui').innerHTML = '';
            document.getElementById('floors-list-ui').innerHTML = '';
            document.getElementById('expenses-list-ui').innerHTML = '';
            window.WS.recalcAll();
        }
        btn.innerHTML = '<i class="fas fa-save mr-1"></i> সেভ করুন'; btn.disabled = false;
    });
};
