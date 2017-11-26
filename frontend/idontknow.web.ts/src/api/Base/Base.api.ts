import axios from 'axios';
import { getDefaultHeaders, handleResult } from '../../helpers/serviceUtils';

export abstract class CrudService {

    abstract getRoot(): string;

    getList(params: any) {
        // TODO: stringify parameters
        const URL = `${this.getRoot()}?${params}`;
        return handleResult(axios(URL, {
            headers: getDefaultHeaders(),
            method: 'GET'
        }));
    }

    getSingle(id: number) {
        return handleResult(axios(`${this.getRoot()}/${id}`, {
            headers: getDefaultHeaders(),
            method: 'GET'
        }));
    }

    add(formValues: FormData) {
        const URL = `${this.getRoot()}`;
        return handleResult(axios(URL, {
            headers: getDefaultHeaders(),
            method: 'POST',
            data: JSON.stringify(formValues)
        }));
    }

    update(id: number, formValues: FormData) {
        const URL = `${this.getRoot()}/${id}`;
        return handleResult(axios(URL, {
            headers: getDefaultHeaders(),
            method: 'PUT',
            data: JSON.stringify(formValues)
        }));
    }

    remove(id: number) {
        return handleResult(axios(`${this.getRoot()}/${id}`, {
            headers: getDefaultHeaders(),
            method: 'DELETE'
        }));
    }
}