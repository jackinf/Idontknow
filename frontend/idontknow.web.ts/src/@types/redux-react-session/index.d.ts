declare module 'redux-react-session' {
    import { Reducer } from 'redux';

    export interface SessionReducer extends Reducer<any> {}

    export const sessionReducer: SessionReducer;

    interface SessionUser { email: string; firstName: string; lastName: string; }

    export interface SessionService {
        initSessionService: (any);

        saveSession(param: { token: string }): void;

        saveUser(user: SessionUser): void;

        deleteSession(): void;

        deleteUser(): void;

        checkAuth(nextState: any, replace: any, next: any): any;
    }

    export const sessionService: SessionService;
}
