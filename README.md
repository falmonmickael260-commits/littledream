# Little Dream

Boutique française de bodies bébé 100 % coton. Le catalogue de démonstration comprend les formules Motif et Motif + Prénom, 32 illustrations et des packs configurables de une à trois pièces.

## Démarrage

Avec Node.js 22 ou 24, lancer `npm ci`, puis `npm run dev`. Ouvrir http://localhost:3000. Pour vérifier la version de production, lancer `npm run typecheck` et `npm run build`, puis `npm start`.

## Utilisation

- La boutique se trouve sous `/collections`. Le studio associe une composition 2D éditable à un aperçu 3D rotatif chargé à la demande et à un export PNG transparent.
- Sous `/packs`, chaque pièce possède ses propres options. Le panier conserve le pack dans le navigateur et permet de le rouvrir.
- Sous `/admin`, le catalogue de motifs est géré dans le navigateur courant. Un PNG publié devient disponible dans la collection et le studio de ce navigateur. Une publication partagée nécessite un stockage durable avec contrôle d’accès administrateur.
- Les prix des six déclinaisons sont définis en centimes dans `src/lib/offer-pricing.ts`. Les tarifs de démonstration sont de 17,99 € et 19,99 € par pièce. Un tarif Duo ou Trio laissé à null utilise le multiple du prix unitaire.

## Avant ouverture commerciale

Renseigner les prix des packs et les données réelles de stock, remplacer la photo de démonstration par les photos produit et atelier, confirmer l’entretien, les détails de livraison et les conditions de vente. Valider avec l’imprimeur les dimensions de la zone de marquage et les PNG calculés à 300 ppp. L’aperçu 3D est un modèle de présentation.

La validation des commandes et les paiements restent en démonstration. Le connecteur Supabase du catalogue existant peut être configuré à partir de `.env.example`. Le catalogue de motifs de démonstration et le panier restent stockés côté navigateur.

Photo de démonstration par Mediamodifier sur [Unsplash](https://unsplash.com/photos/babys-white-and-blue-onesie-fdPlZXc-ZwU).
