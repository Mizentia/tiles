window.RenderWorks = function() {
    const tbody = document.getElementById('works-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const totalWork = AppState.worksData.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
    document.getElementById('list-total-work').innerText = Utils.formatCurrency(totalWork);

    if (AppState.worksData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-500">কোনো কাজের হিসাব পাওয়া যায়নি।</td></tr>`;
        return;
    }

    AppState.worksData.forEach(work => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition";
        let calcDetails = '';
        
        if (work.measureType === 'sqft' && work.lFt !== undefined) {
            calcDetails = `<div class="text-xs text-indigo-500 mt-1">L: ${work.lFt}' ${work.lIn}" × W: ${work.wFt}' ${work.wIn}" = ${work.qty} sqft</div>`;
        } else if (work.measureType === 'rft' && work.lFt !== undefined) {
            calcDetails = `<div class="text-xs text-emerald-500 mt-1">L: ${work.lFt}' ${work.lIn}" = ${work.qty} rft</div>`;
        } else {
            calcDetails = `<div class="text-xs text-gray-500 mt-1">পরিমাণ: ${work.qty}</div>`;
        }

        tr.innerHTML = `
            <td class="p-3 border-b whitespace-nowrap align-top">${Utils.formatDate(work.date)}</td>
            <td class="p-3 border-b align-top">
                <span class="font-medium text-gray-700">${work.workType}</span>
                ${calcDetails}
            </td>
            <td class="p-3 border-b text-gray-600 text-xs md:text-sm align-top text-center">
                ৳${work.rate} <br>x ${work.qty}
            </td>
            <td class="p-3 border-b text-right font-semibold text-indigo-700 align-top whitespace-nowrap">৳ ${Utils.formatCurrency(work.total)}</td>
            <td class="p-3 border-b text-center align-top whitespace-nowrap">
                <button data-id="${work.id}" class="btn-edit-work text-blue-400 hover:text-blue-600 p-1 transition mr-2" title="এডিট করুন"><i class="fas fa-edit pointer-events-none"></i></button>
                <button data-id="${work.id}" class="btn-delete-work text-red-400 hover:text-red-600 p-1 transition" title="মুছে ফেলুন"><i class="fas fa-trash pointer-events-none"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};
