
export const APP_HOST = process.env.APP_HOST;

export const endpoints = {
    auth: {
        register: 'api/account/register',
        login: 'token'
    },
    account: {
        getGeneralInfo: 'api/account/account-info',
    },
    partner: {
        register: 'api/partner/register',
        list: 'api/partner/partners'
    }
};