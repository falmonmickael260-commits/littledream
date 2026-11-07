import Link from 'next/link';
import type { CatalogProduct } from '@/lib/types';
import { BodyArt } from './body-art';
import { PhotoBody } from './photo-body';
import { money } from '@/lib/constants';
export function ProductCard({ product }: { product: CatalogProduct }) { const price = product.variants.length ? Math.min(...product.variants.map((v) => v.price_cents!)) : null; return <article className="product-card"><Link href={`/produits/${product.slug}`} aria-label={`Voir ${product.name}`}><div className="product-visual">{product.image_url ? <img src={product.image_url} alt={product.name} width="600" height="750" loading="lazy"/> : product.preview ? <PhotoBody className="crop"/> : <BodyArt color={product.slug.includes('personnalise') ? '#EBCFD2' : '#FFFDF9'}/>} {product.preview&&<span className="preview-tag">Photo de démonstration</span>}</div><div className="product-meta"><h3>{product.name}</h3><p>{price !== null ? `À partir de ${money(price)}` : 'Bientôt disponible'}</p></div></Link></article>; }
