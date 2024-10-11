import { logout } from '@/api/auth';
import { removeToken } from '@/api/utils/token';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/auth/_auth/logout')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await logout();
    removeToken();
    queryClient.removeQueries({ queryKey: ['profile'] });
  },
  component: () => <Navigate to="/auth/login" />,
});
