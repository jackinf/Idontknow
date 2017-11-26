import { sessionService } from 'redux-react-session'; // TODO: Remove this library

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb: any) {
        const token = '1a2b3c4d'; // TODO: get token from backend
        const user = {
            email: 'test@test.com',
            firstName: 'test',
            lastName: 'test'
        }; // TODO: get user from backend

        // TODO: it would be easier to implement own stuff instead of this redux-react-session
        sessionService.saveSession({token});
        sessionService.saveUser(user);
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },

    signout(cb: any) {
        sessionService.deleteSession();
        sessionService.deleteUser();
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

export default fakeAuth;