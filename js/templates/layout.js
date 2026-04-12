window.TemplateLayout = `
    <div id="app-container" class="hidden min-h-screen flex flex-col max-w-4xl mx-auto bg-white shadow-xl">
        <header class="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
            <div>
                <h1 class="text-xl md:text-2xl font-bold"><i class="fas fa-tools mr-2"></i> কন্টাক্টর হিসাব খাতা</h1>
                <p class="text-xs text-blue-200 mt-1">রিয়েল-টাইম ডাটাবেস সিস্টেম</p>
            </div>
            <div class="text-sm bg-blue-700 px-3 py-1 rounded-full border border-blue-500">
                <i class="fas fa-user-circle mr-1"></i> <span id="user-status">লগইন করা হয়েছে</span>
            </div>
        </header>

        <nav class="flex border-b bg-gray-50 overflow-x-auto">
            <button id="tab-dashboard" class="tab-btn active flex-1 py-3 px-4 text-center font-medium text-gray-600 hover:bg-gray-100 whitespace-nowrap transition">
                <i class="fas fa-chart-pie mr-1"></i> ড্যাশবোর্ড
            </button>
            <button id="tab-works" class="tab-btn flex-1 py-3 px-4 text-center font-medium text-gray-600 hover:bg-gray-100 whitespace-nowrap transition">
                <i class="fas fa-ruler-combined mr-1"></i> কাজের হিসাব
            </button>
            <button id="tab-payments" class="tab-btn flex-1 py-3 px-4 text-center font-medium text-gray-600 hover:bg-gray-100 whitespace-nowrap transition">
                <i class="fas fa-money-bill-wave mr-1"></i> লেনদেন / পেমেন্ট
            </button>
        </nav>

        <main class="flex-1 p-4 bg-gray-50 overflow-y-auto" id="main-content">
        </main>
        
        <footer class="bg-white border-t p-4 text-center text-sm text-gray-500">
            <p>নিরাপদ ক্লাউড ডাটাবেস দ্বারা পরিচালিত &copy; 2026</p>
        </footer>
    </div>
`;
