# Branche 02-home-page : Affichage des offres

## 🎯 Objectifs d'apprentissage

À la fin de cette branche, vous serez capable de :

- ✅ Créer un service pour communiquer avec une API et récupérer des données
- ✅ Gérer les états de chargement et d'erreur dans une page
- ✅ Créer un composant réutilisable qui reçoit des données et les affiche
- ✅ Afficher une liste d'éléments dynamiques dans une page
- ✅ Créer une page de résultats avec chargement, erreur et liste d'offres

## 📚 Concepts théoriques nécessaires

Avant de commencer, assurez-vous d'avoir lu et compris :

1. [Composants et Props](../../course/02-components-props.md) - Comment créer des composants et utiliser les props
2. [Introduction à Vue.js](../../course/01-introduction.md) - Réactivité, directives (notamment `v-for`), lifecycle hooks (`onMounted`)
3. [Fetch API et async/await](../../course/06-fetch-api.md) - Faire des requêtes HTTP et gérer les données asynchrones

## 📋 Vue d'ensemble de la branche

Dans cette branche, vous allez créer l'affichage des offres de stage avec :

- Un service pour récupérer les offres depuis l'API
- Un composant carte pour afficher une offre individuelle
- Une page de résultats qui affiche la liste des offres
- Gestion des états de chargement et d'erreur
- Un affichage en grille responsive des cartes

## 🛠️ Consignes étape par étape

L'ordre proposé permet de voir la page dès l'étape 2 en naviguant vers `/results`, puis d'enrichir l'affichage étape par étape.

### Étape 1 : Créer le service des offres

**Objectif** : Créer un service pour récupérer les offres depuis l'API json-server.

1. Vérifiez que le fichier de configuration API existe dans `src/services/api.js`

2. Créez le fichier `src/services/offerService.js`

3. Créez une fonction pour récupérer toutes les offres depuis l'API :
   - La fonction doit faire une requête HTTP vers l'endpoint des offres
   - Elle doit gérer les cas d'erreur (réseau, serveur, etc.)
   - Elle doit retourner les données récupérées

4. (Optionnel) Créez une fonction pour récupérer une offre spécifique par son identifiant

**Point de contrôle** : Le service doit pouvoir récupérer les offres depuis json-server (assurez-vous que json-server est démarré avec `npm run json-server`).

---

### Étape 2 : Configurer la route et créer la page de résultats

**Objectif** : Rendre la page de résultats accessible via l'URL `/results`.

