window.TemplateWorksBase = `
<section id="section-works" class="hidden space-y-6">
    <div class="bg-white rounded-lg shadow p-4 border border-gray-200">
        <h3 class="text-lg font-bold text-gray-700 mb-4"><i class="fas fa-hammer text-blue-500 mr-2"></i>আধুনিক কাজের বিলিং ও হিসাব</h3>
        <form id="form-add-work" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-3">
                <div>
                    <label class="text-sm font-medium text-gray-700">কাজ শুরুর তারিখ</label>
                    <input type="date" id="work-start-date" class="w-full border rounded px-3 py-2 outline-none">
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-700">শেষের তারিখ (একদিনের হলে একই রাখুন)</label>
                    <input type="date" id="work-end-date" class="w-full border rounded px-3 py-2 outline-none">
                </div>
            </div>

            <div id="works-workers-container"></div>
            <div id="works-floors-container"></div>
            <div id="works-expenses-container"></div>
            
            <div class="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label class="text-sm font-medium text-gray-700">মালিকের থেকে ক্যাশ প্রাপ্ত টাকা (অ্যডভান্স/বুকিং)</label>
                  <input type="number" id="malik-received" placeholder="৳" class="w-full border rounded px-3 py-2">
               </div>
            </div>

            <div class="bg-blue-50 p-3 rounded border border-blue-100 flex flex-col md:flex-row justify-between gap-4 mt-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm w-full">
                    <div class="flex flex-col"><span class="text-xs text-gray-500">মোট কাজের বিল</span><b class="text-blue-700" id="calc-grand-total">৳ 0</b></div>
                    <div class="flex flex-col"><span class="text-xs text-gray-500">লেবার খরচ</span><b class="text-red-600" id="calc-labor-cost">৳ 0</b></div>
                    <div class="flex flex-col"><span class="text-xs text-gray-500">মালিকের কাছে বকেয়া</span><b class="text-orange-600" id="calc-malik-due">৳ 0</b></div>
                    <div class="flex flex-col"><span class="text-xs text-gray-500">লাভ/ক্যাশ</span><b class="text-green-700" id="calc-profit">৳ 0</b></div>
                </div>
                <div class="w-full md:w-auto text-right flex items-end justify-end gap-2">
                    <button type="button" id="btn-cancel-edit" class="hidden bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded shadow whitespace-nowrap transition"><i class="fas fa-times mr-1"></i> বাতিল</button>
                    <button type="submit" id="btn-save-work" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow whitespace-nowrap transition"><i class="fas fa-save mr-1"></i> সেভ করুন</button>
                </div>
            </div>
        </form>
    </div>
    <div id="works-list-container"></div>
</section>
`;
