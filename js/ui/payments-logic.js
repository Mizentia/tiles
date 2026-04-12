window.SetupPaymentsLogic = function() {
    const form = document.getElementById('form-add-payment');
    if(!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-save-payment');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; btn.disabled = true;

        const date = document.getElementById('pay-date').value || AppState.todayStr;
        const amount = parseFloat(document.getElementById('pay-amount').value) || 0;
        const note = document.getElementById('pay-note').value;
        
        if (await window.FBOperations.addPayment({ date, amount, note }, btn)) {
            e.target.reset();
            document.getElementById('pay-date').value = AppState.todayStr;
        }
        btn.innerHTML = '<i class="fas fa-save mr-1"></i> এন্ট্রি করুন'; btn.disabled = false;
    });

    document.getElementById('filter-start').addEventListener('change', window.RenderPayments);
    document.getElementById('filter-end').addEventListener('change', window.RenderPayments);
    document.getElementById('btn-clear-filter').addEventListener('click', () => {
        document.getElementById('filter-start').value = '';
        document.getElementById('filter-end').value = '';
        window.RenderPayments();
    });
};
