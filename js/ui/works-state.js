window.WS = {
    genId: () => Math.random().toString(36).substr(2, 9),
    updateExpenseCheckboxes: function() {
        document.querySelectorAll('.expense-row .exp-type').forEach(sel => {
            if(sel.value !== 'worker') return;
            const container = sel.closest('.expense-row').querySelector('.exp-worker-checkboxes');
            const ex = Array.from(container.querySelectorAll('input:checked')).map(i=>i.value);
            let h = '';
            document.querySelectorAll('.worker-row').forEach(wRow => {
                const wid = wRow.dataset.id;
                const name = wRow.querySelector('.worker-name').value || 'অজ্ঞাত';
                const checked = ex.includes(wid) ? 'checked' : '';
                h += `<label class="text-xs flex items-center bg-white p-1 rounded border"><input type="checkbox" value="${wid}" class="mr-1 exp-worker-cb calc-trigger" ${checked}> ${name}</label>`;
            });
            container.innerHTML = h;
        });
    },
    recalcAll: function() {
        let malikExp = 0, personalExp = 0;
        let workerExtras = {};
        
        document.querySelectorAll('.expense-row').forEach(row => {
            const amount = parseFloat(row.querySelector('.exp-amount').value) || 0;
            const type = row.querySelector('.exp-type').value;
            if(type === 'malik') malikExp += amount;
            else if(type === 'personal') personalExp += amount;
            else if(type === 'worker') {
                const checked = Array.from(row.querySelectorAll('.exp-worker-cb:checked'));
                if(checked.length > 0) {
                    const split = amount / checked.length;
                    checked.forEach(cb => { workerExtras[cb.value] = (workerExtras[cb.value] || 0) + split; });
                }
            }
        });

        let totalLaborCost = 0;
        document.querySelectorAll('.worker-row').forEach(row => {
            const wid = row.dataset.id;
            const baseRate = parseFloat(row.querySelector('.worker-rate').value) || 0;
            const extra = workerExtras[wid] || 0;
            const totalRate = baseRate + extra;
            const paid = parseFloat(row.querySelector('.worker-paid').value) || 0;
            row.querySelector('.worker-due').value = (totalRate - paid).toFixed(2);
            totalLaborCost += totalRate;
            
            const exShow = row.querySelector('.worker-extra-show');
            if(exShow) {
                if(extra > 0) { exShow.innerText = `+${extra.toFixed(1)}`; exShow.classList.remove('hidden'); }
                else exShow.classList.add('hidden');
            }
        });

        let grandTotalWork = 0;
        document.querySelectorAll('.floor-item').forEach(item => {
            const mType = item.querySelector('.item-measure-type').value;
            const qInput = item.querySelector('.item-qty');
            if(mType !== 'qty' && item.contains(item.querySelector('.item-l-ft'))) {
                let l = (parseFloat(item.querySelector('.item-l-ft').value)||0) + (parseFloat(item.querySelector('.item-l-in').value)||0)/12;
                let w = (parseFloat(item.querySelector('.item-w-ft').value)||0) + (parseFloat(item.querySelector('.item-w-in').value)||0)/12;
                let qty = mType === 'sqft' ? l*w : l;
                if(l > 0) qInput.value = qty.toFixed(2);
            }
            const qty = parseFloat(qInput.value) || 0;
            const rate = parseFloat(item.querySelector('.item-rate').value) || 0;
            const total = qty * rate;
            item.querySelector('.item-total').innerText = total.toFixed(2);
            grandTotalWork += total;
        });

        const malikPaid = parseFloat(document.getElementById('malik-received').value) || 0;
        const totalBillForMalik = grandTotalWork + malikExp;
        const malikDue = totalBillForMalik - malikPaid;
        const profit = grandTotalWork - totalLaborCost - personalExp;

        document.getElementById('calc-labor-cost').innerText = Utils.formatCurrency(totalLaborCost);
        document.getElementById('calc-grand-total').innerText = Utils.formatCurrency(grandTotalWork);
        const mdEl = document.getElementById('calc-malik-due');
        mdEl.innerText = Utils.formatCurrency(malikDue);
        if(malikExp > 0) mdEl.innerHTML += `<br><span class="text-xs text-gray-400 font-normal">(${Utils.formatCurrency(grandTotalWork)} কাজ + ${Utils.formatCurrency(malikExp)} এক্সট্রা)</span>`;
        
        const prEl = document.getElementById('calc-profit');
        prEl.innerText = Utils.formatCurrency(profit);
        if(personalExp > 0) prEl.innerHTML += `<br><span class="text-xs text-red-400 font-normal">(-${Utils.formatCurrency(personalExp)} নিজের খরচ কাটা হয়েছে)</span>`;
    }
};
