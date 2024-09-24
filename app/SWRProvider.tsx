'use client'

import { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { fetcher } from '@/lib/fetcher'

export default function SWRProvder({ children }: { children: ReactNode }) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
}

