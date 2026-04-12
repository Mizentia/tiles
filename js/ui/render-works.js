window.RenderWorks = function() {
    const listContainer = document.getElementById('works-list-container');
    if (!listContainer) return;
    
    if(!document.getElementById('works-table-body')) listContainer.innerHTML = window.TemplateWorksList;

    const tbody = document.getElementById('works-table-body');
    tbody.innerHTML = '';
    
    const totalWork = AppState.worksData.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
    document.getElementById('list-total-work').innerText = Utils.formatCurrency(totalWork);

    if (AppState.worksData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-500">কোনো কাজের হিসাব পাওয়া যায়নি।</td></tr>`;
        return;
    }

    AppState.worksData.forEach(work => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-blue-50 transition cursor-pointer";
        tr.onclick = (e) => {
            if(!e.target.closest('.btn-delete-work') && !e.target.closest('.btn-edit-work')) window.ShowWorkModal(work);
        };
        
        let summary = "পুরাতন হিসাব";
        if(work.floors && work.floors.length) {
            summary = work.floors.map(f => f.name || "তলা").join(', ') + ` (${work.floors.reduce((acc, f)=>acc+f.items.length,0)}টি কাজ)`;
        } else if (work.workType) {
            summary = work.workType;
        }

        let dateStr = work.date || "অজ্ঞাত তারিখ";
        if(work.dateStart) {
            dateStr = work.dateStart === work.dateEnd ? Utils.formatDate(work.dateStart) : `${Utils.formatDate(work.dateStart)} - ${Utils.formatDate(work.dateEnd)}`;
        } else if(work.date) {
            dateStr = Utils.formatDate(work.date);
        }

        tr.innerHTML = `
            <td class="p-3 border-b whitespace-nowrap align-top">${dateStr}</td>
            <td class="p-3 border-b align-top font-medium text-gray-700">${summary}</td>
            <td class="p-3 border-b text-center align-top text-red-500">৳ ${Utils.formatCurrency(work.laborCost || 0)}</td>
            <td class="p-3 border-b text-right font-bold text-indigo-700 align-top whitespace-nowrap">৳ ${Utils.formatCurrency(work.total || 0)}</td>
            <td class="p-3 border-b text-center align-top whitespace-nowrap">
                <button data-id="${work.id}" class="btn-edit-work relative text-emerald-500 hover:text-emerald-700 p-1 mr-2 transition" title="এডিট করুন"><i class="fas fa-edit pointer-events-none"></i></button>
                <button data-id="${work.id}" class="btn-delete-work relative text-red-400 hover:text-red-600 p-1 transition" title="মুছে ফেলুন"><i class="fas fa-trash pointer-events-none"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};
