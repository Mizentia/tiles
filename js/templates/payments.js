window.TemplatePayments = `
    <section id="section-payments" class="hidden space-y-6">
        <div class="bg-white rounded-lg shadow p-4 border border-gray-200">
            <h3 class="text-lg font-bold text-gray-700 mb-4"><i class="fas fa-hand-holding-usd text-emerald-500 mr-2"></i>মালিকের দেওয়া টাকা এন্ট্রি করুন</h3>
            <form id="form-add-payment" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">তারিখ</label>
                    <input type="date" id="pay-date" required class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">টাকার পরিমাণ</label>
                    <input type="number" id="pay-amount" placeholder="যেমন: 50000" required class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">নোট / মাধ্যম</label>
                    <input type="text" id="pay-note" placeholder="নগদ বা ব্যাংক" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                </div>
                <div class="md:col-span-3 text-right">
                    <button type="submit" id="btn-save-payment" class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded transition shadow-sm">
                        <i class="fas fa-save mr-1"></i> এন্ট্রি করুন
                    </button>
                </div>
            </form>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <div class="p-4 bg-gray-50 border-b flex flex-col md:flex-row justify-between items-center gap-3">
                <h3 class="font-bold text-gray-700">লেনদেনের রিপোর্ট</h3>
                <div class="flex items-center space-x-2 text-sm bg-white p-1 rounded border">
                    <span class="text-gray-500 px-2">তারিখ ফিল্টার:</span>
                    <input type="date" id="filter-start" class="border-none outline-none text-gray-700 bg-transparent">
                    <span class="text-gray-400">হতে</span>
                    <input type="date" id="filter-end" class="border-none outline-none text-gray-700 bg-transparent">
                    <button id="btn-clear-filter" class="text-red-500 hover:text-red-700 px-2" title="ফিল্টার মুছুন"><i class="fas fa-times"></i></button>
                </div>
            </div>
            
            <div class="p-3 bg-emerald-50 flex justify-between items-center border-b border-emerald-100">
                <span class="text-sm font-medium text-emerald-800">নির্বাচিত সময়ের মোট প্রাপ্তি:</span>
                <span class="font-bold text-emerald-700 text-lg">৳ <span id="filtered-total-paid">0</span></span>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-gray-600 text-sm">
                            <th class="p-3 border-b">তারিখ</th>
                            <th class="p-3 border-b">টাকার পরিমাণ (৳)</th>
                            <th class="p-3 border-b">নোট</th>
                            <th class="p-3 border-b text-center">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody id="payments-table-body" class="text-sm divide-y divide-gray-200"></tbody>
                </table>
            </div>
        </div>
    </section>
`;
