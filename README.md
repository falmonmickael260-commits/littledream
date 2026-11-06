# Little Dream

Boutique de présentation construite avec Next.js App Router, TypeScript, Tailwind CSS, Motion, GSAP, Konva et Supabase (à connecter).

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000.

## Aperçu actuel

- Accueil et navigation multipage en français.
- Deux bodies de présentation : body bébé doux à 16,90 € et body bébé personnalisé à 30 €.
- Variantes visuelles en quatre couleurs et six tailles. Les stocks affichés sont des données locales de présentation, pas un inventaire réel.
- Fiches produit, studio de composition (texte, motifs vectoriels, déplacement, réglages, annuler/refaire), export PNG transparent à 300 dpi.
- Panier conservé dans le navigateur et pages d’information / espace client en attente de configuration.
- Illustrations SVG originales provisoires ; aucune photographie produit réelle n’est fournie.

Le mode local est destiné à présenter l’interface. Aucun paiement ni commande réelle n’est effectué. Les prix saisis sont ceux communiqués pour l’aperçu ; les détails commerciaux restent à confirmer.

## Scripts

```bash
npm run dev
npm run typecheck
npm run build
npm start
```

## Configuration future

Copier `.env.example` vers `.env.local` et renseigner les variables Supabase avant d’activer le catalogue connecté. Ne jamais exposer une clé `service_role` au navigateur.

À connecter avant l’ouverture : projet Supabase et migrations/RLS, authentification, gestion des produits et stocks, stockage des médias, commandes et génération des fichiers de production, prestataire de paiement et webhooks, livraison, consentement, adresse de contact, mentions légales et CGV. Stripe et PayPal ne sont pas configurés.


## État

L’aperçu visuel, la navigation, les fiches de présentation, le studio client et le panier local sont implémentés. L’administration, les comptes authentifiés, le checkout, les migrations Supabase et le paiement ne sont pas implémentés. Le PNG DTF est une première sortie de travail : il doit être vérifié avec les polices et les exigences de l’imprimeur avant production.
