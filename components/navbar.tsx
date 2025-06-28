import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './navItems';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

function Navbar() {
  return (
    <nav className='flex items-center justify-between mx-auto w-full px-14 py-4 bg-white max-sm:px-4'>
      <Link href="/">
      <Image src="/images/logo.svg" alt='logo' width={46} height={44} />
      </Link>
      <div className='flex items-center gap-8'>
        <NavItems />
        <SignedOut>
          <SignInButton>
            <button className='btn-signin'> SignIn</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar
