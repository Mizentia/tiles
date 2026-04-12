window.TemplateDashboard = `
    <section id="section-dashboard" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white rounded-lg shadow p-5 border-l-4 border-indigo-500 flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500 font-semibold mb-1">মোট কাজের বিল</p>
                    <h3 class="text-2xl font-bold text-indigo-700">৳ <span id="dash-total-work">0</span></h3>
                </div>
                <div class="bg-indigo-100 p-3 rounded-full text-indigo-500">
                    <i class="fas fa-clipboard-list text-xl"></i>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow p-5 border-l-4 border-emerald-500 flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500 font-semibold mb-1">মোট প্রাপ্তি (জমা)</p>
                    <h3 class="text-2xl font-bold text-emerald-700">৳ <span id="dash-total-paid">0</span></h3>
                </div>
                <div class="bg-emerald-100 p-3 rounded-full text-emerald-500">
                    <i class="fas fa-hand-holding-usd text-xl"></i>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow p-5 border-l-4 border-rose-500 flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500 font-semibold mb-1">বর্তমান বকেয়া (পাওনা)</p>
                    <h3 class="text-2xl font-bold text-rose-700">৳ <span id="dash-total-due">0</span></h3>
                </div>
                <div class="bg-rose-100 p-3 rounded-full text-rose-500">
                    <i class="fas fa-file-invoice-dollar text-xl"></i>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-lg font-bold text-gray-700 mb-4 border-b pb-2">সাম্প্রতিক লেনদেন ও কাজ</h3>
            <div id="recent-activity-list" class="space-y-3">
                <p class="text-gray-500 text-sm italic">কোনো ডাটা নেই...</p>
            </div>
        </div>
    </section>
`;
