"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function NavItems() {

    const pathName = usePathname();

    const navItems = [
    { label:'Home', href: '/' },
    { label: 'Companions', href: '/companions' },
    { label: 'My Journey', href: 'my-journey' },
]
  return (
    <nav className='flex items-center gap-4'>
        {navItems.map((nav)=>(
            <Link key={nav.label} href={nav.href} 
            className={cn(pathName===nav.href && 'text-primary font-semibold')}>
                <p>{nav.label}</p>
            </Link>
        ))}
    </nav>
  )
}

export default NavItems
