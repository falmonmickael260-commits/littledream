'use client';
import Link from 'next/link';
export default function Favorites(){return <div className="container"><div className="page-intro"><span className="eyebrow">Votre sélection</span><h1>Favoris</h1></div><div className="empty"><h2>Vos favoris apparaîtront ici</h2><p>La sauvegarde des favoris sera ajoutée dans une prochaine étape.</p><Link className="btn" href="/collections">Découvrir les bodies</Link></div><div style={{height:100}}/></div>;}
