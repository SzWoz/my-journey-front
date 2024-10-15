import defaultKy from 'ky';
import { getToken } from './token';
import { z } from 'zod';

const API_URL = 'http://localhost:3000';

const ApiErrorSchema = z.union([
  z.object({
    error: z.string(),
  }),
  z.object({
    errors: z.array(z.string()),
  }),
]);

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
    beforeError: [
      async error => {
        const { response } = error;
        try {
          const data = ApiErrorSchema.parse(await response.json());

          error.name = 'APIError';
          if ('error' in data) {
            error.message = data.error;
          } else if ('errors' in data) {
            error.message = data.errors.join(', ');
          }

          return error;
        } catch {
          return error;
        }
      },
    ],
  },
  timeout: 1000 * 30,
});

export default ky;
