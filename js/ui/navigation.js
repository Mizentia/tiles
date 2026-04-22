window.UINavigation = {
    tabs: ['dashboard', 'quotation', 'works', 'workers', 'payments'],
    setup: function () {
        this.tabs.forEach(tab => {
            const el = document.getElementById(`tab-${tab}`);
            if (el) {
                el.addEventListener('click', () => this.switchTo(tab));
            }
        });
    },
    switchTo: function(tab) {
        this.tabs.forEach(t => {
            const sec = document.getElementById(`section-${t}`);
            const tBtn = document.getElementById(`tab-${t}`);
            if (sec) sec.classList.add('hidden');
            if (tBtn) tBtn.classList.remove('active');
        });
        const target = document.getElementById(`section-${tab}`);
        if (target) target.classList.remove('hidden');
        const tBtn = document.getElementById(`tab-${tab}`);
        if (tBtn) tBtn.classList.add('active');
    }
};
