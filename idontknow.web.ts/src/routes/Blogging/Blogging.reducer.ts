export class DefaultState {
    test: string;
}

export default (state: DefaultState = new DefaultState(), action: any) => {
    switch (action.type) {
        default:
            return state;
    }
}