1. Créez le fichier `src/pages/ResultsPage.vue` (le contenu peut être minimal pour l'instant, par exemple un titre ou un message)

2. Ouvrez le fichier de configuration du router et ajoutez une route :
   - La route doit être accessible via `/results`
   - Elle doit afficher la page ResultsPage
   - Elle doit s'intégrer à la structure de navigation existante

**Point de contrôle** : En allant sur `/results`, la page ResultsPage s'affiche (même si le contenu est encore basique).

---

### Étape 3 : Créer le composant carte d'offre

**Objectif** : Créer un composant pour afficher une offre de stage.

1. Créez le fichier `src/components/OfferCard.vue`

2. Le composant doit recevoir les données d'une offre en paramètre

3. Le composant doit afficher les informations suivantes :
   - Le titre de l'offre
   - L'entreprise
   - La localisation
   - Le type (avec un style visuel distinct, comme un badge)

4. Stylisez le composant pour qu'il ressemble à une carte :
   - Bordure et ombre pour donner de la profondeur
   - Espacement cohérent entre les éléments
   - Design qui s'adapte aux différentes tailles d'écran

**Point de contrôle** : Le composant doit afficher toutes les informations d'une offre dans une carte stylée.

---

### Étape 4 : Compléter la page ResultsPage (données et états)

**Objectif** : Afficher la liste des offres sur la page avec gestion du chargement et des erreurs.

1. La page doit charger les offres au démarrage :
   - Appeler le service pour récupérer les offres
   - Stocker les offres récupérées pour les afficher

2. La page doit gérer différents états d'affichage :

   **Pendant le chargement** :
   - Afficher un indicateur ou un message pour informer l'utilisateur que les données sont en cours de chargement

   **En cas d'erreur** :
   - Afficher un message d'erreur compréhensible
   - Proposer à l'utilisateur de réessayer

   **Quand les données sont chargées** :
   - Afficher la liste des offres
   - Utiliser le composant carte pour chaque offre

   **Si aucune offre n'est disponible** :
   - Afficher un message informatif

3. Organisez l'affichage des cartes en grille responsive :
   - Une colonne sur mobile
   - Plusieurs colonnes sur les écrans plus larges

**Point de contrôle** : La page affiche les offres, gère le chargement et les erreurs de manière appropriée.

---

## ✅ Checklist de validation

Avant de passer à la branche suivante (03-affichage-offres), vérifiez que :

- [ ] Le service `offerService.js` est créé et fonctionne
- [ ] Le service récupère correctement les données depuis json-server
- [ ] Le service gère les erreurs correctement
- [ ] Le composant `OfferCard` est créé et affiche les informations d'une offre
- [ ] Le composant `OfferCard` reçoit les données via les props
- [ ] La page `ResultsPage` est créée
- [ ] La page `ResultsPage` affiche la liste des offres
- [ ] La page `ResultsPage` gère l'état de chargement
- [ ] La page `ResultsPage` gère l'état d'erreur avec possibilité de réessayer
- [ ] La page `ResultsPage` affiche un message si aucune offre n'est disponible
- [ ] La route `/results` est configurée dans le router
- [ ] Les offres s'affichent correctement depuis json-server
- [ ] Le design est responsive
- [ ] Aucune erreur dans la console du navigateur
- [ ] Le code respecte les conventions (pas d'erreurs ESLint)

## 🧪 Tests à effectuer

1. **Test du service** :
   - Vérifiez que json-server est démarré (`npm run json-server`)
   - Vérifiez que les offres sont récupérées depuis l'API
   - Testez le cas d'erreur (arrêtez json-server et vérifiez la gestion d'erreur)

2. **Test de la page** :
   - Naviguez vers `/results`
   - Vérifiez que l'état de chargement s'affiche
   - Vérifiez que les offres s'affichent correctement
   - Vérifiez que chaque offre est dans une carte
   - Testez le cas d'erreur et la fonctionnalité de réessai
   - Testez le cas où aucune offre n'est disponible

3. **Test visuel** :
   - Vérifiez que les cartes sont bien alignées en grille
   - Testez sur mobile, tablette et desktop
   - Vérifiez que le design est cohérent

## 📝 Notes importantes

- **json-server** : Assurez-vous que json-server est démarré avant de tester (`npm run json-server`)
- **Gestion d'erreur** : Toujours gérer les cas d'erreur pour une meilleure expérience utilisateur
- **États de chargement** : Afficher un indicateur de chargement améliore l'UX
- **Responsive design** : Pensez à adapter l'affichage aux différentes tailles d'écran
- **Consultez les cours** : Si vous ne savez pas comment implémenter quelque chose, référez-vous aux cours théoriques listés ci-dessus

## 🔗 Ressources complémentaires

- [Documentation fetch API](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
- [Vue.js - v-for](https://vuejs.org/guide/essentials/list.html)
- [Vue.js - Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)
- [json-server Documentation](https://github.com/typicode/json-server)

## 🚀 Prochaine étape

Une fois cette branche terminée et validée, vous pouvez passer à la branche suivante : **03-affichage-offres**

Sur cette branche, vous trouverez le code complet de ce que vous venez de créer, et la documentation pour la prochaine étape.

**Note importante** : Vous pouvez soit supprimer votre travail actuel (car la correction est déjà sur la branche 03-affichage-offres), soit créer une branche et faire un commit de votre travail pour garder une trace de votre progression.

---

**Bon courage ! 💪**
