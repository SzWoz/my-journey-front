import { User } from './schema';
import ky from './utils/ky';

export const fetchUser = async () => {
  const data = await ky.get('profile').json();

  return User.parse(data);
};
