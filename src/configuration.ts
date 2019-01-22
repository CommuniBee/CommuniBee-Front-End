import { environment } from './environments/environment';

export const getCommunibeeApiUrl = () => environment.production ? '' : environment.api.url;
