window.TemplateWorkerRow = (id) => `
<div class="worker-row bg-gray-50 border border-gray-200 rounded p-3 mb-3 relative" data-id="${id}">
    <button type="button" class="btn-remove-worker absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"><i class="fas fa-times pointer-events-none"></i></button>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div><label class="text-xs text-gray-600">নাম</label><input type="text" class="w-full border rounded px-2 py-1 text-sm worker-name" placeholder="নাম"></div>
        <div><label class="text-xs text-gray-600">ফোন নম্বর</label><input type="text" class="w-full border rounded px-2 py-1 text-sm worker-phone" placeholder="০১৭..."></div>
        <div><label class="text-xs text-gray-600">ধরণ</label><select class="w-full border rounded px-2 py-1 text-sm worker-role"><option value="Mistri">মিস্ত্রি</option><option value="Helper">হেল্পার</option></select></div>
        <div><label class="text-xs text-gray-600">ঠিকানা</label><input type="text" class="w-full border rounded px-2 py-1 text-sm worker-location" placeholder="ঠিকানা"></div>
    </div>
    <div class="grid grid-cols-3 gap-3 mt-3">
        <div><label class="text-xs text-gray-600">দৈনিক রেট/হাজিরা (৳)</label>
            <div class="flex items-center gap-1"><input type="number" step="0.01" class="w-full border rounded px-2 py-1 text-sm worker-rate calc-trigger" placeholder="0"><span class="text-xs text-orange-600 font-bold whitespace-nowrap hidden worker-extra-show">+0</span></div>
        </div>
        <div><label class="text-xs text-gray-600">প্রদানকৃত টাকা (৳)</label><input type="number" class="w-full border rounded px-2 py-1 text-sm worker-paid calc-trigger" placeholder="0"></div>
        <div><label class="text-xs text-gray-600">বকেয়া (৳)</label><input type="number" class="w-full border bg-gray-100 rounded px-2 py-1 text-sm worker-due font-bold text-red-500 pointer-events-none" readonly placeholder="0"></div>
    </div>
</div>
`;
window.TemplateWorkersContainer = `
<div class="border-t pt-2">
    <div class="flex justify-between items-center mb-3">
        <h4 class="font-medium text-gray-700"><i class="fas fa-users text-teal-500 mr-1"></i> লেবার/মিস্ত্রি তালিকা</h4>
        <button type="button" id="btn-add-worker" class="text-sm bg-teal-50 text-teal-600 border border-teal-200 px-3 py-1 rounded hover:bg-teal-100">+ যুক্ত করুন</button>
    </div>
    <div id="workers-list-ui"></div>
</div>
`;
