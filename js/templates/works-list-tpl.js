window.TemplateWorksList = `
<div class="bg-white rounded-lg shadow overflow-hidden border border-gray-200 mt-6">
    <div class="p-4 bg-gray-50 border-b flex justify-between items-center cursor-pointer" onclick="document.getElementById('works-detail-summary').classList.toggle('hidden')">
        <h3 class="font-bold text-gray-700">কাজের বিস্তারিত হিস্টরি <i class="fas fa-chevron-down text-xs ml-1 text-gray-400"></i></h3>
        <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full font-medium">মোট বিল: ৳ <span id="list-total-work">0</span></span>
    </div>
    <div id="works-detail-summary" class="p-4 bg-blue-50 border-b border-blue-100 hidden text-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h4 class="font-bold text-gray-700 mb-2 border-b border-gray-200 pb-1">কাজের পরিমাপ</h4>
                <ul class="space-y-1 text-gray-600">
                    <li class="flex justify-between"><span>মোট স্কয়ার ফিট (Sq.Ft):</span> <span class="font-medium" id="det-sqft">0</span></li>
                    <li class="flex justify-between"><span>মোট রানিং ফিট (R.Ft):</span> <span class="font-medium" id="det-rft">0</span></li>
                    <li class="flex justify-between border-t border-gray-200 pt-1 text-indigo-700 font-bold"><span>সর্বমোট ফিট (Sq.Ft + R.Ft):</span> <span id="det-total-ft">0</span></li>
                    <li class="flex justify-between mt-2"><span>মোট পিস (Piece):</span> <span class="font-medium" id="det-piece">0</span></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold text-gray-700 mb-2 border-b border-gray-200 pb-1">বিলের হিসাব</h4>
                <ul class="space-y-1 text-gray-600">
                    <li class="flex justify-between"><span>স্কয়ার ফিট বিল:</span> <span class="font-medium text-green-700">৳ <span id="det-sqft-price">0</span></span></li>
                    <li class="flex justify-between"><span>রানিং ফিট বিল:</span> <span class="font-medium text-green-700">৳ <span id="det-rft-price">0</span></span></li>
                    <li class="flex justify-between"><span>পিস বিল:</span> <span class="font-medium text-green-700">৳ <span id="det-piece-price">0</span></span></li>
                    <li class="flex justify-between border-t border-gray-200 pt-1 font-bold text-indigo-700"><span>সর্বমোট কাজের বিল:</span> <span>৳ <span id="det-total-price">0</span></span></li>
                </ul>
            </div>
        </div>
        <div class="mt-3 text-xs text-gray-500 italic text-center">
            * উপরে দেখানো হিসাবটি আপনার সমস্ত কাজের গাণিতিক যোগফল। মালিককে কাজের ধারণা দিতে এই তথ্য ব্যবহার করতে পারেন।
        </div>
    </div>
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-gray-100 text-gray-600 text-sm">
                    <th class="p-3 border-b">তারিখ</th>
                    <th class="p-3 border-b">সারসংক্ষেপ</th>
                    <th class="p-3 border-b text-center">লেবার খরচ</th>
                    <th class="p-3 border-b text-right">মোট কাজ (৳)</th>
                    <th class="p-3 border-b text-center">অ্যাকশন</th>
                </tr>
            </thead>
            <tbody id="works-table-body" class="text-sm divide-y divide-gray-200"></tbody>
        </table>
    </div>
</div>
`;
