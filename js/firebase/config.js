window.FBConfig = {
    apiKey: "AIzaSyDN4qgDPwLiKGc7PAB0BRvMJjyXDlA2vrM",
    authDomain: "contactor-9090a.firebaseapp.com",
    projectId: "contactor-9090a",
    storageBucket: "contactor-9090a.firebasestorage.app",
    messagingSenderId: "47719498959",
    appId: "1:47719498959:web:78faee3ac3e8931b9e23ba"
};

// Initialize Compat SDK
firebase.initializeApp(typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : window.FBConfig);
window.db = firebase.firestore();
window.auth = firebase.auth();

window.FBListeners = {
    setup: function() {
        if (!AppState.currentUser) return;
        
        db.collection('works').onSnapshot((snapshot) => {
            AppState.worksData = [];
            snapshot.forEach((doc) => AppState.worksData.push({ id: doc.id, ...doc.data() }));
            AppState.worksData.sort((a, b) => new Date(b.date) - new Date(a.date));
            window.RenderDash();
            window.RenderWorks();
            window.RenderPayments();
        });

        db.collection('payments').onSnapshot((snapshot) => {
            AppState.paymentsData = [];
            snapshot.forEach((doc) => AppState.paymentsData.push({ id: doc.id, ...doc.data() }));
            AppState.paymentsData.sort((a, b) => new Date(b.date) - new Date(a.date));
            window.RenderDash();
            window.RenderWorks();
            window.RenderPayments();
        });

        db.collection('workers').onSnapshot((snapshot) => {
            AppState.workersData = [];
            snapshot.forEach((doc) => AppState.workersData.push({ id: doc.id, ...doc.data() }));
        });
    }
};
