import Link from 'next/link';
export default function Fabrication(){
  return <main className="container"><article className="page-intro"><h1>Notre fabrication</h1><h2>Le body en coton</h2><p>La base de chaque création Little Dream est un body 100 % coton. Choisissez sa taille et sa couleur avant de composer son illustration.</p><h2>Du dessin au vêtement</h2><p>Dans le studio, placez votre motif et ajoutez le prénom de bébé selon la formule choisie. L’aperçu vous permet de relire le prénom et de vérifier son emplacement.</p><h2>Le fichier d’impression</h2><p>La composition est exportée sur fond transparent pour préparer le visuel à imprimer sur le tissu.</p><Link className="btn" href="/personnaliser/body-bebe-personnalise">Ouvrir le studio</Link></article></main>;
}
