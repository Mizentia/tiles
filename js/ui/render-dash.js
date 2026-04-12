window.RenderDash = function() {
    const totalWork = AppState.worksData.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
    const totalPaid = AppState.paymentsData.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const totalDue = totalWork - totalPaid;

    document.getElementById('dash-total-work').innerText = Utils.formatCurrency(totalWork);
    document.getElementById('dash-total-paid').innerText = Utils.formatCurrency(totalPaid);
    document.getElementById('dash-total-due').innerText = Utils.formatCurrency(totalDue);
    
    const dueEl = document.getElementById('dash-total-due');
    if (totalDue > 0) dueEl.parentElement.className = "text-2xl font-bold text-rose-700";
    else if (totalDue < 0) dueEl.parentElement.className = "text-2xl font-bold text-emerald-700";
    else dueEl.parentElement.className = "text-2xl font-bold text-gray-700";

    const recentList = document.getElementById('recent-activity-list');
    recentList.innerHTML = '';
    
    const combined = [
        ...AppState.worksData.map(w => ({ type: 'work', date: w.date, desc: `কাজ: ${w.workType}`, amount: w.total, id: w.id })),
        ...AppState.paymentsData.map(p => ({ type: 'payment', date: p.date, desc: `পেমেন্ট প্রাপ্তি ${p.note ? '('+p.note+')' : ''}`, amount: p.amount, id: p.id }))
    ];
    
    combined.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentItems = combined.slice(0, 5);

    if (recentItems.length === 0) {
        recentList.innerHTML = '<p class="text-gray-500 text-sm italic">এখনো কোনো ডাটা এন্ট্রি করা হয়নি...</p>';
        return;
    }

    recentItems.forEach(item => {
        const isWork = item.type === 'work';
        const icon = isWork ? '<i class="fas fa-hammer text-indigo-500"></i>' : '<i class="fas fa-money-bill text-emerald-500"></i>';
        const amtColor = isWork ? 'text-indigo-600' : 'text-emerald-600';
        const sign = isWork ? '+' : '-';
        
        recentList.innerHTML += `
            <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded border-b last:border-0">
                <div class="flex items-center gap-3">
                    <div class="bg-gray-100 p-2 rounded-full w-8 h-8 flex items-center justify-center">${icon}</div>
                    <div>
                        <p class="text-sm font-medium text-gray-800">${item.desc}</p>
                        <p class="text-xs text-gray-500">${Utils.formatDate(item.date)}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-sm font-bold ${amtColor}">${sign} ৳ ${Utils.formatCurrency(item.amount)}</p>
                </div>
            </div>
        `;
    });
};
