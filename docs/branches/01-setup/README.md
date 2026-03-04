# Branche Setup : Préparation pour la page d'accueil

## 🎯 Objectifs d'apprentissage

À la fin de cette branche, vous serez capable de :

- ✅ Créer un composant Vue réutilisable
- ✅ Utiliser `v-model` pour la liaison bidirectionnelle
- ✅ Émettre des événements depuis un composant enfant
- ✅ Écouter des événements dans un composant parent
- ✅ Créer des composants de layout (Header, Footer, AppLayout)
- ✅ Structurer une page Vue avec plusieurs sections
- ✅ Utiliser Tailwind CSS pour le styling

## 📚 Concepts théoriques nécessaires

Avant de commencer, assurez-vous d'avoir lu et compris :

1. [Introduction à Vue.js](../../course/01-introduction.md) - Bases de Vue.js, réactivité, directives
2. [Composants et Props](../../course/02-components-props.md) - Comment créer des composants
3. [Events et Communication](../../course/03-events-communication.md) - Communication parent-enfant avec events
4. [v-model](../../course/04-v-model.md) - Liaison bidirectionnelle pour les formulaires
5. [Vue Router](../../course/05-vue-router.md) - Navigation et routing dans l'application
6. [Fetch API et async/await](../../course/06-fetch-api.md) - Requêtes HTTP et données asynchrones

## 📋 Vue d'ensemble de la branche

Dans cette branche, vous allez créer la page d'accueil complète de l'application avec :

- Un composant de barre de recherche (`SearchBar`) qui émet un événement
- Des composants de layout (`Header`, `Footer`, `AppLayout`)
- Une page d'accueil (`HomePage`) qui utilise le composant SearchBar
- Une section hero avec titre et description
- Des sections d'information avec icônes

## 🛠️ Consignes étape par étape

### Étape 1 : Créer le composant SearchBar

**Objectif** : Créer un composant de recherche réutilisable qui émet un événement.

1. Créez le fichier `src/components/SearchBar.vue`

2. Le composant doit gérer un champ de recherche :
   - L'utilisateur doit pouvoir taper dans un champ de texte
   - La valeur tapée doit être stockée et accessible
   - Le champ doit être lié à la valeur stockée (liaison bidirectionnelle)

3. Le composant doit émettre un événement quand l'utilisateur soumet la recherche :
   - Créer une fonction qui gère la soumission
   - Vérifier que la requête n'est pas vide (après avoir retiré les espaces)
   - Émettre un événement avec la valeur de la requête

4. Le composant doit avoir un formulaire avec :
   - Un champ de saisie pour la recherche
   - Un bouton pour soumettre la recherche
   - Le formulaire ne doit pas recharger la page lors de la soumission
   - Le bouton doit être désactivé si le champ est vide

5. Stylisez le composant :
   - Formulaire qui s'adapte aux différentes tailles d'écran (colonne sur mobile, ligne sur desktop)
   - Champ de saisie avec bordures et états visuels (focus, etc.)
   - Bouton avec couleurs et états visuels (hover, active, disabled)
   - Ajoutez une icône de recherche dans le bouton

**Point de contrôle** : Le composant doit avoir un input, un bouton, et émettre l'événement `search` au clic ou à la soumission du formulaire.

---

### Étape 2 : Créer les composants de layout

**Objectif** : Créer la structure de layout de l'application.

#### 2.1 Composant Header

1. Créez le fichier `src/layouts/Header.vue`

2. Le header doit contenir :
   - Un logo ou titre "Internship Review" qui est cliquable et redirige vers la page d'accueil
   - Une navigation avec des liens vers les pages principales
   - Un style visuel cohérent (fond dégradé, texte blanc, etc.)

#### 2.2 Composant Footer

1. Créez le fichier `src/layouts/Footer.vue`

2. Le footer doit contenir :
   - Un texte de copyright ou des informations utiles
   - Un style visuel cohérent avec le reste de l'application

#### 2.3 Composant AppLayout

1. Créez le fichier `src/layouts/AppLayout.vue`

2. Le layout doit organiser la structure de la page :
   - Le composant Header en haut
   - Une zone principale pour afficher le contenu des pages
   - Le composant Footer en bas
   - Le footer doit rester en bas même si le contenu est court

**Point de contrôle** : La structure de layout doit s'afficher correctement avec Header, contenu principal, et Footer.

---

### Étape 3 : Mettre à jour le router

**Objectif** : Configurer le router pour utiliser AppLayout.

1. Ouvrez le fichier de configuration du router

2. Modifiez la configuration pour :
   - Utiliser `AppLayout` comme composant principal de la route principale
   - Mettre `HomePage` comme route enfant
   - Assurez-vous que toutes les pages utilisent le layout

**Point de contrôle** : La navigation doit fonctionner et afficher le layout avec Header et Footer.

