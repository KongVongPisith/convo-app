"use client"; 

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react';
import { useQueryState } from "nuqs";

function SearchInput() {
    const pathName = usePathname();
    // const router = useRouter();
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    // const [searchQuery, setSearchQuery] = useQueryState('');

    const [searchQuery, setSearchQuery] = useQueryState('topic', {
    defaultValue: '',
    shallow: true
  });

  useEffect(() => {
        const params = new URLSearchParams(searchParams);
        // router.push(`${pathName}?${params.toString()}`);
         replace(`${pathName}?${params.toString()}`);
  }, [searchQuery, replace, searchParams,pathName]);
    // useEffect(()=>{

    //     if(searchQuery){
    //         router.push(`/currentRouter?topic=${searchQuery}`)
    //     }

    // },[searchQuery, router, searchParams,pathName])


  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
      <Image src={"/icons/search.svg"} alt='search' width={15} height={15}/>
      <input placeholder='Search companions...'
      className='outline-none'
      value={searchQuery}
      onChange={(e)=>setSearchQuery(e.target.value || null)}/>
    </div>
  )
}

export default SearchInput
