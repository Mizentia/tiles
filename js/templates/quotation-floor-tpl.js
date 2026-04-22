window.QtFloorBlock = (fId) => `
<div class="qt-floor bg-violet-50 border border-violet-200 rounded-xl p-4 relative" data-fid="${fId}">
  <button type="button" class="btn-qt-rm-floor absolute top-3 right-3 text-red-400 hover:text-red-600 transition">
    <i class="fas fa-times pointer-events-none"></i>
  </button>
  <div class="mb-3">
    <input type="text" class="qt-floor-name border rounded-lg px-3 py-1 font-semibold text-violet-800 w-full md:w-auto outline-none focus:ring-2 focus:ring-violet-300" placeholder="তলার নাম (যেমন: গ্রাউন্ড ফ্লোর)">
  </div>
  <div class="qt-items-list space-y-2" id="qt-items-${fId}"></div>
  <button type="button" class="btn-qt-add-item mt-2 text-xs bg-white border border-violet-300 text-violet-600 px-3 py-1 rounded-lg hover:bg-violet-100 transition" data-fid="${fId}">
    + কাজের জায়গা যুক্ত করুন
  </button>
  <div class="mt-3 pt-2 border-t border-violet-200 flex justify-between items-center">
    <span class="text-xs text-gray-500">এই তলার মোট</span>
    <span class="text-sm font-bold text-violet-700 qt-floor-total">৳ 0</span>
  </div>
</div>
`;

window.QtItemRow = (fId, iId) => `
<div class="qt-item bg-white border border-gray-200 rounded-lg p-3 relative" data-fid="${fId}" data-iid="${iId}">
  <button type="button" class="btn-qt-rm-item absolute top-2 right-2 text-red-300 hover:text-red-500 text-xs transition">
    <i class="fas fa-trash pointer-events-none"></i>
  </button>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
    <div class="col-span-2 md:col-span-2">
      <input type="text" class="qt-item-desc w-full border rounded px-2 py-1 text-sm outline-none" placeholder="বিবরণ (যেমন: বাথরুম ওয়াল)">
    </div>
    <div>
      <select class="qt-item-type w-full border rounded px-2 py-1 text-sm outline-none qt-calc-trigger">
        <option value="sqft">SqFt (লম্বা × চওড়া)</option>
        <option value="rft">RFt (শুধু লম্বা)</option>
        <option value="qty">Qty (সরাসরি পরিমাণ)</option>
      </select>
    </div>
    <div>
      <input type="number" step="0.01" class="qt-item-rate w-full border rounded px-2 py-1 text-sm outline-none qt-calc-trigger" placeholder="রেট (৳)">
    </div>
  </div>
  <div class="grid grid-cols-4 gap-2 items-center qt-dim-area">
    <input type="number" class="qt-l-ft border rounded px-2 py-1 text-xs qt-calc-trigger" placeholder="L Ft">
    <input type="number" class="qt-l-in border rounded px-2 py-1 text-xs qt-calc-trigger" placeholder="L In">
    <input type="number" class="qt-w-ft border rounded px-2 py-1 text-xs qt-calc-trigger" placeholder="W Ft">
    <input type="number" class="qt-w-in border rounded px-2 py-1 text-xs qt-calc-trigger" placeholder="W In">
  </div>
  <div class="flex justify-between items-center mt-2 pt-1 border-t border-gray-100">
    <div class="flex items-center gap-1 text-xs text-gray-500">
      পরিমাণ: <input type="number" step="0.01" class="qt-item-qty w-16 border rounded px-1 py-1 ml-1 qt-calc-trigger" placeholder="0">
    </div>
    <span class="text-sm font-bold text-indigo-600">= ৳ <span class="qt-item-total">0.00</span></span>
  </div>
</div>
`;
