export default function useUser() {
  const data = await(await ky.get('users/whoami')).json();
}
