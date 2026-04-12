window.TemplateExpenseRow = (id) => `
<div class="expense-row bg-orange-50 border border-orange-100 rounded p-3 mb-2 relative" data-id="${id}">
    <button type="button" class="btn-remove-expense absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"><i class="fas fa-times pointer-events-none"></i></button>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
            <label class="text-xs text-gray-600 block">খরচের বিবরণ</label>
            <input type="text" class="w-full border rounded px-2 py-1 text-sm exp-desc" placeholder="যেমন: নাস্তা, ব্লেড">
        </div>
        <div>
            <label class="text-xs text-gray-600 block">ტাকার পরিমাণ (৳)</label>
            <input type="number" step="0.01" class="w-full border rounded px-2 py-1 text-sm exp-amount calc-trigger" placeholder="0">
        </div>
        <div>
            <label class="text-xs text-gray-600 block">খরচের ধরণ</label>
            <select class="w-full border rounded px-2 py-1 text-sm exp-type calc-trigger">
                <option value="worker">লেবার/মিস্ত্রি খরচ (নাস্তা ইত্যাদি)</option>
                <option value="malik">মালিকের অতিরিক্ত খরচ (যন্ত্রপাতি)</option>
                <option value="personal">আমার ব্যক্তিগত খরচ</option>
            </select>
        </div>
    </div>
    <div class="exp-workers-selection mt-2 pt-2 border-t border-orange-200" style="display:none;">
        <label class="text-xs text-gray-600 mb-1 block">যাদের পিছনে খরচ হয়েছে (টিক দিন):</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 exp-worker-checkboxes"></div>
    </div>
</div>
`;

window.TemplateExpensesContainer = `
<div class="border-t pt-4">
    <div class="flex justify-between items-center mb-3">
        <h4 class="font-medium text-gray-700"><i class="fas fa-wallet text-orange-500 mr-1"></i> এক্সট্রা খরচ (ব্লেড/নাস্তা/ব্যক্তিগত)</h4>
        <button type="button" id="btn-add-expense" class="text-sm bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded hover:bg-orange-100">+ খরচ যুক্ত করুন</button>
    </div>
    <div id="expenses-list-ui"></div>
</div>
`;
