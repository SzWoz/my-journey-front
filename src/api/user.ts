import ky from './utils/ky';

export const fetchUser = async () => {
  const data = await (await ky.get('profile')).json();

  return data;
};
