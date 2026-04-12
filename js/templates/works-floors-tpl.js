window.TemplateFloorItem = (floorId, itemId) => `
<div class="floor-item bg-white border border-gray-100 shadow-sm rounded p-2 mb-2 relative" data-floor="${floorId}" data-item="${itemId}">
    <button type="button" class="btn-remove-item absolute top-1 right-1 text-red-400 hover:text-red-600 text-xs"><i class="fas fa-trash pointer-events-none"></i></button>
    <div class="grid grid-cols-2 md:grid-cols-6 gap-2">
        <div class="col-span-2 md:col-span-2"><input type="text" class="w-full border rounded px-2 py-1 text-xs item-desc" placeholder="কাজের বিবরণ (যেমন: বাথরুম ওয়াল)"></div>
        <div>
            <select class="w-full border rounded px-2 py-1 text-xs item-measure-type">
                <option value="sqft">SqFt</option><option value="rft">RFt</option><option value="qty">Qty</option>
            </select>
        </div>
        <div class="col-span-3 md:col-span-3 flex gap-1 item-dimensions">
            <input type="number" class="w-1/4 border rounded px-1 text-xs item-l-ft calc-trigger" placeholder="L Ft">
            <input type="number" class="w-1/4 border rounded px-1 text-xs item-l-in calc-trigger" placeholder="L In">
            <input type="number" class="w-1/4 border rounded px-1 text-xs item-w-ft calc-trigger" placeholder="W Ft">
            <input type="number" class="w-1/4 border rounded px-1 text-xs item-w-in calc-trigger" placeholder="W In">
        </div>
    </div>
    <div class="flex justify-end gap-2 mt-2 border-t pt-1">
        <div class="flex items-center text-xs w-24">পরিমাণ: <input type="number" step="0.01" class="w-16 border rounded px-1 py-1 item-qty calc-trigger ml-1" placeholder="0"></div>
        <div class="flex items-center text-xs w-24">রেট: <input type="number" step="0.01" class="w-16 border rounded px-1 py-1 item-rate calc-trigger ml-1" placeholder="0"></div>
        <div class="flex items-center text-xs font-bold text-indigo-600 w-24 justify-end">= ৳<span class="item-total ml-1">0.00</span></div>
    </div>
</div>
`;
window.TemplateFloorBlock = (floorId) => `
<div class="floor-block bg-indigo-50 border border-indigo-100 rounded p-3 mb-4 relative" data-id="${floorId}">
    <button type="button" class="btn-remove-floor absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"><i class="fas fa-times pointer-events-none"></i></button>
    <div class="mb-3"><input type="text" class="border rounded px-3 py-1 font-semibold text-gray-700 floor-name" placeholder="তলার নাম (যেমন: নিচ তলা)"></div>
    <div class="items-container pl-2 border-l-2 border-indigo-200" id="items-${floorId}"></div>
    <div class="mt-2 text-right"><button type="button" class="btn-add-item text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200" data-floor="${floorId}">+ কাজের জায়গা</button></div>
</div>
`;
window.TemplateFloorsContainer = `
<div class="border-t pt-4">
    <div class="flex justify-between items-center mb-3">
        <h4 class="font-medium text-gray-700"><i class="fas fa-building text-indigo-500 mr-1"></i> একাধিক তলা ও পরিমাপ</h4>
        <button type="button" id="btn-add-floor" class="text-sm bg-indigo-50 text-indigo-600 border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-100">+ তলা যুক্ত করুন</button>
    </div>
    <div id="floors-list-ui"></div>
</div>
`;
