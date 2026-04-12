window.ShowWorkModal = function(work) {
    let modal = document.getElementById('work-detail-modal');
    if(!modal) {
        document.body.insertAdjacentHTML('beforeend', window.TemplateWorkDetailModal);
        modal = document.getElementById('work-detail-modal');
        const closer = () => modal.classList.add('hidden');
        document.getElementById('btn-close-work-modal').onclick = closer;
        document.getElementById('btn-close-work-modal-2').onclick = closer;
    }
    
    let html = `<div class="grid grid-cols-2 bg-blue-50 p-3 rounded mb-4 text-sm font-medium">
        <div>তারিখ: ${work.dateStart||work.date} ${(work.dateStart!==work.dateEnd && work.dateEnd) ? ' থেকে ' + work.dateEnd : ''}</div>
        <div class="text-right text-lg text-blue-700">মোট বিল: ৳${Utils.formatCurrency(work.total||0)}</div>
    </div>`;

    if(work.floors && work.floors.length) {
        html += `<h4 class="font-bold text-gray-700 mb-2 border-b pb-1">কাজের বিবরণ (তলা অনুযায়ী)</h4>`;
        work.floors.forEach(f => {
            html += `<div class="mb-3 border rounded p-2 bg-gray-50"><div class="font-bold text-indigo-800 mb-2">${f.name || 'অজ্ঞাত তলা'}</div>
                <table class="w-full text-xs text-left"><tr class="border-b bg-gray-200"><th class="p-1">বিবরণ</th><th class="p-1">মাপ</th><th class="p-1">পরিমাণ</th><th class="p-1">রেট</th><th class="p-1">মোট</th></tr>`;
            f.items.forEach(i => {
                let dims = i.mType === 'qty' ? '-' : `L:${i.lFt}'${i.lIn}" W:${i.wFt}'${i.wIn}"`;
                if(i.mType==='rft') dims = `L:${i.lFt}'${i.lIn}"`;
                html += `<tr class="border-b"><td class="p-1">${i.desc}</td><td class="p-1">${dims}</td>
                <td class="p-1">${i.qty} ${i.mType}</td><td class="p-1">৳${i.rate}</td><td class="p-1 font-semibold text-indigo-700">৳${i.total}</td></tr>`;
            });
            html += `</table></div>`;
        });
    }

    if(work.workers && work.workers.length) {
        html += `<h4 class="font-bold text-gray-700 mt-4 mb-2 border-b pb-1">লেবার/মিস্ত্রি খরচ</h4>
        <table class="w-full text-sm text-left border"><tr class="bg-gray-100 border-b"><th class="p-2">নাম</th><th class="p-2">ধরণ</th><th class="p-2 text-right">হাজিরা/রেট</th><th class="p-2 text-right">পরিশোধ</th></tr>`;
        work.workers.forEach(w => {
            html += `<tr class="border-b"><td class="p-2">${w.name}<br><span class="text-xs text-gray-500">${w.phone}</span></td>
            <td class="p-2">${w.role}</td><td class="p-2 text-right">৳${w.rate}</td><td class="p-2 text-right">৳${w.paid}</td></tr>`;
        });
        html += `</table>`;
    }

    if(work.expenses && work.expenses.length) {
        html += `<h4 class="font-bold text-gray-700 mt-4 mb-2 border-b pb-1">অতিরিক্ত এক্সট্রা খরচ</h4>
        <table class="w-full text-sm text-left border"><tr class="bg-orange-50 border-b"><th class="p-2">খরচের বিবরণ</th><th class="p-2">খাত/ধরণ</th><th class="p-2 text-right">পরিমাণ</th></tr>`;
        work.expenses.forEach(x => {
            let tName = x.type === 'malik' ? 'মালিকের খরচ' : (x.type === 'personal' ? 'ব্যক্তিগত' : 'মিস্ত্রি খরচ');
            html += `<tr class="border-b"><td class="p-2">${x.desc || 'বিবরণ নেই'}</td>
            <td class="p-2 text-gray-600 text-xs">${tName}</td><td class="p-2 text-right font-semibold text-orange-600">৳${x.amount}</td></tr>`;
        });
        html += `</table>`;
    }

    const t = work.total||0, lc = work.laborCost||0, mp = work.malikPaid||0;
    const md = work.malikDue !== undefined ? work.malikDue : (t - mp);
    const np = work.netProfit !== undefined ? work.netProfit : (t - lc);
    html += `<div class="mt-4 p-3 bg-green-50 rounded grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm border border-green-200">
        <div><span class="block text-gray-600 mb-1">মালিক দিয়েছে</span><b class="text-lg text-gray-800">৳${mp}</b></div>
        <div><span class="block text-gray-600 mb-1">লেবার খরচ</span><b class="text-red-500 text-lg">৳${lc}</b></div>
        <div><span class="block text-gray-600 mb-1">নিট লাভ</span><b class="text-green-700 text-lg">৳${np.toFixed(2)}</b></div>
        <div><span class="block text-gray-600 mb-1">মালিকের বকেয়া</span><b class="text-orange-600 text-lg">৳${md.toFixed(2)}</b></div>
    </div>`;

    document.getElementById('work-modal-content').innerHTML = html;
    modal.classList.remove('hidden');
};
