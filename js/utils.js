window.Utils = {
    formatCurrency: function(amount) {
        return Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 2 });
    },
    formatDate: function(dateString) {
        if (!dateString) return '';
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('bn-BD', options);
    },
    toastTimeout: null,
    showToast: function(msg, type = "success") {
        const toast = document.getElementById('toast');
        const icon = document.getElementById('toast-icon');
        const toastMsg = document.getElementById('toast-msg');
        
        toastMsg.innerText = msg;
        if (type === "error") icon.className = "fas fa-exclamation-circle text-red-400 mr-2";
        else if (type === "info") icon.className = "fas fa-info-circle text-blue-400 mr-2";
        else icon.className = "fas fa-check-circle text-green-400 mr-2";

        toast.classList.remove('translate-y-20', 'opacity-0');
        clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
    }
};
