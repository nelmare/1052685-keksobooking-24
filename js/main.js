import './data.js';
import './form.js';
import './ad-form.js';
import './filter.js';
import './map.js';
import './display-ads.js';
import './form-filter-clear.js';
import './form-submit-message.js';
import './api.js';
import './preview.js';

import {setUserFormSubmit} from './form-submit-message.js';
import {onSubmitClearData} from './form-filter-clear.js';

setUserFormSubmit(onSubmitClearData);
