import * as React from 'react';

interface AsyncComponentState {
    Component: any;
}

function asyncComponent(getComponent: any): any  {
    class AsyncComponent extends React.Component<{}, AsyncComponentState> {
        constructor(props: any) {
            super(props);

            this.state = {
                Component: null
            };
        }

        async componentDidMount() {
            const {default: Component} = await getComponent();
            this.setState({
                Component: Component
            });
        }

        render() {
            const C = this.state.Component;
            return C ? <C {...this.props}/> : <div>....Loading</div>;
        }
    }
    return AsyncComponent;
}

export default asyncComponent;