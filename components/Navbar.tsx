import {
  SignInButton,
  UserButton,
  currentUser,
  redirectToSignIn,
  useAuth,
} from '@clerk/nextjs';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import Link from 'next/link';

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className='bg-background flex items-center justify-between sticky top-0 py-2 border-b'>
      <Link href='/'>
        <h1 className='text-3xl font-bold'>
          Todo App<span className='text-primary text-4xl'>.</span>{' '}
        </h1>
      </Link>
      <div className='flex items-center gap-8'>
        {user && (
          <Button variant='outline'>
            <Link href='/todos'>Todos</Link>
          </Button>
        )}
        <ModeToggle />
        {user && <UserButton afterSignOutUrl='/' />}
        {!user && (
          <SignInButton
            afterSignInUrl='/todos'
            afterSignUpUrl='/todos'
            mode='modal'
          >
            <Button>Sign in</Button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
