window.TemplateWorks = `
<section id="section-works" class="hidden space-y-6">
    <div class="bg-white rounded-lg shadow p-4 border border-gray-200">
        <h3 class="text-lg font-bold text-gray-700 mb-4"><i class="fas fa-calculator text-blue-500 mr-2"></i>অ্যাডভান্সড ক্যালকুলেটর ও বিলিং</h3>
        <form id="form-add-work" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-medium text-gray-700">তারিখ (খালি রাখলে আজকের তারিখ প্রযোজ্য)</label>
                    <input type="date" id="work-date" class="w-full border rounded px-3 py-2 focus:ring-blue-500 outline-none">
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-700">কাজের ধরন / বিবরণ</label>
                    <input type="text" id="work-type" placeholder="যেমন: নিচ তলার ওয়াল" class="w-full border rounded px-3 py-2 mb-1 outline-none">
                    <div class="flex flex-wrap gap-1" id="quick-types">
                        ${['বাথরুমের ফ্লোর', 'বাথরুমের ওয়াল', 'মেইন ফ্লোর', 'স্কাটিং', 'বাথরুমের ভিট', 'থাই ভিট'].map(t => `<button type="button" class="btn-quick-type text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border rounded px-2 py-1">${t}</button>`).join('')}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-3">
                <div>
                    <label class="text-sm font-medium text-gray-700">হিসাবের মাধ্যম</label>
                    <select id="measure-type" class="w-full border rounded px-3 py-2 outline-none">
                        <option value="sqft">Square Feet (SqFt)</option>
                        <option value="rft">Running Feet (RFt)</option>
                        <option value="qty">Manual Quantity</option>
                    </select>
                </div>
                <div id="dim-l-group">
                    <label class="text-sm font-medium text-gray-700">লম্বা (Ft - In)</label>
                    <div class="flex gap-2">
                        <input type="number" id="dim-l-ft" placeholder="Ft" class="w-1/2 border rounded p-2">
                        <input type="number" id="dim-l-in" placeholder="In" class="w-1/2 border rounded p-2">
                    </div>
                </div>
                <div id="dim-w-group">
                    <label class="text-sm font-medium text-gray-700">চওড়া (Ft - In)</label>
                    <div class="flex gap-2">
                        <input type="number" id="dim-w-ft" placeholder="Ft" class="w-1/2 border rounded p-2">
                        <input type="number" id="dim-w-in" placeholder="In" class="w-1/2 border rounded p-2">
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-3">
                <div>
                    <label class="text-sm font-medium text-gray-700">মোট পরিমাণ</label>
                    <input type="number" step="0.01" id="work-qty" placeholder="SqFt বা RFt" class="w-full border rounded px-3 py-2 mb-1">
                    <div class="flex flex-wrap gap-1">
                        ${[500, 1000, 5000, 10000, 20000].map(r => `<button type="button" class="btn-quick-qty text-xs bg-gray-100 border rounded px-2 py-1">${r}</button>`).join('')}
                    </div>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-700">রেট (প্রতি ফিট)</label>
                    <input type="number" step="0.01" id="work-rate" placeholder="রেট" class="w-full border rounded px-3 py-2 mb-1">
                    <div class="flex flex-wrap gap-1">
                        ${[15, 20, 25, 30, 35].map(r => `<button type="button" class="btn-quick-rate text-xs bg-emerald-50 text-emerald-700 border rounded px-2 py-1">${r}</button>`).join('')}
                    </div>
                </div>
            </div>

            <div class="bg-blue-50 p-3 rounded flex justify-between items-center border border-blue-100">
                <span class="font-semibold text-gray-700">এই কাজের মোট বিল:</span>
                <span class="text-xl font-bold text-blue-700">৳ <span id="work-calc-total">0.00</span></span>
            </div>
            <div class="text-right">
                <button type="submit" id="btn-save-work" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow"><i class="fas fa-save mr-1"></i> সেভ করুন</button>
            </div>
        </form>
    </div>

    <!-- Works List -->
    <div class="bg-white rounded-lg shadow overflow-hidden border border-gray-200 mt-6">
        <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h3 class="font-bold text-gray-700">কাজের হিস্টরি</h3>
            <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full font-medium">মোট: ৳ <span id="list-total-work">0</span></span>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-100 text-gray-600 text-sm">
                        <th class="p-3 border-b">তারিখ</th>
                        <th class="p-3 border-b">বিবরণ ও হিসাব</th>
                        <th class="p-3 border-b text-center">রেট ও পরিমাণ</th>
                        <th class="p-3 border-b text-right">মোট (৳)</th>
                        <th class="p-3 border-b text-center">অ্যাকশন</th>
                    </tr>
                </thead>
                <tbody id="works-table-body" class="text-sm divide-y divide-gray-200"></tbody>
            </table>
        </div>
    </div>
</section>
`;
