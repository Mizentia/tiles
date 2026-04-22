window.SetupEvents = function() {
    if (window.SetupWorksEvents)     window.SetupWorksEvents();
    if (window.SetupWorksSubmit)     window.SetupWorksSubmit();
    if (window.SetupPaymentsLogic)   window.SetupPaymentsLogic();
    if (window.SetupQuotation)       window.SetupQuotation();
    if (window.SetupWorkersSection)  window.SetupWorkersSection();

    document.addEventListener('click', (e) => {
        const wDelBtn = e.target.closest('.btn-delete-work');
        if (wDelBtn && confirm("এই কাজের হিসাবটি মুছে ফেলবেন?")) {
            window.FBOperations.deleteDocument('works', wDelBtn.dataset.id);
        }
        const wEdtBtn = e.target.closest('.btn-edit-work');
        if (wEdtBtn) window.LoadWorkForEdit(wEdtBtn.dataset.id);

        const pDelBtn = e.target.closest('.btn-delete-payment');
        if (pDelBtn) window.FBOperations.deleteDocument('payments', pDelBtn.dataset.id);
        const pEdtBtn = e.target.closest('.btn-edit-payment');
        if (pEdtBtn) window.EditModal.openPayment(pEdtBtn.dataset.id);
    });
};

