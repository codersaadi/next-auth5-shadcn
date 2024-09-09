'use client'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useEffect } from 'react'
export  function ThemeSwitch() {
  const DARK_THEME = 'dark'
  const LIGHT_THEME = 'light'
  const [mounted, setMounted] = React.useState(false)
  const {setTheme, resolvedTheme} = useTheme()
   useEffect(()=> setMounted(true), [])
   if (!mounted) {
    return  <Image
    src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
    width={21}
    height={21}
    sizes="21x21"
    alt="Loading Light/Dark Toggle"
    priority={false}
    title="Loading Light/Dark Toggle"
  />
   }
   if (resolvedTheme === DARK_THEME) {
    return <SunIcon className='w-6 h-6 text-violet-600  ' onClick={()=> setTheme(LIGHT_THEME)}/>
   }
   if (resolvedTheme === LIGHT_THEME) {
    return <MoonIcon className='w-6 h-6  text-violet-600  rounded-md' onClick={()=> setTheme(DARK_THEME)}/>
   }
}
