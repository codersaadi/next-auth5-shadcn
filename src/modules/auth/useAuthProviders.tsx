"use client"
import { useMemo } from "react"
import GoogleIcon, { FBIcon, GithubIcon } from './icons';
import { availableProviders } from "./auth.config";
export default function useAuthProviders() {
    const providers: {
        name: string,
        id: availableProviders,
        Icon: any
      }[] = useMemo(() => [
        {
          name: 'Google',
          id: 'google',
          Icon: GoogleIcon,
        },
        {
          name: 'Github',
          id: 'github',
          Icon: GithubIcon
        }
        , {
          name: 'facebook',
          id: 'facebook',
          Icon: FBIcon
        }
    
      ], [])
      return providers
}
