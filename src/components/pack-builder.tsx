'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from './cart-provider';
import { BodyArt } from './body-art';
import { ILLUSTRATIONS } from '@/lib/illustrations';
import { money } from '@/lib/constants';
import { packPrice, type Offer, type PackSize } from '@/lib/offer-pricing';
import type { BodyPack, CatalogProduct, PackPiece } from '@/lib/types';

export function PackBuilder(props:{products:CatalogProduct[];editKey?:string;selection?:string}) {
  const cart = useCart();
  if (!cart.ready) return <p className="container">Chargement du pack…</p>;
  const saved = cart.lines.find(line => line.key === props.editKey)?.pack;
  if(props.editKey && !saved) return <p className="container">Ce pack est introuvable dans votre panier.</p>;
  return <Editor {...props} saved={saved}/>;
}

function Editor({products,editKey,saved,selection}:{products:CatalogProduct[];editKey?:string;saved?:BodyPack;selection?:string}) {
  const router = useRouter();
  const {savePack} = useCart();
  const [offer,setOffer] = useState<Offer>(saved?.offer ?? 'motif');
  const product = products.find(p=>p.slug === (offer==='motif'?'body-bebe-doux':'body-bebe-personnalise'));
  const variants = product?.variants ?? [];
  const fresh = (index:number):PackPiece => ({size:variants[0]?.size ?? '',color:variants[0]?.color ?? '',motif:ILLUSTRATIONS[index].id,name:''});
  const [pieces,setPieces] = useState<PackPiece[]>(()=>saved?.pieces ?? (selection==='ciel'?[1,5,7]:selection==='animaux'?[0,4]:[0]).map(fresh));
  const price = packPrice(offer,pieces.length as PackSize);
  function change(index:number,patch:Partial<PackPiece>) {
    setPieces(old=>old.map((piece,i)=>i===index?{...piece,...patch}:piece));
  }
  return <main className="container"><div className="page-intro"><h1>Créer mon pack</h1><p>Composez chaque body en coton, pour un bébé ou toute une fratrie.</p></div><form onSubmit={event=>{
    event.preventDefault();
    const variant = variants.find(v=>v.color===pieces[0].color && v.size===pieces[0].size);
    if(product && variant){savePack(product.id,variant.id,{offer,pieces:pieces.map(p=>({...p,name:offer==='motif'?'':p.name.trim()}))},editKey);router.push('/panier');}
  }}>
  <label className="field">Votre formule<select value={offer} onChange={e=>setOffer(e.target.value as Offer)}><option value="motif">Motif · 17,99 € par body</option><option value="motif-prenom">Motif + Prénom · 19,99 € par body</option></select></label>
  <div className="sizes">{['Solo','Duo','Trio'].map((size,i)=><button type="button" className="size" aria-pressed={pieces.length===i+1} key={size} onClick={()=>setPieces(old=>Array.from({length:i+1},(_,j)=>old[j]??fresh(j)))}>{size} · {i+1}</button>)}</div>
  {pieces.map((piece,index)=>{
    const motif=ILLUSTRATIONS.find(m=>m.id===piece.motif)!;
    const variant=variants.find(v=>v.color===piece.color);
    return <fieldset key={index} style={{marginBlock:24,padding:20,border:'1px solid var(--line)'}}><legend>Body {index+1}</legend><div className="split"><div style={{position:'relative',width:'100%',maxWidth:280,margin:'auto'}}><BodyArt color={variant?.color_hex}/><img src={motif.src} alt={motif.name} style={{position:'absolute',top:'30%',left:'34%',width:'32%'}}/><strong style={{position:'absolute',top:'59%',left:'15%',width:'70%',textAlign:'center'}}>{offer==='motif-prenom'&&piece.name}</strong></div><div>
    <label className="field">Illustration<select value={piece.motif} onChange={e=>change(index,{motif:e.target.value})}>{ILLUSTRATIONS.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select></label>
    <label className="field">Couleur<select value={piece.color} onChange={e=>change(index,{color:e.target.value})}>{[...new Set(variants.map(v=>v.color))].map(c=><option key={c}>{c}</option>)}</select></label>
    <label className="field">Taille<select value={piece.size} onChange={e=>change(index,{size:e.target.value})}>{variants.filter(v=>v.color===piece.color).map(v=><option key={v.id}>{v.size}</option>)}</select></label>
    {offer==='motif-prenom'&&<label className="field">Prénom<input required pattern={".*\\S.*"} maxLength={24} value={piece.name} onChange={e=>change(index,{name:e.target.value})}/></label>}
    {index>0&&<button className="size" type="button" onClick={()=>change(index,{...pieces[index-1]})}>Reprendre le body précédent</button>}</div></div></fieldset>;
  })}
  <button className="btn" style={{marginBottom:48}} disabled={!product || pieces.some(p=>!variants.some(v=>v.color===p.color&&v.size===p.size))}>{editKey?'Enregistrer les modifications':'Ajouter le pack au panier'} · {money(price)}</button></form></main>;
}
