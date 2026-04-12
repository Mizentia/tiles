window.TemplateWorkDetailModal = `
<div id="work-detail-modal" class="fixed inset-0 bg-black bg-opacity-60 z-[100] hidden flex-col justify-center items-center p-4">
    <div class="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div class="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
            <h3 class="text-lg font-bold text-gray-700"><i class="fas fa-file-invoice mr-2 text-blue-500"></i> কাজের বিস্তারিত তথ্য</h3>
            <button id="btn-close-work-modal" class="text-gray-500 hover:text-red-500 transition"><i class="fas fa-times text-xl"></i></button>
        </div>
        <div class="p-4 overflow-y-auto flex-1" id="work-modal-content"></div>
        <div class="p-4 border-t bg-gray-50 rounded-b-lg text-right">
            <button id="btn-close-work-modal-2" class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-700 font-medium transition">বন্ধ করুন</button>
        </div>
    </div>
</div>
`;
