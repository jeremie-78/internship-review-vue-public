# Branche 03-affichage-offres : Recherche fonctionnelle

## 🎯 Objectifs d'apprentissage

À la fin de cette branche, vous serez capable de :

- ✅ Implémenter la recherche par mots-clés et filtrer les offres
- ✅ Faire passer le terme de recherche par l'URL (partage, bouton retour)
- ✅ Faire en sorte que la page de résultats reflète l'URL et se mette à jour quand l'URL change
- ✅ Permettre au parent de contrôler la valeur affichée dans la barre de recherche
- ✅ Afficher la barre de recherche sur la page de résultats et la garder synchronisée avec l'URL

## 📚 Concepts théoriques nécessaires

Avant de commencer, assurez-vous d'avoir lu et compris :

1. [Vue Router](../../course/05-vue-router.md) - Navigation et routing, notamment la navigation programmatique
2. [Query Parameters](../../course/08-query-parameters.md) - Utiliser les query parameters dans les URLs
3. [Watchers](../../course/07-watchers.md) - Réagir aux changements de valeurs réactives
4. [v-model](../../course/04-v-model.md) - Liaison bidirectionnelle, notamment avec les composants personnalisés

## 📋 Vue d'ensemble de la branche

Dans cette branche, vous allez implémenter la recherche fonctionnelle avec :

- Une fonction de recherche dans le service pour filtrer les offres par mots-clés
- Une barre de recherche dont la valeur peut être contrôlée par la page parente
- Une recherche depuis la page d'accueil qui mène vers la page de résultats avec le terme dans l'URL
- Une page de résultats qui affiche les offres filtrées selon l'URL et réagit aux changements d'URL
- La barre de recherche sur la page de résultats, synchronisée avec l'URL, avec possibilité de relancer une recherche ou de tout afficher

## 🛠️ Consignes étape par étape

L'ordre proposé part du service (recherche), puis de la barre de recherche contrôlable par la page, ensuite du comportement de la page d'accueil, enfin de la page de résultats qui lit l'URL et réagit à ses changements.

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

### Étape 2 : Faire naviguer la page d'accueil vers les résultats avec le terme dans l'URL

**Objectif** : Lors d'une recherche depuis la page d'accueil, aller vers la page de résultats en mettant le terme de recherche dans l'URL.

1. Ouvrez le fichier `src/pages/HomePage.vue`

2. La page doit garder la main sur la valeur affichée dans la barre de recherche

3. Lors du clic sur « Rechercher » :
   - La navigation doit aller vers la page de résultats
   - Le terme de recherche doit apparaître dans l'URL (paramètre de requête)

**Point de contrôle** : Une recherche depuis la page d'accueil mène vers `/results` avec le terme de recherche dans l'URL.

---

### Étape 3 : Lire l'URL, afficher les résultats filtrés et réagir aux changements

**Objectif** : Afficher les offres selon le terme présent dans l'URL et mettre à jour l'affichage quand l'URL change (par exemple bouton retour).

1. Ouvrez le fichier `src/pages/ResultsPage.vue`

2. La page doit se baser sur l'URL pour décider quelles offres afficher :
   - Au chargement, lire le paramètre de recherche dans l'URL
   - S'il existe, afficher uniquement les offres correspondant à ce terme
   - S'il n'existe pas, afficher toutes les offres

3. Quand l'URL change (par exemple bouton retour du navigateur), la page doit mettre à jour les résultats en fonction des nouveaux paramètres

4. Quand aucun argument n'est présent dans l'URL, afficher toutes les offres

**Point de contrôle** : La page affiche les résultats selon l'URL et se met à jour quand l'URL change ; la barre de recherche est synchronisée avec l'URL.

---

### Étape 4 : Rendre la barre de recherche contrôlable par la page

**Objectif** : Permettre à la page parente de contrôler la valeur affichée dans le champ de recherche.

1. Ouvrez le fichier `src/components/SearchBar.vue`

2. Modifiez le composant pour que :
   - La page parente puisse fournir la valeur affichée dans le champ
   - La valeur se mette à jour quand l'utilisateur tape
   - Le parent soit notifié lors de la soumission (clic sur « Rechercher »)

**Point de contrôle** : La page parente peut contrôler la valeur affichée dans le champ de recherche.

---

### Étape 5 : Ajouter la barre de recherche sur la page de résultats

**Objectif** : Ajouter la barre de recherche sur la page de résultats et mettre un indicateur de recherche en cours.

1. Ajoutez la barre de recherche sur la page de résultats :
   - La valeur affichée dans la barre doit correspondre au paramètre de l'URL
   - L'utilisateur doit pouvoir lancer une nouvelle recherche depuis cette page
   - L'utilisateur doit pouvoir effacer la recherche pour voir à nouveau toutes les offres

2. Affichage :
   - Indiquer le terme de recherche actuel quand une recherche est en cours
   - Permettre de « nettoyer » la recherche pour afficher toutes les offres

3. Quand aucun résultat n'est trouvé :
   - Afficher un message informatif
   - Afficher un bouton pour afficher toutes les offres

**Point de contrôle** : La barre de recherche est affichée sur la page de résultats et met un indicateur de recherche en cours.

---

## ✅ Checklist de validation

Avant de passer à la branche suivante (04-recherche), vérifiez que :

- [ ] La fonction de recherche est créée dans le service et filtre correctement les offres
- [ ] La page parente peut contrôler la valeur affichée dans la barre de recherche
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
- **Réactivité** : La page doit réagir aux changements d'URL pour une meilleure expérience utilisateur (bouton retour, partage de lien)
- **Synchronisation** : La barre de recherche doit toujours afficher la valeur correspondant à l'URL
- **Filtrage** : Pour ce projet, la recherche se fait en filtrant les données déjà récupérées depuis l'API
- **Consultez les cours** : Pour la lecture des paramètres d'URL, la navigation ou la réactivité aux changements, référez-vous aux cours théoriques listés ci-dessus

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
