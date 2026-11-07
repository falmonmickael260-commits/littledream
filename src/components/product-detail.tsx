'use client';
import { useState } from 'react';
import type { CatalogProduct } from '@/lib/types';
import { PhotoBody } from './photo-body';
import { ProductOptions } from './product-options';
export function ProductDetail({product}:{product:CatalogProduct}){return <div className="split"><div className="product-stage"><PhotoBody/></div><div className="product-detail"><span className="eyebrow">{product.category==='body'?'Body bébé':product.category}</span><h1>{product.name}</h1>{product.preview&&<p className="notice">Photo de présentation, non contractuelle. Une photo de votre modèle remplacera ce visuel avant la vente.</p>}<p className="lead">{product.description}</p><ProductOptions product={product}/><div className="divider"/><details><summary>Composition et entretien</summary><p className="prose">{product.composition}<br/>{product.care}</p></details><div className="divider"/><details><summary>Livraison et préparation</summary><p className="prose">Les délais et frais de livraison seront précisés avant ouverture de la commande.</p></details></div></div>;}
