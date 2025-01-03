import { useUser } from '@/hooks/useUser';
import React from 'react';
import UserIcon from '@/assets/icons/user.svg?react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

function Navbar() {
  const { data: user } = useUser();
  const navigate = useNavigate();
  return (
    <nav className="flex h-10 items-center justify-between p-8">
      <Button className="cursor-pointer" onClick={() => navigate({ to: '/dashboard' })}>
        My Journey
      </Button>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex gap-4">
              <UserIcon className="size-6" />
              <span>{user?.username}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate({ to: '/user/vehicles' })}>
                My Vehicles
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate({ to: '/user/journeys' })}>
                My Journeys
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navbar;
