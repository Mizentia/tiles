window.SetupEvents = function() {
    // Setup component specific events
    if (window.SetupWorksLogic) window.SetupWorksLogic();
    if (window.SetupPaymentsLogic) window.SetupPaymentsLogic();

    // Global document event delegation for delete actions
    document.addEventListener('click', (e) => {
        const wDelBtn = e.target.closest('.btn-delete-work');
        if (wDelBtn) window.FBOperations.deleteDocument('works', wDelBtn.dataset.id);
        
        const wEdtBtn = e.target.closest('.btn-edit-work');
        if (wEdtBtn) window.EditModal.openWork(wEdtBtn.dataset.id);
        
        const pDelBtn = e.target.closest('.btn-delete-payment');
        if (pDelBtn) window.FBOperations.deleteDocument('payments', pDelBtn.dataset.id);
        
        const pEdtBtn = e.target.closest('.btn-edit-payment');
        if (pEdtBtn) window.EditModal.openPayment(pEdtBtn.dataset.id);
    });
};
