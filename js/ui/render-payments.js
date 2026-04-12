window.RenderPayments = function() {
    const tbody = document.getElementById('payments-table-body');
    tbody.innerHTML = '';

    const startDate = document.getElementById('filter-start').value;
    const endDate = document.getElementById('filter-end').value;

    let filteredData = AppState.paymentsData;
    if (startDate) {
        filteredData = filteredData.filter(p => p.date >= startDate);
    }
    if (endDate) {
        filteredData = filteredData.filter(p => p.date <= endDate);
    }

    const totalFiltered = filteredData.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    document.getElementById('filtered-total-paid').innerText = Utils.formatCurrency(totalFiltered);

    if (filteredData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-gray-500">এই সময়ে কোনো লেনদেন পাওয়া যায়নি।</td></tr>`;
        return;
    }

    filteredData.forEach(payment => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition";
        tr.innerHTML = `
            <td class="p-3 border-b whitespace-nowrap">${Utils.formatDate(payment.date)}</td>
            <td class="p-3 border-b text-emerald-600 font-semibold">৳ ${Utils.formatCurrency(payment.amount)}</td>
            <td class="p-3 border-b text-gray-600">${payment.note || '-'}</td>
            <td class="p-3 border-b text-center whitespace-nowrap">
                <button data-id="${payment.id}" class="btn-edit-payment text-emerald-400 hover:text-emerald-600 p-1 transition mr-2" title="এডিট করুন"><i class="fas fa-edit pointer-events-none"></i></button>
                <button data-id="${payment.id}" class="btn-delete-payment text-red-400 hover:text-red-600 p-1 transition" title="মুছে ফেলুন"><i class="fas fa-trash pointer-events-none"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};
