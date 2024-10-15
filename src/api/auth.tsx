import { LoginCredientials, RegisterCredientials } from './schema';
import ky from './utils/ky';

export const login = async (creds: LoginCredientials) => {
  const { email, password } = LoginCredientials.parse(creds);

  const { headers } = await ky.post('login', {
    json: {
      user: { email, password },
    },
  });

  const token = headers.get('Authorization')?.split('Bearer ')[1];

  if (!token) {
    throw new Error('No token found in response');
  }

  return token;
};

export const logout = async () => {
  await ky.delete('logout');
};

export const register = async (creds: RegisterCredientials) => {
  const { username, email, password, confirmPassword } = RegisterCredientials.parse(creds);

  const { headers } = await ky.post('signup', {
    json: {
      user: { username, email, password, password_confirmation: confirmPassword },
    },
  });

  const token = headers.get('Authorization')?.split('Bearer ')[1];

  if (!token) {
    throw new Error('No token found in response');
  }

  return token;
};
