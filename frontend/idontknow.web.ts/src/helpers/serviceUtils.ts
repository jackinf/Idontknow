/**
 * Created by zekar on 3/3/2017.
 */
import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/base.constants';
import { logDevMessage } from './commonUtils';
import NProgress from 'react-nprogress';

// Reusable headers, because they are used in 90%+ of all the cases
export function getDefaultHeaders() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || null;
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

export function getFileHeaders() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || null;
    return {
        // NB! 'Content-Type' must no exist or file upload will fail!
        'Authorization': `Bearer ${token}`
    };
}

export function handleResult(promise: Promise<any>) {
    NProgress.start();
    return promise
        .then(parseResult1)
        .then(({data, httpResponse}) => {
            NProgress.done();
            return handleResultInner(httpResponse, data, data.payload ? data.payload : data);
        });
}

export function handleFullResult(promise: Promise<any>) {
    NProgress.start();

    return promise
        .then(parseResult1)
        .then(({data, httpResponse}) => {
            NProgress.done();
            return handleResultInner(httpResponse, data, data);
        });
}

//
// Private functions
//

/**
 * Variant 1 how to parse JSON response
 * @param response
 * @returns {*|Promise.<{data: *, httpResponse: *}>}
 */
function parseResult1(response: any) {
    return response.json().then((data: any) => ({data, httpResponse: response}));
}

/**
 *
 * @param httpResponse - metaresponse generated from server, holding status codes etc.
 * @param data - full response object
 * @param payload - data or some item in the data object, if we don't want to return the entire object
 * @returns {*}
 */
function handleResultInner(httpResponse: any, data: any, payload: any) {
    if (httpResponse.ok === false) {
        if (httpResponse.status === 500) {
            logDevMessage('Web Service handle. INNER FAILURE.', data);
            throw {status: 500, message: 'API failed'};
        } else if (httpResponse.status === 401) {
            logDevMessage('Web Service handle. INNER FAILURE.', data);
            throw {status: 401, message: 'Logged out'};
        }

        logDevMessage('Web Service handle. FAILURE.', httpResponse.url, data);
        throw data;
    } else {
        logDevMessage('Web Service handle. SUCCESS.', httpResponse.url, data);
        if (data && data.totalItems && payload && payload === Object(payload)) {
            payload.totalItems = data.totalItems;
        }
        if (data && data.pages && payload && payload === Object(payload)) {
            payload.pages = data.pages;
        }
        return payload;
    }
}
