window.FBOperations = {
    addWork: async function(data, btn) {
        try {
            await db.collection('works').add({ 
                ...data, 
                createdAt: firebase.firestore.FieldValue.serverTimestamp() 
            });
            Utils.showToast("কাজের হিসাব সেভ হয়েছে!");
            return true;
        } catch (error) {
            Utils.showToast("সেভ করতে সমস্যা হয়েছে!", "error");
            return false;
        }
    },
    addPayment: async function(data, btn) {
        try {
            await db.collection('payments').add({ 
                ...data, 
                createdAt: firebase.firestore.FieldValue.serverTimestamp() 
            });
            Utils.showToast("পেমেন্ট সফলভাবে এন্ট্রি হয়েছে!");
            return true;
        } catch (error) {
            Utils.showToast("এন্ট্রি করতে সমস্যা হয়েছে!", "error");
            return false;
        }
    },
    deleteDocument: async function(collectionName, id) {
        try {
            await db.collection(collectionName).doc(id).delete();
            Utils.showToast("মুছে ফেলা হয়েছে", "info");
        } catch (error) {
            Utils.showToast("মুছতে সমস্যা হয়েছে", "error");
        }
    },
    updateDocument: async function(collectionName, id, data) {
        try {
            await db.collection(collectionName).doc(id).update(data);
            Utils.showToast("সফলভাবে আপডেট হয়েছে!");
            return true;
        } catch (error) {
            Utils.showToast("আপডেট করতে সমস্যা হয়েছে!", "error");
            return false;
        }
    }
};
