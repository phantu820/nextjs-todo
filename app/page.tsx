import { Button } from '@/components/ui/button';
import { SignInButton, currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const user = await currentUser();

  return (
    <main className='flex items-center flex-col mt-8 lg:flex-row'>
      <div className='flex gap-4 flex-col text-center lg:text-start'>
        <h1 className='text-5xl'>
          Streamline Your Tasks with <span className='font-bold'>Todo App</span>
          <span className='text-6xl text-primary font-bold'>.</span>
        </h1>
        <p className='text-2xl text-muted-foreground'>
          Stay Organized, Boost Productivity, and Achieve More.
        </p>
        <div className='lg:mt-16 flex justify-center lg:justify-start'>
          {!user && (
            <SignInButton afterSignInUrl='/todos' afterSignUpUrl='/todos' mode='modal'>
              <Button size='xl'>Get Started</Button>
            </SignInButton>
          )}
          {user && (
            <Button size='xl' asChild>
              <Link href='/todos'>Get Started</Link>
            </Button>
          )}
        </div>
      </div>
      <div>
        <Image
          src='/heroImage.png'
          alt='Hero Image'
          width={1000}
          height={1000}
        />
      </div>
    </main>
  );
}
