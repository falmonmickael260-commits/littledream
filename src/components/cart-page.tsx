'use client';
import Link from 'next/link';
import { useCart } from './cart-provider';
import { BodyArt } from './body-art';
import type { CatalogProduct } from '@/lib/types';
import { money } from '@/lib/constants';

export function CartPage({ products }: { products: CatalogProduct[] }) {
  const { lines, update, remove } = useCart();
  const rows=lines.map(line=>({line,product:products.find(p=>p.id===line.productId)})).filter(row=>row.product);
  const total=rows.reduce((sum,{line,product})=>sum+(product!.variants.find(v=>v.id===line.variantId)?.price_cents||0)*line.quantity,0);
  return <div className="container"><div className="page-intro"><span className="eyebrow">Votre sélection</span><h1>Panier</h1></div>{!rows.length?<div className="empty"><h2>Votre panier est vide</h2><p>Découvrez les premiers modèles Little Dream.</p><Link href="/collections" className="btn">Voir les bodies</Link></div>:<div className="split"><div>{rows.map(({line,product})=>{const variant=product!.variants.find(v=>v.id===line.variantId);return <div className="cart-row" key={line.key}><div className="product-visual"><BodyArt color={variant?.color_hex}/></div><div><h3>{product!.name}</h3><p>{variant?.color} · {variant?.size}</p>{line.design&&<small>Personnalisation enregistrée · {line.design.elements.length} élément(s)</small>}<div className="quantity"><button aria-label="Diminuer la quantité" onClick={()=>update(line.key,line.quantity-1)}>−</button><span>{line.quantity}</span><button aria-label="Augmenter la quantité" onClick={()=>update(line.key,line.quantity+1)}>+</button></div><p><button className="link" style={{border:0,background:'none'}} onClick={()=>remove(line.key)}>Supprimer</button></p></div><strong>{money((variant?.price_cents||0)*line.quantity)}</strong></div>})}</div><aside style={{background:'var(--cream)',padding:28,height:'fit-content'}}><h2 style={{fontSize:'2.5rem'}}>Récapitulatif</h2><p>Total produits <strong style={{float:'right'}}>{money(total)}</strong></p><div className="divider"/><p>Frais de livraison calculés lors de la configuration de la boutique.</p><Link className="btn" href="/commande">Continuer</Link><p className="notice" style={{marginTop:18}}>Aperçu de présentation : la commande et le paiement ne sont pas activés.</p></aside></div>}<div style={{height:100}}/></div>;
}
