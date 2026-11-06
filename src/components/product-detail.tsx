'use client';
import { useState } from 'react';
import type { CatalogProduct } from '@/lib/types';
import { BodyArt } from './body-art';
import { ProductOptions } from './product-options';
export function ProductDetail({product}:{product:CatalogProduct}){const [color,setColor]=useState(product.variants[0]?.color_hex||'#FFFDF9');return <div className="split"><div className="product-stage"><BodyArt color={color}/></div><div className="product-detail"><span className="eyebrow">{product.category==='body'?'Body bébé':product.category}</span><h1>{product.name}</h1>{product.preview&&<p className="notice">Visuel produit illustratif · photo du modèle à ajouter</p>}<p className="lead">{product.description}</p><ProductOptions product={product} onColorChange={setColor}/><div className="divider"/><details><summary>Composition et entretien</summary><p className="prose">{product.composition}<br/>{product.care}</p></details><div className="divider"/><details><summary>Livraison et préparation</summary><p className="prose">Les délais et frais de livraison seront précisés avant ouverture de la commande.</p></details></div></div>;}
