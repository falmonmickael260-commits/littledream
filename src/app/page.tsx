import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import { HeroMotion } from '@/components/hero-motion';
import { HeroBody } from '@/components/hero-body';
import { PackSelection } from '@/components/pack-selection';
import { ILLUSTRATIONS } from '@/lib/illustrations';

export default function Home() {
  return <>
    <HeroMotion><section className="campaign store-width">
      <div className="campaign-copy">
        <p className="collection-label" data-hero>La collection naissance</p>
        <h1 data-hero>Son premier<br/><em>petit body.</em></h1>
        <p className="campaign-desc" data-hero>Un motif à choisir, un prénom à ajouter. Composez son body en coton et découvrez votre création en 3D.</p>
        <div className="campaign-actions" data-hero><Link href="/personnaliser/body-bebe-personnalise" className="btn">Personnaliser mon body <ArrowRight size={17}/></Link><Link href="/packs">Créer mon pack ↗</Link></div>
      </div><HeroBody/>
    </section></HeroMotion>
    <section className="store-width illustration-shelf"><header className="shelf-title"><h2>Les petits personnages</h2><Link href="/collections">Voir la boutique ↗</Link></header>
      <div className="character-row">{[12,1,9,7].map(index=>{const m=ILLUSTRATIONS[index];return <Link key={m.id} className="character" href={'/personnaliser/body-bebe-doux?motif='+m.id}>
        <div><img src={m.src} alt="" loading="lazy"/></div><h3>{m.name}</h3><p>Body à personnaliser · 17,99 €</p></Link>;})}</div>
    </section>
    <PackSelection/>
    <section className="cotton-note store-width"><h2>Le coton, de près.</h2><div><p>Un body 100 % coton accueille votre motif et le prénom de bébé.</p><Link href="/fabrication">Découvrir notre fabrication ↗</Link></div></section>
  </>;
}
