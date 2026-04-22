window.WorkerCard = (w, hasWork) => {
  const due       = w.totalDue    || 0;
  const paid      = w.totalPaid   || 0;
  const earned    = w.totalEarned || 0;
  const days      = w.daysWorked  || 0;
  const extra     = w.totalExtra  || 0;
  const dueColor  = due > 0 ? 'text-rose-600' : 'text-emerald-600';
  const roleLabel = w.role === 'Helper' ? 'হেল্পার' : 'মিস্ত্রি';
  const roleBg    = w.role === 'Helper' ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700';

  const workBadge = hasWork
    ? `<span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium"><i class="fas fa-check-circle mr-1"></i>${days} দিন কাজ</span>`
    : `<span class="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full"><i class="fas fa-clock mr-1"></i>এখনো কাজ নেই</span>`;

  const borderClass = hasWork ? 'border-l-4 border-teal-400' : 'border-l-4 border-gray-200 opacity-80';

  // Last 5 entries, newest first
  const history = (w.workHistory || []).slice().reverse().slice(0, 5);
  const historyHtml = history.length ? `
    <div class="mt-3 border-t pt-2">
      <p class="text-xs font-semibold text-gray-500 mb-1"><i class="fas fa-history mr-1 text-indigo-400"></i>সর্বশেষ কাজের ইতিহাস</p>
      <div class="space-y-1">
        ${history.map(h => `
        <div class="grid grid-cols-4 gap-1 text-xs bg-gray-50 px-2 py-1 rounded border">
          <span class="text-gray-500 font-medium">${h.date}</span>
          <span class="text-gray-700">রেট: ৳${(h.rate||0)}${h.extra > 0 ? ` <span class="text-orange-500">+${h.extra.toFixed(0)}</span>` : ''}</span>
          <span class="text-emerald-600">দিয়েছি: ৳${(h.paid||0)}</span>
          <span class="${h.due > 0 ? 'text-rose-600 font-semibold' : 'text-gray-400'}">বকেয়া: ৳${(h.due||0).toFixed(0)}</span>
        </div>`).join('')}
      </div>
    </div>` : '';

  return `
<div class="p-4 hover:bg-gray-50 transition ${borderClass}" data-wid="${w.id}">
  <div class="flex items-start justify-between gap-3">
    <div class="flex items-center gap-3">
      <div class="bg-teal-100 text-teal-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
        ${(w.name||'?').charAt(0).toUpperCase()}
      </div>
      <div>
        <p class="font-semibold text-gray-800">${w.name||'নাম নেই'}</p>
        <div class="flex items-center flex-wrap gap-2 mt-1">
          <span class="text-xs ${roleBg} px-2 py-0.5 rounded-full font-medium">${roleLabel}</span>
          ${workBadge}
          ${w.phone ? `<a href="tel:${w.phone}" class="text-xs text-blue-600 hover:underline"><i class="fas fa-phone-alt mr-1"></i>${w.phone}</a>` : ''}
          ${w.location ? `<span class="text-xs text-gray-400"><i class="fas fa-map-marker-alt mr-1"></i>${w.location}</span>` : ''}
        </div>
      </div>
    </div>
    <div class="text-right flex-shrink-0">
      <p class="text-xs text-gray-400">বকেয়া পাওনা</p>
      <p class="font-bold text-lg ${dueColor}">৳ ${Utils.formatCurrency(due)}</p>
    </div>
  </div>
  <div class="grid grid-cols-4 gap-2 mt-3 text-center text-xs">
    <div class="bg-gray-50 rounded p-2 border">
      <p class="text-gray-400">দৈনিক রেট</p>
      <p class="font-semibold text-gray-700">৳ ${Utils.formatCurrency(w.dailyRate||0)}</p>
    </div>
    <div class="bg-blue-50 rounded p-2 border border-blue-100">
      <p class="text-gray-400">মোট আয়</p>
      <p class="font-semibold text-blue-700">৳ ${Utils.formatCurrency(earned)}</p>
    </div>
    <div class="bg-emerald-50 rounded p-2 border border-emerald-100">
      <p class="text-gray-400">মোট প্রদান</p>
      <p class="font-semibold text-emerald-700">৳ ${Utils.formatCurrency(paid)}</p>
    </div>
    <div class="bg-orange-50 rounded p-2 border border-orange-100">
      <p class="text-gray-400">এক্সট্রা খরচ</p>
      <p class="font-semibold text-orange-600">৳ ${Utils.formatCurrency(extra)}</p>
    </div>
  </div>
  ${historyHtml}
  <div class="mt-3 flex gap-2 justify-end">
    <button data-id="${w.id}" class="btn-edit-worker-master text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg transition">
      <i class="fas fa-edit pointer-events-none mr-1"></i>এডিট
    </button>
    <button data-id="${w.id}" class="btn-delete-worker-master text-xs bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1 rounded-lg transition">
      <i class="fas fa-trash pointer-events-none mr-1"></i>মুছুন
    </button>
  </div>
</div>`;
};
