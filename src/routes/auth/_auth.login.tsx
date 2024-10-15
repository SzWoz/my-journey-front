import { login } from '@/api/auth';
import { LoginCredientials } from '@/api/schema';
import { storeToken } from '@/api/utils/token';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { HTTPError } from 'ky';
import React, { useState } from 'react';

export const Route = createFileRoute('/auth/_auth/login')({
  component: LoginLayout,
});

function LoginLayout() {
  const [formState, setFormState] = useState<LoginCredientials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const { setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginCredientials) => login({ email, password }),
    onSuccess: token => {
      setIsAuthenticated(true);
      storeToken(token);
      setError(null);

      navigate({ to: '/dashboard' });
    },
    onError: err => {
      if (err instanceof HTTPError && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Something went wrong');
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutation.mutateAsync({
      email: formState.email,
      password: formState.password,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded bg-white p-6 shadow-md">
        <div className="mb-4 flex justify-evenly">
          <button
            className="border-b-2 border-violet-500 text-violet-500"
            onClick={() => navigate({ to: '/auth/login' })}
          >
            Login
          </button>
          <button className="text-violet-500" onClick={() => navigate({ to: '/auth/register' })}>
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <h1 className="mb-4 text-2xl font-bold">Login</h1>
          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email"
              value={formState.email}
              onChange={e => setFormState({ ...formState, email: e.target.value })}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={formState.password}
              onChange={e => setFormState({ ...formState, password: e.target.value })}
              className="mt-1 block w-full"
            />
          </div>
          {error && <p className="mt-1 text-red-500">{error}</p>}
          <Button type="submit" className="mt-1 w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
