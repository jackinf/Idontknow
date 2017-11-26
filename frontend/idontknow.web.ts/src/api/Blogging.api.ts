/**
 * Created by zekar on 3/3/2017.
 */

import axios from 'axios';
import { APP_HOST } from '../constants/api.constants';
import { getDefaultHeaders, handleResult } from '../helpers/serviceUtils';

/////////////////////////////
/// BLOGGING SERVICE
/////////////////////////////

const ROOT = `${APP_HOST}api/blogging`;

export function getList(params: any) {
    // TODO: stringify parameters
    const URL = `${ROOT}?${params}`;
    return handleResult(axios(URL, {
        headers: getDefaultHeaders(),
        method: 'GET'
    }));
}

export function getSingle(id: number) {
    return handleResult(axios(`${ROOT}/${id}`, {
        headers: getDefaultHeaders(),
        method: 'GET'
    }));
}

export function add(formValues: FormData) {
    const URL = `${ROOT}`;
    return handleResult(axios(URL, {
        headers: getDefaultHeaders(),
        method: 'POST',
        data: JSON.stringify(formValues)
    }));
}

export function update(id: number, formValues: FormData) {
    const URL = `${ROOT}/${id}`;
    return handleResult(axios(URL, {
        headers: getDefaultHeaders(),
        method: 'PUT',
        data: JSON.stringify(formValues)
    }));
}

export function remove(id: number) {
    return handleResult(axios(`${ROOT}/${id}`, {
        headers: getDefaultHeaders(),
        method: 'DELETE'
    }));
}
