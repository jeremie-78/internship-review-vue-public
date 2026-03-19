# Branche 03-affichage-offres : Recherche fonctionnelle

## 🎯 Objectifs d'apprentissage

À la fin de cette branche, vous serez capable de :

- ✅ Implémenter la recherche par mots-clés
- ✅ Filtrer des données selon des critères
- ✅ Utiliser les query parameters dans les URLs
- ✅ Naviguer programmatiquement avec Vue Router
- ✅ Réagir aux changements d'URL
- ✅ Synchroniser l'état entre plusieurs composants

## 📚 Concepts théoriques nécessaires

Avant de commencer, assurez-vous d'avoir lu et compris :

1. [Vue Router](../../course/05-vue-router.md) - Navigation et routing, notamment la navigation programmatique
2. [Query Parameters](../../course/08-query-parameters.md) - Utiliser les query parameters dans les URLs
3. [Watchers](../../course/07-watchers.md) - Réagir aux changements de valeurs réactives
4. [v-model](../../course/04-v-model.md) - Liaison bidirectionnelle, notamment avec les composants personnalisés

## 📋 Vue d'ensemble de la branche

Dans cette branche, vous allez implémenter la recherche fonctionnelle avec :

- Une fonction de recherche dans le service pour filtrer les offres
- Modification du composant SearchBar pour permettre la communication bidirectionnelle avec le parent
- Navigation vers la page de résultats avec les paramètres de recherche dans l'URL
- Affichage des résultats filtrés sur la page ResultsPage
- Réaction automatique aux changements de paramètres dans l'URL
- Affichage de la barre de recherche sur la page de résultats

## 🛠️ Consignes étape par étape

### Étape 1 : Ajouter la fonction de recherche dans le service

**Objectif** : Créer une fonction pour rechercher des offres par mots-clés.

1. Ouvrez le fichier `src/services/offerService.js`

2. Créez une fonction pour rechercher des offres :
   - La fonction doit recevoir un terme de recherche en paramètre
   - Elle doit récupérer toutes les offres depuis l'API
   - Elle doit filtrer les offres selon le terme de recherche (recherche dans le titre, l'entreprise, la description, etc.)
   - Elle doit retourner les offres filtrées
   - Elle doit gérer les cas d'erreur

**Point de contrôle** : La fonction doit pouvoir filtrer les offres selon un terme de recherche.

---

### Étape 2 : Modifier le composant SearchBar

**Objectif** : Permettre au composant parent de contrôler la valeur du champ de recherche.

1. Ouvrez le fichier `src/components/SearchBar.vue`

2. Modifiez le composant pour permettre la communication bidirectionnelle :
   - Le composant doit pouvoir recevoir une valeur depuis le parent
   - Le composant doit pouvoir mettre à jour cette valeur quand l'utilisateur tape
   - Le composant doit toujours émettre l'événement `search` lors de la soumission

**Point de contrôle** : Le composant parent peut contrôler la valeur affichée dans le champ de recherche.

---

### Étape 3 : Modifier la page HomePage

**Objectif** : Naviguer vers la page de résultats avec les paramètres de recherche.

1. Ouvrez le fichier `src/pages/HomePage.vue`

2. La page doit stocker la valeur de la barre de recherche pour pouvoir la contrôler

3. Modifiez la fonction `handleSearch` pour :
   - Naviguer vers la page de résultats
   - Passer le terme de recherche dans l'URL comme paramètre de requête

**Point de contrôle** : La recherche sur la page d'accueil doit naviguer vers `/results` avec le terme de recherche dans l'URL.

---

### Étape 4 : Modifier la page ResultsPage

**Objectif** : Afficher les résultats filtrés et réagir aux changements d'URL.

1. Ouvrez le fichier `src/pages/ResultsPage.vue`

2. La page doit lire les paramètres de recherche depuis l'URL :
   - Au chargement de la page, lire le paramètre de recherche dans l'URL
   - Si un paramètre existe, utiliser la fonction de recherche au lieu de récupérer toutes les offres
   - Si aucun paramètre n'existe, afficher toutes les offres

3. La page doit réagir aux changements d'URL :
   - Quand l'URL change (par exemple, l'utilisateur utilise le bouton retour du navigateur)
   - Relancer la recherche ou le chargement des offres selon les nouveaux paramètres

