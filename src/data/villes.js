/**
 * villes.js
 * ---------
 * Contenu des pages locales (/creation-site-internet-<ville>).
 * Utilisé par la page LocalPage, le footer et le pré-rendu (scripts/prerender.js).
 * Chaque page doit garder un contenu propre à sa ville : des pages
 * quasi identiques seraient traitées par Google comme des pages satellites.
 */

export const VILLES = [
  {
    slug: 'creation-site-internet-rodez',
    ville: 'Rodez',
    title: 'Création Site Internet Rodez · Développeur Web Freelance | Zdr_DEV',
    description: 'Développeur web basé à Rodez : création de sites internet sur mesure pour artisans, commerçants et restaurateurs du Grand Rodez. Rendez-vous en personne, devis gratuit sous 24h.',
    h1: 'Création de site internet',
    h1Accent: 'à Rodez',
    intro: [
      'Je suis développeur web freelance installé à Rodez. Je crée des sites internet sur mesure pour les artisans, commerçants, restaurateurs et indépendants du Grand Rodez : un site rapide, pensé pour le mobile et optimisé pour qu\'on vous trouve sur Google quand on cherche votre métier « à Rodez ».',
      'Travailler avec un développeur ruthénois, c\'est pouvoir se rencontrer autour d\'un café en centre-ville ou directement dans votre boutique ou votre atelier, et avoir le même interlocuteur du premier rendez-vous jusqu\'à la maintenance.',
    ],
    publicTitle: 'Pour les professionnels du Grand Rodez',
    publics: [
      {
        title: 'Commerces du centre-ville',
        desc: 'Boutiques du Bourg et du piétonnier : un site qui donne vos horaires, vos nouveautés et l\'itinéraire, pour transformer une recherche Google en visite en magasin.',
      },
      {
        title: 'Artisans et entreprises du bâtiment',
        desc: 'Plombiers, électriciens, menuisiers d\'Onet-le-Château, Olemps ou Luc-la-Primaube : vos réalisations en photos et un formulaire de devis qui vous apporte des demandes qualifiées.',
      },
      {
        title: 'Restaurants et métiers de bouche',
        desc: 'Menu à jour, réservation en ligne, click & collect : ce que cherchent les Ruthénois comme les visiteurs venus pour la cathédrale ou le musée Soulages.',
      },
    ],
    approcheTitle: 'Un développeur web sur place',
    approche: 'Basé à Rodez, je me déplace chez vous dans toute l\'agglomération pour le premier rendez-vous, la présentation des maquettes et la formation à la prise en main de votre site. Pas de visioconférence imposée, pas d\'agence lointaine : on avance ensemble, à votre rythme.',
    communes: ['Onet-le-Château', 'Olemps', 'Le Monastère', 'Luc-la-Primaube', 'Druelle Balsac', 'Sainte-Radegonde', 'Sébazac-Concourès'],
    faq: [
      {
        q: 'Où vous rencontrer à Rodez ?',
        a: 'Je viens chez vous, dans votre commerce, votre atelier ou votre restaurant, partout dans le Grand Rodez. On peut aussi se retrouver en centre-ville si vous préférez.',
      },
      {
        q: 'Mon site apparaîtra-t-il quand on cherche mon métier à Rodez ?',
        a: 'Votre site est construit pour les recherches locales : titres et textes qui citent votre métier et Rodez, données structurées, lien avec votre fiche Google Business Profile. Le positionnement se construit ensuite sur quelques semaines.',
      },
      {
        q: 'Travaillez-vous aussi avec les communes autour de Rodez ?',
        a: 'Oui : Onet-le-Château, Olemps, Le Monastère, Luc-la-Primaube, Sébazac-Concourès et toute l\'agglomération, ainsi que le reste de l\'Aveyron.',
      },
    ],
  },
  {
    slug: 'creation-site-internet-millau',
    ville: 'Millau',
    title: 'Création Site Internet Millau · Développeur Web Aveyron | Zdr_DEV',
    description: 'Création de sites internet à Millau et dans le Sud-Aveyron pour artisans, commerçants, restaurateurs et activités touristiques. Développeur web aveyronnais, devis gratuit sous 24h.',
    h1: 'Création de site internet',
    h1Accent: 'à Millau',
    intro: [
      'Vous êtes artisan, commerçant, restaurateur ou prestataire d\'activités à Millau ou dans le Sud-Aveyron ? Je crée votre site internet sur mesure : clair, rapide sur mobile et pensé pour être trouvé sur Google, aussi bien par les Millavois que par les visiteurs de passage.',
      'À Millau, une bonne partie de la clientèle arrive avec la saison : randonneurs, grimpeurs, amateurs de parapente ou de canoë dans les gorges du Tarn. Votre site doit répondre à leurs questions avant même qu\'ils arrivent : où, quand, combien, comment réserver.',
    ],
    publicTitle: 'Pour les professionnels du Sud-Aveyron',
    publics: [
      {
        title: 'Activités de pleine nature et tourisme',
        desc: 'Parapente, escalade, canoë, gîtes et chambres d\'hôtes : présentation claire de vos offres, calendrier et réservation en ligne pour remplir la saison.',
      },
      {
        title: 'Savoir-faire et artisanat',
        desc: 'Ganterie, travail du cuir, producteurs du Larzac ou du Rayon de Roquefort : un site qui raconte votre savoir-faire et peut vendre en ligne avec le click & collect.',
      },
      {
        title: 'Commerces et restaurants',
        desc: 'Du centre-ville aux bords du Tarn : menu, horaires de saison et itinéraire à jour pour capter les visiteurs qui cherchent « où manger à Millau ».',
      },
    ],
    approcheTitle: 'Comment on travaille ensemble',
    approche: 'Je viens à Millau pour le premier rendez-vous et la remise du site, chez vous ou sur votre lieu d\'activité. Entre les deux, on avance par téléphone et par email, avec des maquettes que vous validez étape par étape. Votre site est en ligne en 2 semaines maximum, idéalement avant le début de la saison.',
    communes: ['Creissels', 'Aguessac', 'Saint-Georges-de-Luzençon', 'Roquefort-sur-Soulzon', 'Saint-Affrique', 'Nant'],
    faq: [
      {
        q: 'Vous déplacez-vous jusqu\'à Millau ?',
        a: 'Oui, je me déplace à Millau et dans le Sud-Aveyron pour le premier rendez-vous et la livraison de votre site. Le reste du suivi se fait par téléphone et par email.',
      },
      {
        q: 'Mon activité est saisonnière : quand lancer mon site ?',
        a: 'Idéalement quelques semaines avant la saison, pour laisser à Google le temps d\'indexer le site. Comptez 2 semaines de création, puis la mise à jour de vos offres et tarifs de l\'année.',
      },
      {
        q: 'Puis-je proposer la réservation en ligne ?',
        a: 'Oui, c\'est prévu dans l\'offre Le Terroir : réservation, catalogue d\'activités ou de produits et click & collect, avec un référencement local avancé.',
      },
    ],
  },
  {
    slug: 'creation-site-internet-villefranche-de-rouergue',
    ville: 'Villefranche-de-Rouergue',
    title: 'Création Site Internet Villefranche-de-Rouergue | Zdr_DEV',
    description: 'Création de sites internet à Villefranche-de-Rouergue et dans l\'Ouest-Aveyron pour artisans, commerçants, producteurs et restaurateurs. Développeur web aveyronnais, devis gratuit.',
    h1: 'Création de site internet',
    h1Accent: 'à Villefranche-de-Rouergue',
    intro: [
      'Je crée des sites internet sur mesure pour les professionnels de Villefranche-de-Rouergue et de l\'Ouest-Aveyron : artisans, commerçants de la bastide, producteurs, restaurateurs et hébergeurs.',
      'Le marché du jeudi sur la place Notre-Dame, les visiteurs de la bastide et de la vallée de l\'Aveyron jusqu\'à Najac : votre clientèle vous cherche sur son téléphone avant de se déplacer. Votre site doit lui donner envie de venir, et lui dire comment.',
    ],
    publicTitle: 'Pour les professionnels de l\'Ouest-Aveyron',
    publics: [
      {
        title: 'Commerces de la bastide',
        desc: 'Boutiques et cafés autour de la place Notre-Dame : horaires, nouveautés, événements et itinéraire, pour être trouvé par les habitants comme par les touristes.',
      },
      {
        title: 'Producteurs et circuits courts',
        desc: 'Exposants du marché, vente à la ferme : un catalogue simple, la commande en click & collect et les jours où l\'on peut vous trouver.',
      },
      {
        title: 'Artisans et hébergeurs',
        desc: 'Artisans du bâtiment, gîtes et chambres d\'hôtes entre Villefranche et Najac : photos de vos réalisations ou de vos chambres, demandes de devis et de réservation.',
      },
    ],
    approcheTitle: 'Comment on travaille ensemble',
    approche: 'Je me déplace à Villefranche-de-Rouergue pour le premier rendez-vous et la remise de votre site. Entre les deux, je vous envoie des maquettes à valider et on échange par téléphone ou par email. Vous êtes formé à la prise en main du site pour rester autonome au quotidien.',
    communes: ['Villeneuve', 'Najac', 'Rieupeyroux', 'Martiel', 'Morlhon-le-Haut', 'Savignac'],
    faq: [
      {
        q: 'Intervenez-vous à Villefranche-de-Rouergue ?',
        a: 'Oui, je me déplace à Villefranche-de-Rouergue et dans l\'Ouest-Aveyron pour le premier rendez-vous et la livraison de votre site.',
      },
      {
        q: 'Je vends sur les marchés : un site m\'est-il utile ?',
        a: 'Oui : il permet à vos clients de retrouver vos produits, vos jours de marché et de commander à l\'avance en click & collect, même quand vous n\'êtes pas sur la place.',
      },
      {
        q: 'Mon site sera-t-il visible des touristes ?',
        a: 'Le site est optimisé pour les recherches locales (« à Villefranche-de-Rouergue », « près de Najac »…) et pour le mobile, ce qu\'utilisent les visiteurs pour choisir où aller.',
      },
    ],
  },
  {
    slug: 'creation-site-internet-decazeville',
    ville: 'Decazeville',
    title: 'Création Site Internet Decazeville · Développeur Web | Zdr_DEV',
    description: 'Création de sites internet à Decazeville, Aubin, Cransac et dans le Bassin pour artisans, commerçants et restaurateurs. Développeur web aveyronnais, devis gratuit sous 24h.',
    h1: 'Création de site internet',
    h1Accent: 'à Decazeville',
    intro: [
      'Je crée des sites internet sur mesure pour les artisans, commerçants, restaurateurs et indépendants de Decazeville et du Bassin : Aubin, Cransac, Firmi, Viviez et les communes alentour.',
      'Dans le Bassin, beaucoup d\'entreprises vivent du bouche-à-oreille. Un site internet prend le relais : il rassure ceux qui ont entendu parler de vous et vous rend visible pour ceux qui cherchent votre métier sur Google, notamment les nouveaux habitants et les curistes de Cransac.',
    ],
    publicTitle: 'Pour les professionnels du Bassin',
    publics: [
      {
        title: 'Artisans et dépannage',
        desc: 'Bâtiment, mécanique, dépannage : votre zone d\'intervention, vos réalisations en photos et un bouton d\'appel direct sur mobile.',
      },
      {
        title: 'Commerces de proximité',
        desc: 'Commerces de Decazeville et d\'Aubin : horaires, services et actualités à jour pour rester le premier réflexe des habitants du Bassin.',
      },
      {
        title: 'Santé, bien-être et accueil',
        desc: 'Praticiens, instituts, hébergements pour les curistes de Cransac : prise de rendez-vous ou de réservation et informations pratiques claires.',
      },
    ],
    approcheTitle: 'Comment on travaille ensemble',
    approche: 'Je me déplace à Decazeville et dans le Bassin pour le premier rendez-vous et la remise du site. Le suivi se fait ensuite par téléphone et par email, avec des maquettes validées par vous à chaque étape et un site en ligne en 2 semaines maximum.',
    communes: ['Aubin', 'Cransac', 'Firmi', 'Viviez', 'Livinhac-le-Haut', 'Capdenac-Gare'],
    faq: [
      {
        q: 'Vous déplacez-vous jusqu\'à Decazeville ?',
        a: 'Oui, je me déplace à Decazeville et dans tout le Bassin pour le premier rendez-vous et la livraison de votre site.',
      },
      {
        q: 'Je travaille surtout par bouche-à-oreille : pourquoi un site ?',
        a: 'Parce que la plupart des gens vérifient sur Google avant d\'appeler. Un site professionnel confirme votre sérieux et vous fait aussi découvrir par ceux qui ne vous connaissent pas encore.',
      },
      {
        q: 'Mes clients pourront-ils m\'appeler directement depuis le site ?',
        a: 'Oui, le site affiche votre numéro en bouton d\'appel sur mobile, avec votre zone d\'intervention et un formulaire de demande de devis.',
      },
    ],
  },
];

export const getVille = (slug) => VILLES.find((v) => v.slug === slug);
