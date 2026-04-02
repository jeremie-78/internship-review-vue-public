# Branche nuxt-02-home : préparer l’écran “Offres”

## 🎯 Objectifs d'apprentissage

À la fin de cette branche, vous serez capable de :

- ✅ Créer un composant `OfferCard` pour afficher les informations d’une offre
- ✅ Créer une page `results` accessible via l’URL `/results`
- ✅ Afficher une liste d’offres sous forme de cartes (grille responsive) sur la page `results`
- ✅ Connecter la home au bouton / action de recherche pour naviguer vers `/results`
- ✅ Préparer `results` pour que l’on puisse remplacer facilement les données de démonstration par de vraies données dans la branche suivante

## 📚 Concepts théoriques nécessaires

Avant de commencer, assurez-vous d'avoir lu et compris :

1. [Composants et Props](../../../course/02-components-props.md) - Créer des composants réutilisables et passer des données
2. [Introduction à Vue.js](../../../course/01-introduction.md) - Afficher des listes, structure des vues
3. [Events et Communication](../../../course/03-events-communication.md) - Écouter et propager des événements entre composants
4. [Routing, pages et layouts](../../../course/nuxt/02-routing-pages-layouts.md) - Comprendre comment naviguer entre pages et organiser le projet
5. [Introduction à Nuxt (vs Vue)](../../../course/nuxt/01-introduction-nuxt.md) - Repères pour savoir où trouver les éléments dans un projet Nuxt
6. [Composables Nuxt](../../../course/nuxt/03-composables-nuxt.md) - Isoler la logique d’accès aux données dans un composable
7. [Data fetching avec `$fetch`](../../../course/nuxt/04-fetch-nuxt.md) - Charger des données et gérer loading/erreur

## 📋 Vue d'ensemble de la branche

Dans cette branche, vous allez préparer `nuxt-03-offers` avec :

- Un composant `OfferCard` (UI d’une carte d’offre)
- Une page `results` (structure + affichage d’une liste de cartes)
- Une navigation fonctionnelle depuis la home vers `/results`
- Des données de démonstration affichées dans la page `results` (pour valider l’UI avant la récupération réelle)

## 🛠️ Consignes étape par étape

### Étape 1 : Créer le composant `OfferCard`

**Objectif** : Avoir une carte d’offre réutilisable pour afficher une offre de stage.

1. Créez le composant `OfferCard`.
2. La carte doit afficher :
   - le titre de l’offre
   - le nom de l’entreprise
   - la localisation
   - le type (avec un style visuel type “badge”)
3. La carte doit avoir un rendu “carte” (bordures, ombre/contraste, espacement) et rester lisible sur mobile.

**Point de contrôle** : Une offre test affichée dans `OfferCard` apparaît avec toutes les informations demandées.

---

### Étape 2 : Créer la page `results` (structure + affichage de liste)

**Objectif** : Avoir un écran `/results` qui affiche des offres sous forme de cartes.

1. Créez une page accessible via `/results`.
2. La page doit afficher :
   - un titre clair “Offres” (ou équivalent)
   - une zone qui contient une grille de cartes
3. Utilisez une source temporaire de données pour afficher une liste d’offres sur la page `results`.
4. Assurez-vous que l’affichage est responsive :
   - 1 colonne sur mobile
   - plusieurs colonnes sur écrans plus larges

**Point de contrôle** : En allant sur `/results`, vous voyez une grille de cartes d’offres correctement affichée.

---

### Étape 3 : Naviguer depuis la home vers `/results`

**Objectif** : Vérifier que l’utilisateur peut aller vers l’écran des offres depuis l’écran d’accueil.

1. Sur la home, connectez l’action de recherche (bouton ou soumission) à une navigation vers `/results`.
2. Le comportement attendu pour cette branche : la navigation doit fonctionner, même si la recherche n’est pas encore “fonctionnelle” au sens filtrage.

**Point de contrôle** : Depuis la home, l’action de recherche mène bien à `/results`.

---

### Étape 4 : Préparer le remplacement des données (pour la branche suivante)

**Objectif** : S’assurer que `results` est prêt pour intégrer le chargement réel des offres dans `nuxt-03-offers`.

1. Gardez l’interface de la page `results` stable (titre, grille de cartes, rendu des `OfferCard`).
2. Organisez le code pour que remplacer la source de données par de vraies données soit simple (sans devoir réécrire l’UI).

**Point de contrôle** : Vous pouvez remplacer la source de données de démonstration sans casser l’affichage de la grille.

## ✅ Checklist de validation

Avant de passer à la branche suivante (`nuxt-03-offers`), vérifiez que :

- [ ] Le composant `OfferCard` affiche toutes les infos d’une offre
- [ ] La page `/results` existe et affiche le titre et une grille de cartes
- [ ] La page `results` affiche une liste d’offres (données de démonstration acceptées)
- [ ] L’affichage de la grille est responsive
- [ ] La home navigue vers `/results` via l’action de recherche
- [ ] Aucune erreur bloquante dans la console du navigateur

## 🧪 Tests à effectuer

1. **Test navigation home → results** :
   - Aller sur la home
   - Soumettre la recherche (ou cliquer sur le bouton)
   - Vérifier qu’on arrive bien sur `/results`

2. **Test rendu `results`** :
   - Ouvrir `/results`
   - Vérifier qu’on voit bien une grille de cartes
   - Vérifier sur mobile et desktop

3. **Test intégration UI `OfferCard`** :
   - Vérifier qu’une carte affiche titre / entreprise / localisation / type

## 📝 Notes importantes

- Dans cette branche, l’objectif est d’installer le “visuel + structure” de l’écran Offres.
- Le chargement réel des offres (et les états de chargement / erreur) sera traité dans `nuxt-03-offers`.

## 🚀 Prochaine étape

Une fois cette branche terminée et validée, vous pouvez passer à la branche suivante : **nuxt-03-offers**

