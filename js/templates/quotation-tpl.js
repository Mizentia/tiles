window.TemplateQuotation = `
<section id="section-quotation" class="hidden space-y-5">
  <div class="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl shadow-lg p-5 text-white">
    <h2 class="text-xl font-bold mb-1"><i class="fas fa-file-contract mr-2"></i>নতুন কাজের দরপত্র</h2>
    <p class="text-violet-200 text-sm">বিল্ডিং মেপে মালিকের সামনে উপস্থাপনের জন্য সম্পূর্ণ কোটেশন তৈরি করুন</p>
  </div>

  <div class="bg-white rounded-xl shadow p-4 border border-violet-100">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 mb-4">
      <div>
        <label class="text-sm font-semibold text-gray-700">বিল্ডিং/প্রজেক্টের নাম</label>
        <input type="text" id="qt-project-name" placeholder="যেমন: রহিম সাহেবের বাড়ি, ৩য় তলা" class="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-violet-400">
      </div>
      <div>
        <label class="text-sm font-semibold text-gray-700">তারিখ</label>
        <input type="date" id="qt-date" class="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-violet-400">
      </div>
    </div>

    <div id="qt-floors-list" class="space-y-4"></div>

    <button type="button" id="btn-qt-add-floor" class="mt-3 w-full border-2 border-dashed border-violet-300 text-violet-600 rounded-lg py-2 hover:bg-violet-50 transition font-medium">
      <i class="fas fa-plus mr-1"></i> নতুন তলা / এলাকা যুক্ত করুন
    </button>
  </div>

  <div class="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl shadow p-4 border border-violet-200">
    <h3 class="font-bold text-gray-700 mb-3"><i class="fas fa-calculator text-violet-600 mr-1"></i>সামগ্রিক হিসাব সারাংশ</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="bg-white rounded-lg p-3 shadow-sm text-center border border-violet-100">
        <p class="text-xs text-gray-500">মোট SqFt</p>
        <p class="text-lg font-bold text-violet-700" id="qt-total-sqft">0</p>
      </div>
      <div class="bg-white rounded-lg p-3 shadow-sm text-center border border-indigo-100">
        <p class="text-xs text-gray-500">মোট RFt</p>
        <p class="text-lg font-bold text-indigo-700" id="qt-total-rft">0</p>
      </div>
      <div class="bg-white rounded-lg p-3 shadow-sm text-center border border-emerald-100">
        <p class="text-xs text-gray-500">মোট পিস/Qty</p>
        <p class="text-lg font-bold text-emerald-700" id="qt-total-qty">0</p>
      </div>
      <div class="bg-white rounded-lg p-3 shadow-sm text-center border border-rose-100">
        <p class="text-xs text-gray-500">মোট বিল</p>
        <p class="text-lg font-bold text-rose-700" id="qt-grand-total">৳ 0</p>
      </div>
    </div>
  </div>

  <div class="flex gap-3 pb-4">
    <button type="button" id="btn-qt-save" class="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl shadow transition">
      <i class="fas fa-save mr-2"></i>কোটেশন সেভ করুন
    </button>
    <button type="button" id="btn-qt-clear" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-5 rounded-xl transition">
      <i class="fas fa-redo mr-1"></i>ক্লিয়ার
    </button>
  </div>

  <div class="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
    <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
      <h3 class="font-bold text-gray-700"><i class="fas fa-history text-violet-500 mr-1"></i>সংরক্ষিত কোটেশন</h3>
      <span class="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full font-medium" id="qt-count-badge">মোট: 0টি</span>
    </div>
    <div id="qt-saved-list" class="divide-y divide-gray-100">
      <p class="p-4 text-center text-gray-400 text-sm italic">কোনো কোটেশন সংরক্ষিত নেই।</p>
    </div>
  </div>
</section>
`;
