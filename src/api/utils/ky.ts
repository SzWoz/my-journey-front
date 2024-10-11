import defaultKy from 'ky';
import { getToken } from './token';

const API_URL = 'http://localhost:3000';

const ky = defaultKy.extend({
  prefixUrl: API_URL,
  hooks: {
    beforeRequest: [
      request => {
        const token = getToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
  timeout: 1000 * 30,
});

export default ky;
