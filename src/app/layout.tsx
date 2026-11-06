import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { siteUrl } from '@/lib/constants';
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: 'Little Dream — Vêtements bébé personnalisés', template: '%s | Little Dream' }, description: 'Des petits vêtements pour de grands souvenirs. Bodies bébé personnalisables.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="fr"><body><CartProvider><a href="#contenu" style={{ position: 'absolute', top: -100, left: 12, zIndex: 100 }} className="skip-link">Aller au contenu</a><SiteHeader/><main id="contenu">{children}</main><SiteFooter/></CartProvider></body></html>; }
