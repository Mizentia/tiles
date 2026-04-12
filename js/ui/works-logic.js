window.SetupWorksLogic = function() {
    const refs = {};
    ['work-type', 'measure-type', 'dim-l-ft', 'dim-l-in', 'dim-w-ft', 'dim-w-in', 'work-qty', 'work-rate'].forEach(id => refs[id] = document.getElementById(id));
    if(!refs['work-qty']) return;

    refs['measure-type'].addEventListener('change', (e) => {
        const val = e.target.value;
        document.getElementById('dim-w-group').style.display = val === 'sqft' ? 'block' : 'none';
        document.getElementById('dim-l-group').style.display = val !== 'qty' ? 'block' : 'none';
        if(val !== 'qty') {
            refs['dim-l-ft'].value = ''; refs['dim-l-in'].value = '';
            refs['dim-w-ft'].value = ''; refs['dim-w-in'].value = '';
        }
        calcDimensions();
    });

    const calcDimensions = () => {
        const mType = refs['measure-type'].value;
        if (mType === 'qty') return calcTotal();
        
        let lFt = parseFloat(refs['dim-l-ft'].value) || 0;
        let lIn = parseFloat(refs['dim-l-in'].value) || 0;
        let wFt = parseFloat(refs['dim-w-ft'].value) || 0;
        let wIn = parseFloat(refs['dim-w-in'].value) || 0;

        let totalL = lFt + (lIn / 12);
        let totalW = wFt + (wIn / 12);
        
        let totalQty = 0;
        if (mType === 'sqft') totalQty = totalL * totalW;
        else if (mType === 'rft') totalQty = totalL;
        
        refs['work-qty'].value = totalQty ? totalQty.toFixed(2) : '';
        calcTotal();
    };

    const calcTotal = () => {
        let rate = parseFloat(refs['work-rate'].value) || 0;
        let qty = parseFloat(refs['work-qty'].value) || 0;
        document.getElementById('work-calc-total').innerText = Utils.formatCurrency(rate * qty);
    };

    ['dim-l-ft', 'dim-l-in', 'dim-w-ft', 'dim-w-in'].forEach(id => refs[id].addEventListener('input', calcDimensions));
    refs['work-qty'].addEventListener('input', calcTotal);
    refs['work-rate'].addEventListener('input', calcTotal);

    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('btn-quick-type')) {
            refs['work-type'].value = e.target.innerText;
        }
        if(e.target.classList.contains('btn-quick-rate')) {
            refs['work-rate'].value = e.target.innerText; calcTotal();
        }
        if(e.target.classList.contains('btn-quick-qty')) {
            refs['measure-type'].value = 'qty';
            refs['measure-type'].dispatchEvent(new Event('change'));
            refs['work-qty'].value = e.target.innerText; calcTotal();
        }
    });

    document.getElementById('form-add-work').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-save-work');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; btn.disabled = true;

        let date = document.getElementById('work-date').value || AppState.todayStr;
        const rate = parseFloat(refs['work-rate'].value) || 0;
        const qty = parseFloat(refs['work-qty'].value) || 0;

        const data = {
            date: date, workType: refs['work-type'].value, measureType: refs['measure-type'].value,
            lFt: parseFloat(refs['dim-l-ft'].value) || 0, lIn: parseFloat(refs['dim-l-in'].value) || 0,
            wFt: parseFloat(refs['dim-w-ft'].value) || 0, wIn: parseFloat(refs['dim-w-in'].value) || 0,
            rate: rate, qty: qty, total: rate * qty
        };

        if (await window.FBOperations.addWork(data, btn)) {
            e.target.reset(); refs['measure-type'].dispatchEvent(new Event('change'));
            document.getElementById('work-date').value = AppState.todayStr;
            document.getElementById('work-calc-total').innerText = "0.00";
        }
        btn.innerHTML = '<i class="fas fa-save mr-1"></i> সেভ করুন'; btn.disabled = false;
    });
};
