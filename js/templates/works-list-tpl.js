window.TemplateWorksList = `
<div class="bg-white rounded-lg shadow overflow-hidden border border-gray-200 mt-6">
    <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
        <h3 class="font-bold text-gray-700">কাজের বিস্তারিত হিস্টরি</h3>
        <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full font-medium">মোট বিল: ৳ <span id="list-total-work">0</span></span>
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
