import { login } from '@/api/auth';
import { LoginCredientials } from '@/api/schema';
import { storeToken } from '@/api/utils/token';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/auth/_auth/login')({
  component: LoginLayout,
});

function LoginLayout() {
  const { setIsAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginCredientials) => login({ email, password }),
    onSuccess: token => {
      setIsAuthenticated(true);
      storeToken(token);

      navigate({ to: '/dashboard' });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    console.log('submit');
    await mutation.mutateAsync({
      email: e.target[0].value,
      password: e.target[1].value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>login</h1>
      <input placeholder="username" />
      <input placeholder="password" />
      <button type="submit">login</button>
    </form>
  );
}
