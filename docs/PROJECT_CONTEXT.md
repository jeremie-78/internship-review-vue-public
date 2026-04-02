# Contexte du Projet : Ordre des Branches

Ce document liste toutes les branches du projet dans l'ordre de progression pédagogique.

## 📋 Vue d'ensemble

Ce projet est une application de recherche d'offres de stages construite avec Vue.js 3. Chaque branche représente une étape d'apprentissage progressive, permettant aux étudiants d'apprendre Vue.js en construisant une application réelle.

**Important** : La documentation sur une branche décrit le travail à faire pour la branche suivante.

## 🎯 Ordre des Branches

### Phase 1 : MVP (Must-Have Capabilities)

#### 1. `setup` - Configuration de base
**Objectif** : Configuration initiale du projet
- Vue 3 + Vite configuré
- TailwindCSS intégré
- json-server avec données de base
- Structure de dossiers (components, pages, services)
- **Valeur pédagogique** : Comprendre la structure d'un projet VueJS

**Documentation** : `docs/branches/setup/README.md`  
**Décrit le travail pour** : `02-home-page`

---

#### 2. `02-home-page` - Page d'accueil fonctionnelle
**Objectif** : Créer la page d'accueil avec navigation
- Composant Header avec navigation
- Composant Footer
- Composant SearchBar
- Page Home avec barre de recherche basique
- Navigation Vue Router de base
- **Valeur pédagogique** : Premiers pas avec les composants, v-model, events, et le routing

**Documentation** : `docs/branches/02-home-page/README.md`  
**Décrit le travail pour** : `03-affichage-offres`

---

#### 3. `03-affichage-offres` - Affichage des offres
**Objectif** : Afficher les offres de stage
- Service API basique pour récupérer les offres (offerService)
- Composant OfferCard pour afficher une offre
- Page ResultsPage avec liste de cartes
- Utilisation de v-for pour itérer sur les offres
- Gestion des états de chargement et d'erreur
- **Valeur pédagogique** : Comprendre les props, les directives v-for, les appels API avec fetch, et les lifecycle hooks

**Décrit le travail pour** : `04-recherche`

---

#### 4. `04-recherche` - Recherche fonctionnelle
**Objectif** : Implémenter la recherche opérationnelle
- Recherche par arguments (mots-clés)
- Filtrage côté client ou serveur
- Navigation vers page de résultats depuis la recherche
- Mise à jour des résultats en temps réel
- **Valeur pédagogique** : Gestion d'état, réactivité Vue, événements

**Décrit le travail pour** : `05-authentification`

---

#### 5. `05-authentification` - Système d'authentification
**Objectif** : Authentification des utilisateurs
- Pages Login et Register
- Service d'authentification
- Gestion de session/token
- Routes protégées
- **Valeur pédagogique** : Gestion d'état avancée, persistance, sécurité basique

---

### Phase 2 : Features Avancées (Growth Features)

#### 6. `14-slots` - Composition de composants avec slots
**Objectif** : Utiliser les slots pour rendre les composants flexibles
- Refactoriser OfferCard pour utiliser des slots
- Créer un composant Card générique avec slots
- Utiliser des scoped slots pour passer des données au parent
- **Valeur pédagogique** : Composition de composants, slots par défaut, slots nommés, scoped slots

---

#### 7. `15-template-refs` - Template Refs
**Objectif** : Accéder aux éléments du DOM directement
- Utiliser `ref` pour accéder aux éléments du template
- Gérer le focus sur les inputs
- Manipulation directe du DOM quand nécessaire
- **Valeur pédagogique** : Template refs, accès direct au DOM, nextTick()

---

#### 8. `17-v-show` - Optimisation avec v-show
**Objectif** : Comprendre la différence entre v-if et v-show
- Utiliser v-show pour les éléments fréquemment togglés
- Optimiser les performances avec v-show vs v-if
- **Valeur pédagogique** : Performance, différence entre v-if et v-show, quand utiliser chaque directive

---

#### 9. `18-provide-inject` - Communication profonde entre composants
**Objectif** : Éviter le prop drilling avec provide/inject
- Utiliser provide/inject pour partager des données
- Communiquer entre composants sans passer par tous les niveaux
- **Valeur pédagogique** : Provide/inject, éviter le prop drilling, communication entre composants distants

---

## 📊 Résumé de la Progression

| Ordre | Branche | Phase | Description courte |
|-------|---------|-------|-------------------|
| 1 | `setup` | MVP | Configuration de base |
| 2 | `02-home-page` | MVP | Page d'accueil avec composants |
| 3 | `03-affichage-offres` | MVP | Affichage des offres avec API |
| 4 | `04-recherche` | MVP | Recherche fonctionnelle |
| 5 | `05-authentification` | MVP | Système d'authentification |
| 6 | `14-slots` | Growth | Composition avec slots |
| 7 | `15-template-refs` | Growth | Accès direct au DOM |
| 8 | `17-v-show` | Growth | Optimisation v-show vs v-if |
| 9 | `18-provide-inject` | Growth | Communication profonde |

## 🎓 Concepts Vue.js Appris par Branche

### Branche `setup`
- Composants Vue
- v-model
- Events (emit, @event)
- Vue Router (RouterLink, router-view)
- Props

### Branche `02-home-page`
- Tout de `setup` +
- Fetch API
- async/await
- v-for
- onMounted (lifecycle hooks)
- Gestion d'erreurs

### Branche `03-affichage-offres`
- Tout des branches précédentes +
- Services API
- États de chargement
- Props avancées

### Branche `04-recherche`
- Tout des branches précédentes +
- Filtrage de données
- Gestion d'état réactive

### Branche `05-authentification`
- Tout des branches précédentes +
- Gestion de session
- Routes protégées
- Persistance (localStorage)

### Branche `14-slots`
- Slots par défaut
- Slots nommés
- Scoped slots

### Branche `15-template-refs`
- Template refs
- nextTick()
- Accès direct au DOM

### Branche `17-v-show`
- v-show vs v-if
- Optimisation des performances

### Branche `18-provide-inject`
- Provide/inject
- Communication entre composants distants
- Éviter le prop drilling

## 📝 Notes Importantes

1. **Progression linéaire** : Les branches doivent être suivies dans l'ordre pour une progression cohérente
2. **Documentation** : Chaque branche a sa documentation dans `docs/branches/[nom-branche]/README.md`
3. **Cours théoriques** : Les cours sont dans `docs/course/` et sont référencés par les branches qui en ont besoin
4. **Validation** : Chaque branche a une checklist de validation avant de passer à la suivante

## 🔄 Workflow Recommandé

1. Commencer sur la branche `setup`
2. Lire la documentation de la branche actuelle
3. Lire les cours théoriques référencés
4. Suivre les consignes étape par étape
5. Valider avec la checklist
6. Passer à la branche suivante
7. Répéter jusqu'à la fin

---

**Dernière mise à jour** : 2025-01-09
