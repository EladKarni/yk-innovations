import type { Metadata } from 'next'

import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'

import '@payloadcms/next/css'

type Args = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Payload Admin',
  description: 'Payload CMS Admin Panel',
}

const Layout = ({ children }: Args) => <RootLayout config={config}>{children}</RootLayout>

export default Layout
