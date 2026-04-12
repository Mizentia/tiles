window.UINavigation = {
    setup: function() {
        const tabs = ['dashboard', 'works', 'payments'];
        tabs.forEach(tab => {
            const el = document.getElementById(`tab-${tab}`);
            if(el) {
                el.addEventListener('click', () => {
                    tabs.forEach(t => {
                        const sec = document.getElementById(`section-${t}`);
                        const tBtn = document.getElementById(`tab-${t}`);
                        if(sec) sec.classList.add('hidden');
                        if(tBtn) tBtn.classList.remove('active');
                    });
                    document.getElementById(`section-${tab}`).classList.remove('hidden');
                    document.getElementById(`tab-${tab}`).classList.add('active');
                });
            }
        });
    }
};