---

### Étape 4 : Créer la page HomePage complète

**Objectif** : Assembler tous les composants pour créer la page d'accueil.

1. Ouvrez `src/pages/HomePage.vue`

2. La page doit utiliser le composant SearchBar :
   - Importer le composant
   - L'afficher dans le template
   - Écouter l'événement émis par SearchBar
   - Créer une fonction qui reçoit la requête et la log dans la console (pour l'instant)

3. La page doit avoir une section hero :
   - Un titre principal : "Trouvez votre stage idéal"
   - Une description : "Parcourez des milliers d'offres de stage et trouvez celle qui correspond à vos aspirations"
   - Centré et bien espacé

4. La page doit avoir une section d'information avec trois cartes :
   - **Recherche facile** : Icône de recherche, description "Trouvez rapidement les offres qui vous intéressent"
   - **Favoris** : Icône d'étoile, description "Sauvegardez vos offres préférées pour plus tard"
   - **Détails complets** : Icône de graphique, description "Accédez à toutes les informations nécessaires"
   - Les cartes doivent être organisées en grille responsive (1 colonne sur mobile, 3 colonnes sur desktop)

5. Stylisez la page :
   - Page centrée verticalement et horizontalement
   - Espacement cohérent entre les sections
   - Design qui s'adapte aux différentes tailles d'écran
   - Utilisez une hauteur minimale pour la page

**Point de contrôle** : La page doit afficher une section hero, la barre de recherche fonctionnelle, et trois sections d'information avec icônes.

---

## ✅ Checklist de validation

Avant de passer à la branche suivante (02-home-page), vérifiez que :

- [ ] Le composant `SearchBar` est créé dans `src/components/SearchBar.vue`
- [ ] Le composant `SearchBar` permet de saisir du texte et le stocke
- [ ] Le composant `SearchBar` émet correctement l'événement `search` avec la requête
- [ ] Le formulaire empêche le rechargement de page
- [ ] Le bouton est désactivé quand l'input est vide
- [ ] Les composants `Header`, `Footer` et `AppLayout` sont créés
- [ ] Le router utilise `AppLayout` comme wrapper
- [ ] La page `HomePage` importe et utilise le composant `SearchBar`
- [ ] La page `HomePage` écoute l'événement `search` et log la requête dans la console
- [ ] La section hero s'affiche correctement
- [ ] Les trois sections d'information avec icônes s'affichent correctement
- [ ] Le design est responsive (testez sur différentes tailles d'écran)
- [ ] Aucune erreur dans la console du navigateur
- [ ] Le code respecte les conventions (pas d'erreurs ESLint)

## 🧪 Tests à effectuer

1. **Test de la barre de recherche** :
   - Tapez du texte dans l'input
   - Cliquez sur "Rechercher" ou appuyez sur Enter
   - Vérifiez dans la console du navigateur que l'événement est bien émis avec la requête
   - Vérifiez que le bouton est désactivé quand l'input est vide

2. **Test visuel** :
   - Vérifiez que tous les éléments sont bien alignés et centrés
   - Testez sur mobile, tablette et desktop
   - Vérifiez que les icônes s'affichent correctement
   - Vérifiez les états hover et focus
   - Vérifiez que le Header et Footer sont bien affichés

3. **Test de la structure** :
   - Vérifiez que le composant SearchBar est bien isolé et réutilisable
   - Vérifiez que la page HomePage utilise correctement le composant
   - Vérifiez que le layout fonctionne correctement avec le router

## 📝 Notes importantes

- **Heroicons** : Les icônes sont déjà installées dans le projet via `@heroicons/vue`
- **Tailwind CSS** : Utilisez les classes utilitaires pour le styling
- **Consultez les cours** : Si vous ne savez pas comment implémenter quelque chose (v-model, events, router), référez-vous aux cours théoriques listés ci-dessus
- **Documentation officielle** : N'hésitez pas à consulter la documentation Vue.js si besoin

## 🔗 Ressources complémentaires

- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Heroicons Vue](https://github.com/tailwindlabs/heroicons)
- [Vue.js - Guide des composants](https://vuejs.org/guide/components/registration.html)
- [Vue.js - Events](https://vuejs.org/guide/components/events.html)
- [Vue Router](https://router.vuejs.org/)

## 🚀 Prochaine étape

Une fois cette branche terminée et validée, vous pouvez passer à la branche suivante : **02-home-page**

Sur cette branche, vous trouverez le code complet de ce que vous venez de créer, et la documentation pour la prochaine étape.

**Note importante** : Vous pouvez soit supprimer votre travail actuel (car la correction est déjà sur la branche 02-home-page), soit créer une branche et faire un commit de votre travail pour garder une trace de votre progression.

---

**Bon courage ! 💪**
