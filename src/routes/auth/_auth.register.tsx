import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/api/auth'; // Adjust the import path as needed
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/auth/_auth/register')({
  component: RegisterLayout,
});

function RegisterLayout() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<string[] | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      username,
      email,
      password,
      confirmPassword,
    }: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => register({ username, email, password, confirmPassword }),
    onSuccess: () => {
      navigate({ to: '/auth/login' });
    },
    onError: err => {
      setErrors(err.message.split(','));
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      setErrors(['Passwords do not match']);
      return;
    }
    await mutation.mutateAsync({
      username: formState.username,
      email: formState.email,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded bg-white p-6 shadow-md">
        <div className="mb-4 flex justify-evenly">
          <button className="text-violet-500" onClick={() => navigate({ to: '/auth/login' })}>
            Login
          </button>
          <button
            className="border-b-2 border-violet-500 text-violet-500"
            onClick={() => navigate({ to: '/auth/register' })}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <h1 className="mb-4 text-2xl font-bold">Register</h1>

          <div className="mb-4">
            <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              value={formState.username}
              onChange={e => setFormState({ ...formState, username: e.target.value })}
              className="mt-1 block w-full"
            />
          </div>
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
          <div className="mb-4">
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="confirm password"
              value={formState.confirmPassword}
              onChange={e => setFormState({ ...formState, confirmPassword: e.target.value })}
              className="mt-1 block w-full"
            />
          </div>

          {errors &&
            errors.map((error, i) => (
              <p key={i} className="text-red-500">
                {error}
              </p>
            ))}

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
