# Branche 04-recherche : Authentification simple

## 🎯 Objectifs d'apprentissage

À la fin de cette branche, vous serez capable de :

- ✅ Créer des formulaires de connexion et d'inscription
- ✅ Gérer l'authentification via l'API (json-server : GET/POST `/users`)
- ✅ Stocker le token et l'utilisateur dans le navigateur (localStorage)
- ✅ Afficher l'état connecté / déconnecté dans le header (avec déconnexion)
- ✅ Partager l'état d'authentification entre le layout et les composants

## 📚 Concepts théoriques nécessaires

Avant de commencer, assurez-vous d'avoir lu et compris :

1. [Fetch API et async/await](../../course/06-fetch-api.md) - Requêtes HTTP (GET, POST)
2. [localStorage](../../course/09-localStorage.md) - Stocker token et utilisateur dans le navigateur
3. [v-model](../../course/04-v-model.md) - Liaison bidirectionnelle pour les formulaires
4. [Query parameters](../../course/08-query-parameters.md) - Recherche avec `?q=...`
5. [Watchers](../../course/07-watchers.md) - Réagir aux changements de l'URL
6. [Introduction à Vue.js](../../course/01-introduction.md) - Réactivité, affichage conditionnel

Optionnel (version allégée) : [Composables](../../course/10-composables.md), [Navigation Guards](../../course/11-navigation-guards.md).

## 📋 Vue d'ensemble de la branche

Dans cette branche, vous allez implémenter l'authentification simple avec :

- Un service d'authentification pour gérer la connexion et l'inscription
- Un service utilisateur pour récupérer l'utilisateur courant
- Deux pages : LoginPage et RegisterPage pour la connexion et l'inscription
- Un layout qui gère l'état d'authentification et le met à la disposition du header et des pages
- Un affichage dans le header de l'état connecté ou déconnecté

## 🛠️ Consignes étape par étape

### Étape 1 : Service d'authentification

**Objectif** : Créer un service qui permet de se connecter, s'inscrire et se déconnecter en s'appuyant sur json-server.

1. Créez `src/services/authService.js`.

2. **Connexion** :
   - Vérifier l'identité via l'API (GET `/users` avec l'email)
   - Vérifier le mot de passe côté client
   - En cas de succès : générer un token, stocker le token et l'utilisateur (sans mot de passe) dans le navigateur, retourner token et utilisateur
   - Gérer le cas email ou mot de passe incorrect

3. **Inscription** :
   - Vérifier si l'email existe déjà (GET `/users` avec l'email)
   - Si l'email est libre : créer l'utilisateur via l'API (POST `/users` avec email, mot de passe, nom, date de création)
   - Stocker le token et l'utilisateur dans le navigateur, retourner token et utilisateur
   - Gérer le cas email déjà utilisé

4. **Déconnexion** : supprimer le token et l'utilisateur du stockage navigateur.

5. Exposer des fonctions pour lire et écrire le token et l'utilisateur stockés, et pour savoir si l'utilisateur est connecté.

**Point de contrôle** : Le service permet de se connecter, s'inscrire et se déconnecter en s'appuyant sur json-server.

---

### Étape 2 : Service utilisateur

**Objectif** : Permettre à tout composant de récupérer l'utilisateur courant sans accéder directement au service d'authentification.

1. Créez `src/services/userService.js`.

2. Exposez une fonction qui retourne l'utilisateur actuellement stocké (par exemple en s'appuyant sur le service d'authentification).

**Point de contrôle** : Un autre composant peut récupérer l'utilisateur courant sans toucher au service d'authentification.

---

### Étape 3 : Pages Login et Register

**Objectif** : Permettre à l'utilisateur de se connecter ou de s'inscrire, puis d'être redirigé vers l'accueil avec l'état connecté.

1. **LoginPage.vue** :
   - Formulaire avec email et mot de passe
   - À la soumission : appeler le service de connexion
   - En cas de succès : mettre à jour l'état d'authentification dans l'application et rediriger vers la page d'accueil
   - En cas d'échec : afficher un message d'erreur
   - Lien vers la page d'inscription

