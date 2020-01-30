import db from "../firebase";

const firebaseService = {
    addItem(value) {
        return db.collection("contacts")
            .add({
                nome: value.nome,
                telefoneCelular: value.telefoneCelular
            })
    },
    deleteItem(id) {
        return db
            .collection("contacts")
            .doc(id)
            .delete()
    },
    editItem(id) {
        const doc = db.collection("contacts").doc(id);
        return doc.get()
    }
};

export default firebaseService;