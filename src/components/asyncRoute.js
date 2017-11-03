import React from 'react'
import Loadable from 'react-loadable'

const MyLoadingComponent = ({isLoading, error}) => {
    // Handle the loading state
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

export default (route) => Loadable({
    loader: () => import(route),
    loading: MyLoadingComponent
})