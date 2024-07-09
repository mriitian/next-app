"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {

    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const SetProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        SetProviders();
    }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image 
                src="/assets/images/logo.png" alt='Logo' width={50} height={50} className='object-contain'
            /> 
            <p className="logo_text">PromtLib</p>
        </Link>

        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className='black_btn'>Create Post</Link>
                    <button type='button' onClick={signOut} className='outline_btn'> Sign Out </button>
                    <Link href="profile"> 
                        <Image src={session?.user.image}  width={37} height={37} className='rounded-full' alt='Profile'/>
                    </Link>
                </div>
            ) : 
            ( <>
                {providers && Object.values(providers).map((provider) => (
                    <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'> Sign In </button>
                ))}
            </> )
            }
        </div>

        {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <div> 
                            <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='Profile' onClick={() => setToggleDropdown((prev) => !prev)}/>
                        </div>
                        {toggleDropdown ? (
                            <div className="dropdown">
                                <Link href="/profile" className='dropdown_link' onClick={() => setToggleDropdown(false)}> My Profile </Link>
                                <Link href="/create-prompt" className='dropdown_link' onClick={() => setToggleDropdown(false)}> Create Prompt </Link>
                                <button type='button' onClick={() => {setToggleDropdown(false); signOut();}} className='mt-5 w-full black_btn'> Sign Out </button>
                            </div>
                        ): (
                            <></>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'> Sign In </button>
                        ))}
                    </>
                )}
            </div>
    </nav>
  )
}

export default Nav