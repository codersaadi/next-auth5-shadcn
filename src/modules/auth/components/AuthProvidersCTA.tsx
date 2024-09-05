'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import useAuthProviders from '../useAuthProviders';
import { availableProviders } from '../auth.config';

export default function AuthProvidersCTA({
  withDescription = false,
}: {
  withDescription?: boolean;
}) {
  const providers = useAuthProviders();

  const handleSignIn = async (provider: availableProviders) => {
    try {
      await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">or</span>
        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      <div className={`flex  items-center justify-center gap-3 ${withDescription ? "flex-wrap":""}`}>
        {providers.map((provider) => (
          <Button
            key={provider.id}
            onClick={() => handleSignIn(provider.id)}
            className={cn(
              'flex items-center mx-auto w-full',
              withDescription
                ? 'w-full gap-3 py-2 px-4 rounded-full  '
                : 'aspect-square  p-1'
            )}
          >
            <provider.Icon size={22} aria-label={`${provider.name} icon`} />
            {withDescription && (
              <span className="text-sm font-medium">
                Continue with {provider.name}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
