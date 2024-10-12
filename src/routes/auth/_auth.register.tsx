import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/_auth/register')({
  component: Register,
});

function Register() {
  return (
    <div>
      <button>register</button>
    </div>
  );
}
