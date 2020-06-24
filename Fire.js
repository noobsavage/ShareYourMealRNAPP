import firebase from "firebase";

class Fire {
    constructor() {
        this.init();
        this.checkAuth();
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCbPGa2VBxQp5vdj09DT_SSGJfmHC10hms",
                authDomain: "symchat-8e9ce.firebaseapp.com",
                databaseURL: "https://symchat-8e9ce.firebaseio.com",
                projectId: "symchat-8e9ce",
                storageBucket: "symchat-8e9ce.appspot.com",
                messagingSenderId: "69128877719",
            });
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();
