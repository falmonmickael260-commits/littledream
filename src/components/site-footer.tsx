import Link from 'next/link';
export function SiteFooter(){
 return <footer className="night-footer"><div className="store-width"><div className="footer-map"><Link href="/" className="footer-name">little dream<span>✧</span></Link>
 <nav aria-label="Boutique"><Link href="/collections">Boutique</Link><Link href="/personnaliser/body-bebe-personnalise">Personnaliser</Link><Link href="/packs">Créer un pack</Link><Link href="/fabrication">Notre fabrication</Link></nav>
 <nav aria-label="Informations"><Link href="/contact">Contact</Link><Link href="/guide-des-tailles">Guide des tailles</Link><Link href="/livraison-retours">Livraison et retours</Link><Link href="/faq">Questions fréquentes</Link></nav></div>
 <div className="footer-meta"><span>© {new Date().getFullYear()} Little Dream</span><Link href="/mentions-legales">Mentions légales</Link><Link href="/cgv">CGV</Link><Link href="/confidentialite">Confidentialité</Link><Link href="/cookies">Cookies</Link></div></div></footer>;
}
