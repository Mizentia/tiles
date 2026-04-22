document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('root').innerHTML = window.TemplateLayout;
    document.getElementById('main-content').innerHTML =
        window.TemplateDashboard +
        window.TemplateQuotation +
        window.TemplateWorksBase +
        window.TemplateWorkersSection +
        window.TemplatePayments;

    // Set default dates
    let d1 = document.getElementById('work-start-date'); if (d1) d1.value = AppState.todayStr;
    let d2 = document.getElementById('work-end-date');   if (d2) d2.value = AppState.todayStr;
    let d3 = document.getElementById('pay-date');        if (d3) d3.value = AppState.todayStr;
    let d4 = document.getElementById('qt-date');         if (d4) d4.value = AppState.todayStr;

    window.UINavigation.setup();
    window.EditModal.init();
    window.SetupEvents();

    auth.onAuthStateChanged((user) => {
        if (user) {
            AppState.currentUser = user;
            window.FBListeners.setup();
            document.getElementById('loading-screen').classList.add('hidden');
            document.getElementById('app-container').classList.remove('hidden');
        } else {
            AppState.currentUser = null;
        }
    });

    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        auth.signInWithCustomToken(__initial_auth_token).catch(() => Utils.showToast("Auth Error", "error"));
    } else {
        auth.signInAnonymously().catch(() => Utils.showToast("Auth Error", "error"));
    }
});

