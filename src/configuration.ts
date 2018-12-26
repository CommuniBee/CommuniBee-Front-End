import { environment } from './environments/environment';

export const getCommunibeeApiUrl = () => environment.production ? '' : 'http://localhost:3000';
