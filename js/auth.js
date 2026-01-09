import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from './firebase-config.js';

class AuthManager {
    constructor() {
        this.user = null;
        this.init();
    }

    init() {
        onAuthStateChanged(auth, (user) => {
            this.user = user;
            this.updateUI();

            // Trigger cart sync when user logs in
            if (user && window.cart) {
                window.cart.syncWithCloud();
            }
        });
    }

    async signup(email, password, name) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Update profile name logic can go here
            return { success: true, user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async logout() {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    updateUI() {
        const authContainer = document.querySelector('.auth-links');
        if (!authContainer) return;

        if (this.user) {
            authContainer.innerHTML = `
                <div class="user-menu">
                    <span>Hi, ${this.user.email.split('@')[0]}</span>
                    <button onclick="authManager.logout()" class="btn-logout">Logout</button>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="nav-link">Login</a>
                <a href="signup.html" class="btn btn-yellow">Sign Up</a>
            `;
        }
    }
}

const authManager = new AuthManager();
window.authManager = authManager;
