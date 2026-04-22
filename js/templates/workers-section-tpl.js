window.TemplateWorkersSection = `
<section id="section-workers" class="hidden space-y-5">
  <div class="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl shadow-lg p-5 text-white">
    <h2 class="text-xl font-bold mb-1"><i class="fas fa-users mr-2"></i>লোকজন ম্যানেজমেন্ট</h2>
    <p class="text-teal-100 text-sm">মিস্ত্রি ও হেল্পারদের সম্পূর্ণ তথ্য ও পাওনা-দেনার হিসাব</p>
  </div>

  <div class="bg-white rounded-xl shadow p-4 border border-teal-100">
    <h3 class="font-bold text-gray-700 mb-3"><i class="fas fa-user-plus text-teal-500 mr-1"></i>নতুন লোক যুক্ত করুন</h3>
    <form id="form-add-worker-master">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <label class="text-xs text-gray-600 font-medium">নাম *</label>
          <input type="text" id="wm-name" required placeholder="পূর্ণ নাম" class="w-full border rounded-lg px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-teal-400">
        </div>
        <div>
          <label class="text-xs text-gray-600 font-medium">ফোন নম্বর</label>
          <input type="text" id="wm-phone" placeholder="০১৭..." class="w-full border rounded-lg px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-teal-400">
        </div>
        <div>
          <label class="text-xs text-gray-600 font-medium">ধরন</label>
          <select id="wm-role" class="w-full border rounded-lg px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-teal-400">
            <option value="Mistri">মিস্ত্রি</option>
            <option value="Helper">হেল্পার</option>
          </select>
        </div>
        <div>
          <label class="text-xs text-gray-600 font-medium">ঠিকানা</label>
          <input type="text" id="wm-location" placeholder="গ্রাম/এলাকা" class="w-full border rounded-lg px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-teal-400">
        </div>
        <div>
          <label class="text-xs text-gray-600 font-medium">দৈনিক রেট (৳)</label>
          <input type="number" id="wm-daily-rate" placeholder="0" class="w-full border rounded-lg px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-teal-400">
        </div>
        <div>
          <label class="text-xs text-gray-600 font-medium">এক্সট্রা খরচ (৳)</label>
          <input type="number" id="wm-transport" placeholder="0" class="w-full border rounded-lg px-3 py-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-teal-400">
        </div>
      </div>
      <div class="mt-3 text-right">
        <button type="submit" id="btn-save-worker-master" class="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg shadow transition">
          <i class="fas fa-save mr-1"></i>সেভ করুন
        </button>
      </div>
    </form>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
    <div class="bg-white rounded-xl shadow p-4 border-l-4 border-teal-500 flex items-center justify-between">
      <div><p class="text-xs text-gray-500">মোট লোক</p><p class="text-2xl font-bold text-teal-700" id="wm-total-count">0</p></div>
      <div class="bg-teal-100 p-3 rounded-full"><i class="fas fa-users text-teal-600 text-xl"></i></div>
    </div>
    <div class="bg-white rounded-xl shadow p-4 border-l-4 border-indigo-500 flex items-center justify-between">
      <div><p class="text-xs text-gray-500">কাজ করেছে</p><p class="text-2xl font-bold text-indigo-700" id="wm-worked-count">0</p></div>
      <div class="bg-indigo-100 p-3 rounded-full"><i class="fas fa-hammer text-indigo-600 text-xl"></i></div>
    </div>
    <div class="bg-white rounded-xl shadow p-4 border-l-4 border-rose-500 flex items-center justify-between">
      <div><p class="text-xs text-gray-500">মোট বকেয়া পাওনা</p><p class="text-2xl font-bold text-rose-700">৳ <span id="wm-total-due">0</span></p></div>
      <div class="bg-rose-100 p-3 rounded-full"><i class="fas fa-money-bill-wave text-rose-600 text-xl"></i></div>
    </div>
    <div class="bg-white rounded-xl shadow p-4 border-l-4 border-emerald-500 flex items-center justify-between">
      <div><p class="text-xs text-gray-500">মোট প্রদান করা হয়েছে</p><p class="text-2xl font-bold text-emerald-700">৳ <span id="wm-total-paid">0</span></p></div>
      <div class="bg-emerald-100 p-3 rounded-full"><i class="fas fa-check-circle text-emerald-600 text-xl"></i></div>
    </div>
  </div>

  <div class="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
    <div class="p-4 bg-gray-50 border-b flex justify-between items-center flex-wrap gap-2">
      <h3 class="font-bold text-gray-700"><i class="fas fa-list text-teal-500 mr-1"></i>লোকের তালিকা</h3>
      <div class="flex gap-2 flex-wrap">
        <select id="wm-filter-role" class="text-sm border rounded px-2 py-1 outline-none">
          <option value="">সব ধরন</option>
          <option value="Mistri">মিস্ত্রি</option>
          <option value="Helper">হেল্পার</option>
        </select>
        <select id="wm-filter-work" class="text-sm border rounded px-2 py-1 outline-none">
          <option value="">সব স্ট্যাটাস</option>
          <option value="worked">✅ কাজ করেছে</option>
          <option value="idle">🕐 এখনো কাজ নেই</option>
        </select>
      </div>
    </div>
    <div id="wm-workers-list" class="divide-y divide-gray-100 min-h-[100px]">
      <p class="p-6 text-center text-gray-400 text-sm italic">কোনো লোক যুক্ত করা হয়নি।</p>
    </div>
  </div>
</section>
`;
