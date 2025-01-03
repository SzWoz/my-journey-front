import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/api/auth'; // Adjust the import path as needed
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm text-neutral-200 shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-evenly">
            <button className="text-neutral-400 hover:text-gray-200" onClick={() => navigate({ to: '/auth/login' })}>
              Login
            </button>
            <button className="border-b-2 border-white text-white" onClick={() => navigate({ to: '/auth/register' })}>
              Register
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="username" className="block text-sm font-medium text-neutral-300">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={formState.username}
                onChange={e => setFormState({ ...formState, username: e.target.value })}
                className="mt-1 block w-full text-neutral-200"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
                className="mt-1 block w-full text-neutral-200"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" className="block text-sm font-medium text-neutral-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={formState.password}
                onChange={e => setFormState({ ...formState, password: e.target.value })}
                className="mt-1 block w-full text-neutral-200"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formState.confirmPassword}
                onChange={e => setFormState({ ...formState, confirmPassword: e.target.value })}
                className="mt-1 block w-full text-neutral-200"
              />
            </div>

            {errors &&
              errors.map((error, i) => (
                <p key={i} className="mt-1 text-sm text-red-500">
                  {error}
                </p>
              ))}

            <Button type="submit" className="mt-1 w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterLayout;
