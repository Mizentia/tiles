document.addEventListener('DOMContentLoaded', () => {
    // Inject Modular HTML Components
    document.getElementById('root').innerHTML = window.TemplateLayout;
    document.getElementById('main-content').innerHTML = 
        window.TemplateDashboard + window.TemplateWorks + window.TemplatePayments;

    // Prefill date inputs
    document.getElementById('work-date').value = AppState.todayStr;
    document.getElementById('pay-date').value = AppState.todayStr;

    // Setup User Interface
    window.UINavigation.setup();
    window.EditModal.init();
    window.SetupEvents();

    // Initialize Firebase Auth
    auth.onAuthStateChanged((user) => {
        if (user) {
            AppState.currentUser = user;
            window.FBListeners.setup();
            
            // Remove loading screen
            document.getElementById('loading-screen').classList.add('hidden');
            document.getElementById('app-container').classList.remove('hidden');
        } else {
            AppState.currentUser = null;
        }
    });

    // Authenticate user
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        auth.signInWithCustomToken(__initial_auth_token).catch(() => Utils.showToast("Auth Error", "error"));
    } else {
        auth.signInAnonymously().catch(() => Utils.showToast("Auth Error", "error"));
    }
});
