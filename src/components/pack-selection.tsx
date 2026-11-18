import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ILLUSTRATIONS } from '@/lib/illustrations';
import { money } from '@/lib/constants';
import { packPrice } from '@/lib/offer-pricing';

const selections = [
  { title: 'Le Solo', motifs: [12], href: '/packs', size: 1 },
  { title: 'Le Duo', motifs: [0, 4], href: '/packs?selection=animaux', size: 2 },
  { title: 'Le Trio', motifs: [1, 5, 7], href: '/packs?selection=ciel', size: 3 },
] as const;

export function PackSelection() {
  return <section className="pack-shelf store-width">
    <header className="shelf-title"><h2>Les petits packs</h2><Link href="/packs">Composer le mien ↗</Link></header>
    <div className="pack-shelf-grid">{selections.map(({title, motifs, href, size}) =>
      <Link className="pack-tile" href={href} key={title}>
        <div className="pack-art">{motifs.map(i => <img key={i} src={ILLUSTRATIONS[i].src} alt="" loading="lazy"/>)}</div>
        <div><h3>{title}</h3><p>{size} {size === 1 ? 'body' : 'bodies'} · dès {money(packPrice('motif',size))}</p></div><ArrowUpRight/>
      </Link>)}</div>
  </section>;
}
