import Link from 'next/link';
import {HeroMotion} from '@/components/hero-motion';
import {ArrowUpRight} from 'lucide-react';
export default function Fabrication(){
 return <HeroMotion><article className="fabric-journal store-width">
 <header><p className="collection-label">L’atelier Little Dream</p><h1>Au fil <em>du coton.</em></h1><p>Du body vierge à votre création personnalisée.</p></header>
 <section data-reveal><figure><img src="/images/garment.webp" alt="Aperçu rapproché de la maille et de l’encolure du body"/></figure><div><h2>La matière</h2><p>Le body est en coton à 100 %. Sa couleur sert de fond à la composition que vous choisissez dans le studio.</p></div></section>
 <section data-reveal><figure><img src="/images/little-dream-campagne.webp" alt="Aperçu d’un renard illustré sur le tissu ivoire" loading="lazy"/></figure><div><h2>Le dessin</h2><p>Choisissez votre illustration, puis ajustez sa taille et son emplacement. Dans la formule Motif + Prénom, le prénom apparaît directement sur le body à mesure que vous l’écrivez.</p></div></section>
 <section data-reveal><figure className="print-sample"><img src="/illustrations/13_renard_endormi.png" alt="Illustration du renard sur fond transparent" loading="lazy"/></figure><div><h2>Le fichier d’impression</h2><p>Le studio exporte le motif et le prénom sur fond transparent. Ce fichier conserve la composition choisie pour le contrôle avant impression.</p><Link href="/personnaliser/body-bebe-personnalise" className="btn">Ouvrir le studio <ArrowUpRight size={16}/></Link></div></section>
 </article></HeroMotion>;
}
