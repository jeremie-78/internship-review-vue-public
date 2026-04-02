# Branche nuxt-01-setup : Préparer la home Nuxt

## 🎯 Objectifs d'apprentissage

À la fin de cette branche, vous serez capable de :

- ✅ Démarrer une application Nuxt et comprendre sa structure de base
- ✅ Identifier où créer une page, un composant, et un layout dans un projet Nuxt
- ✅ Créer une page “home” et une page “results” avec le routing par fichiers
- ✅ Reproduire une page d’accueil “équivalente” à l’app Vue (structure + composants)

## 📚 Concepts théoriques nécessaires

Avant de commencer, assurez-vous d'avoir lu et compris :

1. [Introduction à Nuxt (vs Vue)](../../../course/nuxt/01-introduction-nuxt.md) - Ce que Nuxt ajoute et comment s’orienter dans le projet
2. [Routing, pages et layouts](../../../course/nuxt/02-routing-pages-layouts.md) - Pages = routes, layouts, organisation
3. [Composants et Props](../../../course/02-components-props.md) - Créer des composants réutilisables
4. [Events et Communication](../../../course/03-events-communication.md) - Communication parent/enfant
5. [v-model](../../../course/04-v-model.md) - Liaison bidirectionnelle pour les formulaires

## 📋 Vue d'ensemble de la branche

Dans cette branche, vous allez préparer la branche suivante (`nuxt-02-home`) avec :

- Une page d’accueil Nuxt qui ressemble à la home de l’app Vue
- Un composant de recherche réutilisable (même rôle que dans l’app Vue)
- Une page `results` accessible via une route dédiée
- Un layout commun (header / footer) si c’est pertinent pour votre UI

## 🛠️ Consignes étape par étape

### Étape 1 : Démarrer l’app Nuxt et repérer les dossiers

**Objectif** : Être capable de vous orienter dans l’app Nuxt.

1. Lancez l’application Nuxt et vérifiez qu’elle démarre correctement.
2. Repérez les dossiers importants du projet :
   - Où se trouvent les pages (routes)
   - Où se trouvent les composants réutilisables
   - Où se trouve la structure commune (layout)

**Point de contrôle** : Vous savez où modifier le code pour changer une page, un composant, ou le layout.

---

### Étape 2 : Mettre en place la page d’accueil

**Objectif** : Avoir une page d’accueil Nuxt qui reprend la structure de la home Vue.

1. Créez/complétez la page d’accueil :
   - Un titre principal + une description (section “hero”)
   - Une zone qui accueille la barre de recherche
   - Une section d’information (cartes/arguments) si elle existe côté Vue

2. Assurez-vous que la page d’accueil est claire et responsive.

**Point de contrôle** : La page d’accueil s’affiche et ressemble globalement à celle de l’app Vue.

---

### Étape 3 : Créer le composant de recherche

**Objectif** : Avoir une barre de recherche réutilisable.

1. Créez un composant de barre de recherche :
   - L’utilisateur peut saisir une recherche
   - Le bouton d’action est désactivé si la saisie est vide
   - La soumission ne doit pas provoquer un rechargement complet de la page

2. La barre de recherche doit pouvoir avertir la page qui l’utilise quand l’utilisateur lance une recherche.

**Point de contrôle** : Depuis la home, vous pouvez lancer une recherche et constater que l’action est bien déclenchée.

---

### Étape 4 : Ajouter une page `results`

**Objectif** : Avoir une page dédiée pour afficher des résultats.

1. Créez une page de résultats accessible via une URL dédiée.
2. Ajoutez un contenu minimal (titre + zone liste “placeholder”) pour préparer le cours suivant.
3. Ajoutez un moyen de naviguer vers cette page depuis la home.

**Point de contrôle** : Vous pouvez aller sur la page results via un lien/bouton depuis la home.

---

## ✅ Checklist de validation

Avant de passer à la branche suivante (`nuxt-02-home`), vérifiez que :

- [ ] L’app Nuxt démarre sans erreur
- [ ] La page d’accueil existe et reprend la structure de l’app Vue
- [ ] Le composant de recherche est réutilisable et déclenche une action de recherche
- [ ] La page `results` est accessible via une URL dédiée
- [ ] La navigation home → results fonctionne
- [ ] Aucune erreur dans la console du navigateur

## 🧪 Tests à effectuer

1. **Test home** :
   - Ouvrez la page d’accueil
   - Vérifiez l’affichage (desktop + mobile)

2. **Test barre de recherche** :
   - Tapez du texte et déclenchez l’action
   - Vérifiez que le bouton est désactivé quand la saisie est vide

3. **Test navigation** :
   - Depuis la home, allez vers results
   - Revenez à la home (logo ou lien)

## 📝 Notes importantes

- **Objectif de la branche** : préparer une base propre (pages + composants) pour brancher la récupération des offres au cours suivant.
- **Référence utile** : gardez l’app Vue ouverte pour comparer “où se trouve quoi” (page, composant, layout).
- **Consultez les cours** : si vous bloquez, relisez les cours Nuxt listés plus haut.

## 🚀 Prochaine étape

Une fois cette branche terminée et validée, vous pouvez passer à la branche suivante : **nuxt-02-home**

Sur cette branche, vous trouverez le code complet de ce que vous venez de créer, et la documentation pour la prochaine étape.