4. Ajoutez la barre de recherche sur la page ResultsPage :
   - Afficher le composant SearchBar sur la page
   - Synchroniser la valeur affichée avec le paramètre de l'URL
   - Permettre à l'utilisateur de faire une nouvelle recherche depuis cette page

5. Améliorez l'affichage :
   - Afficher le terme de recherche actuel si une recherche est active
   - Permettre à l'utilisateur de nettoyer la recherche pour voir toutes les offres

**Point de contrôle** : La page doit afficher les résultats filtrés selon l'URL et réagir aux changements d'URL.

---

## ✅ Checklist de validation

Avant de passer à la branche suivante (04-recherche), vérifiez que :

- [ ] La fonction de recherche est créée dans le service et filtre correctement les offres
- [ ] Le composant SearchBar permet la communication bidirectionnelle avec le parent
- [ ] La page HomePage navigue vers `/results` avec le terme de recherche dans l'URL
- [ ] La page ResultsPage lit les paramètres de recherche depuis l'URL
- [ ] La page ResultsPage utilise la fonction de recherche quand un paramètre existe
- [ ] La page ResultsPage réagit aux changements d'URL
- [ ] La barre de recherche est affichée sur la page ResultsPage
- [ ] La valeur de la barre de recherche est synchronisée avec l'URL
- [ ] L'utilisateur peut faire une nouvelle recherche depuis la page de résultats
- [ ] L'utilisateur peut nettoyer la recherche pour voir toutes les offres
- [ ] Le terme de recherche actuel est affiché quand une recherche est active
- [ ] Aucune erreur dans la console du navigateur
- [ ] Le code respecte les conventions (pas d'erreurs ESLint)

## 🧪 Tests à effectuer

1. **Test de la recherche depuis HomePage** :
   - Tapez un terme de recherche sur la page d'accueil
   - Cliquez sur "Rechercher"
   - Vérifiez que l'URL contient le paramètre de recherche
   - Vérifiez que seules les offres correspondantes s'affichent

2. **Test de la recherche depuis ResultsPage** :
   - Naviguez vers `/results`
   - Tapez un terme dans la barre de recherche
   - Vérifiez que l'URL se met à jour
   - Vérifiez que les résultats se mettent à jour automatiquement

3. **Test de la navigation** :
   - Faites une recherche
   - Utilisez le bouton retour du navigateur
   - Vérifiez que les résultats se mettent à jour selon l'URL
   - Vérifiez que la barre de recherche affiche la bonne valeur

4. **Test du nettoyage** :
   - Faites une recherche
   - Nettoyez la recherche
   - Vérifiez que toutes les offres s'affichent à nouveau
   - Vérifiez que le paramètre de recherche disparaît de l'URL

## 📝 Notes importantes

- **Query parameters** : Les paramètres de recherche sont passés dans l'URL pour permettre le partage et la navigation
- **Réactivité** : La page doit réagir aux changements d'URL pour une meilleure expérience utilisateur
- **Synchronisation** : La barre de recherche doit toujours afficher la valeur correspondant à l'URL
- **Filtrage** : La recherche peut se faire côté client (filtrer les données récupérées) ou côté serveur (modifier la requête API)
- **Consultez les cours** : Si vous ne savez pas comment implémenter quelque chose (query params, navigation programmatique, réactivité aux changements), référez-vous aux cours théoriques listés ci-dessus

## 🔗 Ressources complémentaires

- [Vue Router - Query Parameters](https://router.vuejs.org/guide/essentials/navigation.html#query-parameters)
- [Vue Router - Programmatic Navigation](https://router.vuejs.org/guide/essentials/navigation.html)
- [Vue.js - Watchers](https://vuejs.org/guide/essentials/watchers.html)

## 🚀 Prochaine étape

Une fois cette branche terminée et validée, vous pouvez passer à la branche suivante : **04-recherche**

Sur cette branche, vous trouverez le code complet de ce que vous venez de créer, et la documentation pour la prochaine étape.

**Note importante** : Vous pouvez soit supprimer votre travail actuel (car la correction est déjà sur la branche 04-recherche), soit créer une branche et faire un commit de votre travail pour garder une trace de votre progression.

---

**Bon courage ! 💪**