2. **RegisterPage.vue** :
   - Formulaire avec email, mot de passe, nom (optionnel)
   - Validation minimale (longueur du mot de passe)
   - À la soumission : appeler le service d'inscription
   - Même logique que la page de connexion en cas de succès (mise à jour de l'état, redirection)
   - Lien vers la page de connexion

**Point de contrôle** : Connexion et inscription fonctionnent et redirigent vers l'accueil.

---

### Étape 4 : Routes et layout

**Objectif** : Rendre les pages Login et Register accessibles et faire en sorte que le layout ait accès à l'état d'authentification.

1. Dans le routeur : ajouter les routes `/login` et `/register` (même layout que les autres pages).

2. Dans **AppLayout.vue** :
   - Conserver l'état d'authentification (initialisé avec l'utilisateur stocké s'il existe)
   - Mettre cet état et une fonction pour le mettre à jour à la disposition des composants enfants (header et pages)
   - Passer l'utilisateur et une action de déconnexion au header pour l'affichage et la déconnexion

**Point de contrôle** : Les pages Login et Register sont accessibles et le layout a accès à l'état d'authentification.

---

### Étape 5 : Header

**Objectif** : Afficher dans le header l'état connecté ou déconnecté et permettre la déconnexion.

1. Dans **AppHeader.vue** : le composant reçoit l'utilisateur connecté et une callback de déconnexion.

2. Si un utilisateur est connecté :
   - Afficher son email (ou « Mon compte »)
   - Afficher un bouton **Déconnexion** qui déclenche la déconnexion puis met à jour l'affichage

3. Si aucun utilisateur n'est connecté :
   - Afficher les liens **Connexion** et **Inscription** vers `/login` et `/register`

**Point de contrôle** : Le header affiche l'état connecté ou déconnecté et la déconnexion met à jour l'affichage sans rechargement.

---

### Étape 6 : Initialisation au chargement

**Objectif** : Restaurer la session après un rechargement de page.

1. Dans le layout, au chargement de la page : initialiser l'état d'authentification avec l'utilisateur éventuellement stocké dans le navigateur.

**Point de contrôle** : L'utilisateur reste connecté après un rechargement de page.

---

## ✅ Checklist de validation

Avant de passer à la branche suivante, vérifiez que :

- [ ] Le service `authService.js` gère la connexion (GET users + vérification mot de passe), l'inscription (POST users), la déconnexion, ainsi que le stockage du token et de l'utilisateur dans le navigateur
- [ ] Le service `userService.js` expose une fonction pour obtenir l'utilisateur courant (lecture du stockage)
- [ ] Les pages `LoginPage.vue` et `RegisterPage.vue` ont des formulaires, appellent l'API et mettent à jour l'état d'authentification
- [ ] Les routes `/login` et `/register` sont configurées
- [ ] Le layout (AppLayout) gère l'état d'authentification et le met à disposition des enfants (lecture et mise à jour)
- [ ] Le header affiche l'état connecté (email + déconnexion) ou non connecté (liens Connexion / Inscription)
- [ ] La déconnexion supprime le token et met à jour l'affichage sans rechargement
- [ ] La session est restaurée au rechargement (utilisateur stocké pris en compte au chargement du layout)
- [ ] L'API utilisée est json-server (`npm run json-server`), avec `users` dans `data/db.json`
- [ ] Aucune erreur dans la console du navigateur
- [ ] Le code respecte les conventions (pas d'erreurs ESLint)

## 🧪 Tests à effectuer

1. **Inscription** :
   - Créer un compte
   - Vérifier la redirection et l'affichage dans le header

2. **Connexion** :
   - Se connecter avec un utilisateur de `db.json` (ex. `test@example.com` / `password123`)
   - Vérifier le header et la déconnexion

3. **Déconnexion** :
   - Cliquer sur Déconnexion
   - Vérifier que le header affiche Connexion / Inscription

4. **Persistance** :
   - Se connecter, recharger la page
   - Vérifier que l'utilisateur reste connecté

## 📝 Notes importantes

- **API** : json-server expose GET/POST `/users`. La connexion repose sur GET + vérification du mot de passe côté client ; l'inscription sur POST. Il n'y a pas de serveur d'authentification dédié.
- **Stockage** : token et utilisateur (sans mot de passe) dans le stockage navigateur (localStorage).
- **État d'authentification** : conservé dans le layout et mis à disposition des enfants pour que le header et les pages Login/Register puissent lire et mettre à jour l'état sans rechargement.
- **Sécurité** : Pour ce projet pédagogique, le token est simplifié. En production, utiliser des tokens sécurisés (ex. JWT) et ne jamais vérifier le mot de passe côté client.
- **Consultez les cours** : Pour la gestion du stockage, des formulaires ou du partage d'état, référez-vous aux cours théoriques listés ci-dessus.

## 🔗 Ressources complémentaires

- [Planning 21h Vue/Nuxt](../../PLANNING_21H_VUE_NUXT.md) - Vue 4, auth simple + évaluation
- [Vue Router](https://router.vuejs.org/)
- [MDN - localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)

## 🚀 Prochaine étape

Une fois cette branche terminée et validée, vous pouvez passer à la branche suivante.

Sur cette branche, vous trouverez le code complet de ce que vous venez de créer, et la documentation pour la prochaine étape.

**Note importante** : Vous pouvez soit supprimer votre travail actuel (car la correction est déjà sur la branche suivante), soit créer une branche et faire un commit de votre travail pour garder une trace de votre progression.

---

**Bon courage ! 💪**
