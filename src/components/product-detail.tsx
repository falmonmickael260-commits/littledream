'use client';
import { useState } from 'react';
import type { CatalogProduct } from '@/lib/types';
import { PhotoBody } from './photo-body';
import { ProductOptions } from './product-options';
export function ProductDetail({product}:{product:CatalogProduct}){const [color,setColor]=useState(product.variants[0]?.color_hex||'#FFFDF9');return <div className="split"><div className="product-stage"><PhotoBody color={color}/></div><div className="product-detail"><span className="eyebrow">{product.category==='body'?'Body bébé':product.category}</span><h1>{product.name}</h1>{product.preview&&<p className="notice">Photo de présentation · couleur simulée sur la photo. À remplacer par une photo de votre produit avant vente.</p>}<p className="lead">{product.description}</p><ProductOptions product={product} onColorChange={setColor}/><div className="divider"/><details><summary>Composition et entretien</summary><p className="prose">{product.composition}<br/>{product.care}</p></details><div className="divider"/><details><summary>Livraison et préparation</summary><p className="prose">Les délais et frais de livraison seront précisés avant ouverture de la commande.</p></details></div></div>;}
