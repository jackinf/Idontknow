import * as React from 'react'

// const MyLoadingComponent = ({isLoading: boolean, error: any}) => {
//     // Handle the loading state
// };

interface Props {
    isLoading: boolean;
    error: any;
}

class MyLoadingComponent extends React.Component<Props> {
    render() {
        const { isLoading, error } = this.props;

        if (isLoading) {
            return <div>Loading...</div>;
        }
        // Handle the error state
        else if (error) {
            return <div>Sorry, there was a problem loading the page.</div>;
        }
        else {
            return null;
        }
    }
}

export default MyLoadingComponent;