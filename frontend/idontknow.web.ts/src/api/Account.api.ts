/**
 * Created by zekar on 3/3/2017.
 */

import axios from 'axios';
import { APP_HOST, endpoints } from '../constants/api.constants';
import { getDefaultHeaders, handleResult, handleFullResult } from '../helpers/serviceUtils';

/////////////////////////////
/// USER SERVICE
/////////////////////////////

/**
 * Get generic list of users
 * @returns users
 */
export function getUserList() {
    return handleResult(axios(`${APP_HOST}api/account/users`, {
        headers: getDefaultHeaders(),
        method: 'GET'
    }));
}

/**
 * Activate new user email
 * @returns message
 */
export function activateUserEmail(userId: number, code: string) {
    return handleResult(axios(`${APP_HOST}api/account/confirm-email?id=${userId}&code=${code}`, {
        headers: getDefaultHeaders(),
        method: 'GET'
    }));
}

/**
 * Registers a user
 * @param formData
 * @returns {*}
 */
export function registerUser(formData: FormData) {
    const body = JSON.stringify({
        'CompanyName': formData.get('companyName'),
        'ContactPhone': formData.get('contact_phone'),
        'Country': formData.get('country'),
        'Password': formData.get('password'),
        'ConfirmPassword': formData.get('confirmPassword'),
        'Email': formData.get('email'),
        'VatNumber': formData.get('vat'),
        'CompanyAddress': formData.get('city'),
        'ZipCode': formData.get('zipCode'),
        'existingUserId': '0',
        'defaultLanguage': localStorage.getItem('currentLanguage')
    });

    return handleFullResult(axios(APP_HOST + endpoints.partner.register, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        data: body
    }));
}

export function loginUser(creds: any) {
    const details = {
        'userName': creds.username,
        'password': creds.password,
        'grant_type': 'password'
    };

    let formBody = [];
    for (let property in details) {
        if (property) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
    }
    const formBodyString = formBody.join('&');

    return handleResult(axios(APP_HOST + endpoints.auth.login, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: formBodyString
    }));
}
