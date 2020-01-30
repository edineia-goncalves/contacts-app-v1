import db from "../firebase";

const firebaseService = {
    addItem(item) {
        return db.collection("contacts")
            .add({
                nome: item.nome,
                telefoneCelular: item.telefoneCelular
            })
    },
    deleteItem(id) {
        return db
            .collection("contacts")
            .doc(id)
            .delete()
    },
    getItemById(id) {
        const doc = db.collection("contacts").doc(id);
        return doc.get()
    },
    updateItem(id, item) {
        return db.collection("contacts").doc(id).update(item);
    }
};

export default firebaseService;