import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBR1l227u8Kf4QGNgfKMaK1NkH3a_uSBQ4",
    authDomain: "auth.rateyourhouse.co.uk",
    databaseURL: "https://ratemyhouse-1545743069431.firebaseio.com",
    projectId: "ratemyhouse-1545743069431",
    storageBucket: "ratemyhouse-1545743069431.appspot.com",
    messagingSenderId: "170876410545"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
    }

    // *** Auth API ***

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    doSignInWithFacebook = () =>
        this.auth.signInWithPopup(this.facebookProvider);

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;
