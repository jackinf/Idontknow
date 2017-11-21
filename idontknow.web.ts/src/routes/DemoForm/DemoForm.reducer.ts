interface DemoFormReducerAction {
    type: string;
}

export default (state = {}, action: DemoFormReducerAction) => {
    switch (action.type) {
        default:
            return state;
    }
}