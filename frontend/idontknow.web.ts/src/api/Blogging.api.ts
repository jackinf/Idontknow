/**
 * Created by zekar on 3/3/2017.
 */

import { APP_HOST } from '../constants/api.constants';
import { CrudService } from './Base/Base.api';

export class BloggingService extends CrudService {

    getRoot() {
        return `${APP_HOST}api/blogging`;
    }

}