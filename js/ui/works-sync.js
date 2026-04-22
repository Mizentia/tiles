// works-sync.js
// Recalculates every worker's cumulative stats from ALL works and writes to Firestore.
window.SyncWorkerStats = async function (submittedWorkData, editId) {
    if (!window.AppState || !window.db) return;

    const statsMap = {}; // dbId -> aggregated stats

    function init(id) {
        if (!statsMap[id]) {
            statsMap[id] = {
                totalEarned: 0, totalPaid: 0, totalDue: 0,
                daysWorked: 0, totalExtra: 0, workHistory: []
            };
        }
    }

    // Merge: all existing works (minus the one being edited) + the newly submitted work
    const allWorks = (AppState.worksData || [])
        .filter(w => w.id !== editId)
        .concat([submittedWorkData]);

    allWorks.forEach(work => {
        if (!work.workers || !work.workers.length) return;
        const date = work.dateStart || work.date || '';

        // Split extra (worker-type) expenses among the workers they apply to
        const extras = {};
        (work.expenses || []).forEach(exp => {
            if (exp.type === 'worker' && exp.workers && exp.workers.length) {
                const split = (exp.amount || 0) / exp.workers.length;
                exp.workers.forEach(wid => { extras[wid] = (extras[wid] || 0) + split; });
            }
        });

        work.workers.forEach(w => {
            if (!w.dbId) return; // skip rows without a linked DB worker
            init(w.dbId);
            const extra = extras[w.dbId] || 0;
            const earned = (w.rate || 0) + extra;
            const paid = w.paid || 0;
            const due = earned - paid;
            const s = statsMap[w.dbId];
            s.daysWorked++;
            s.totalEarned += earned;
            s.totalPaid += paid;
            s.totalDue += due;
            s.totalExtra += extra;
            s.workHistory.push({
                date,
                rate: w.rate || 0,
                extra: +extra.toFixed(2),
                paid: paid,
                due: +due.toFixed(2),
                workId: work.id || ''
            });
        });
    });

    // Write updated stats to each worker document
    const updates = Object.entries(statsMap).map(([id, s]) =>
        db.collection('workers').doc(id).update({
            totalEarned: +s.totalEarned.toFixed(2),
            totalPaid: +s.totalPaid.toFixed(2),
            totalDue: +s.totalDue.toFixed(2),
            daysWorked: s.daysWorked,
            totalExtra: +s.totalExtra.toFixed(2),
            workHistory: s.workHistory
        }).catch(err => console.warn('SyncWorkerStats failed for', id, err))
    );

    await Promise.all(updates);
};
