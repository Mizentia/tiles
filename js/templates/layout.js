window.TemplateLayout = `
    <div id="app-container" class="hidden min-h-screen flex flex-col max-w-4xl mx-auto bg-white shadow-xl">
        <header class="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-4 shadow-md flex justify-between items-center">
            <div>
                <h1 class="text-xl md:text-2xl font-bold"><i class="fas fa-layer-group mr-2"></i>কন্টাক্টর হিসাব খাতা</h1>
                <p class="text-xs text-blue-200 mt-1">রিয়েল-টাইম ক্লাউড ডাটাবেস সিস্টেম</p>
            </div>
            <div class="text-sm bg-blue-800 px-3 py-1 rounded-full border border-blue-500">
                <i class="fas fa-user-circle mr-1"></i> <span id="user-status">লগইন</span>
            </div>
        </header>

        <nav class="flex border-b bg-white overflow-x-auto sticky top-0 z-10 shadow-sm">
            <button id="tab-dashboard" class="tab-btn active flex-1 py-3 px-2 text-center font-medium text-gray-500 hover:text-blue-600 whitespace-nowrap transition text-xs md:text-sm border-b-2 border-transparent">
                <i class="fas fa-chart-pie block md:inline mb-1 md:mb-0 md:mr-1 text-base"></i><span>ড্যাশবোর্ড</span>
            </button>
            <button id="tab-quotation" class="tab-btn flex-1 py-3 px-2 text-center font-medium text-gray-500 hover:text-violet-600 whitespace-nowrap transition text-xs md:text-sm border-b-2 border-transparent">
                <i class="fas fa-file-contract block md:inline mb-1 md:mb-0 md:mr-1 text-base"></i><span>দরপত্র</span>
            </button>
            <button id="tab-works" class="tab-btn flex-1 py-3 px-2 text-center font-medium text-gray-500 hover:text-blue-600 whitespace-nowrap transition text-xs md:text-sm border-b-2 border-transparent">
                <i class="fas fa-hammer block md:inline mb-1 md:mb-0 md:mr-1 text-base"></i><span>কাজের হিসাব</span>
            </button>
            <button id="tab-workers" class="tab-btn flex-1 py-3 px-2 text-center font-medium text-gray-500 hover:text-teal-600 whitespace-nowrap transition text-xs md:text-sm border-b-2 border-transparent">
                <i class="fas fa-users block md:inline mb-1 md:mb-0 md:mr-1 text-base"></i><span>লোকজন</span>
            </button>
            <button id="tab-payments" class="tab-btn flex-1 py-3 px-2 text-center font-medium text-gray-500 hover:text-emerald-600 whitespace-nowrap transition text-xs md:text-sm border-b-2 border-transparent">
                <i class="fas fa-money-bill-wave block md:inline mb-1 md:mb-0 md:mr-1 text-base"></i><span>পেমেন্ট</span>
            </button>
        </nav>

        <main class="flex-1 p-4 bg-gray-50 overflow-y-auto" id="main-content">
        </main>
        
        <footer class="bg-white border-t p-3 text-center text-xs text-gray-400">
            <p>নিরাপদ ক্লাউড ডাটাবেস &copy; 2026</p>
        </footer>
    </div>
`;

