# 📚 Documentation d'apprentissage Vue.js + Nuxt

Bienvenue dans le parcours d'apprentissage Vue.js ! Cette documentation vous guidera étape par étape pour construire une application complète de recherche de stages.

## 🎯 Vue d'ensemble

Ce projet vous permettra d'apprendre Vue.js 3 en construisant une application réelle. Chaque branche correspond à une étape d'apprentissage avec des concepts théoriques et des consignes pratiques.

**Structure monorepo** : l’application Vue est dans `apps/vue/` ; une app Nuxt a été ajoutée dans `apps/nuxt/`.

## 📖 Structure de la documentation

### 📚 Cours théoriques

Les documents de cours couvrent les concepts Vue.js nécessaires pour chaque étape. Les cours sont créés au fur et à mesure selon les besoins des branches :

- [Introduction à Vue.js](./course/01-introduction.md) - Bases, réactivité, directives, v-for, lifecycle hooks
- [Composants et Props](./course/02-components-props.md) - Création et utilisation de composants
- [Events et Communication](./course/03-events-communication.md) - Communication entre composants
- [v-model](./course/04-v-model.md) - Liaison bidirectionnelle pour les formulaires
- [Vue Router](./course/05-vue-router.md) - Navigation et routing
- [Fetch API et async/await](./course/06-fetch-api.md) - Requêtes HTTP et données asynchrones
- [Watchers](./course/07-watchers.md) - Réagir aux changements de valeurs réactives
- [Query Parameters](./course/08-query-parameters.md) - Utiliser les query parameters dans les URLs
- [localStorage](./course/09-localStorage.md) - Stocker des données dans le navigateur
- [Composables](./course/10-composables.md) - Partager la logique et l'état entre composants
- [Navigation Guards](./course/11-navigation-guards.md) - Protéger les routes avec des guards

#### Cours Nuxt

- [Introduction à Nuxt (vs Vue)](./course/nuxt/01-introduction-nuxt.md) - Ce que Nuxt ajoute, conventions, structure
- [Routing, pages et layouts](./course/nuxt/02-routing-pages-layouts.md) - Routing par fichiers, pages, layouts, navigation

### 🎯 Branches de progression

Chaque branche représente une étape concrète du projet. **Important** : La documentation sur une branche décrit le travail à faire pour la branche suivante.

| Branche | Statut | Description |
|---------|--------|-------------|
| [setup](./branches/01-setup/README.md) | ✅ Terminé | Créer la page d'accueil avec composants (décrit travail pour 02-home-page) |
| [02-home-page](./branches/02-home-page/README.md) | ✅ Terminé | Afficher la liste des offres (décrit travail pour 03-affichage-offres) |
| [03-affichage-offres](./branches/03-affichage-offres/README.md) | ✅ Terminé | Implémenter la recherche fonctionnelle (décrit travail pour 04-recherche) |
| [04-recherche](./branches/04-recherche/README.md) | ✅ Terminé | Système d'authentification (décrit travail pour 05-authentification) |

#### Parcours Nuxt

Même projet, mais avec une application Nuxt dans `apps/nuxt/`.

| Branche | Statut | Description |
|---------|--------|-------------|
| [nuxt-01-setup](./branches/nuxt/nuxt-01-setup/README.md) | ✅ Terminé | Préparer la home et les pages de base (décrit travail pour nuxt-02-home) |
| [nuxt-02-home](./branches/nuxt/nuxt-02-home/README.md) | ✅ Terminé | Préparer l’écran Offres (décrit travail pour nuxt-03-offers) |

## 🚀 Comment utiliser cette documentation

**Important** : La documentation sur une branche décrit le travail à faire pour la branche suivante.

1. **Commencez sur la branche setup** : Consultez la documentation de la branche setup pour savoir quoi faire sur la branche 02-home-page
2. **Passez sur la branche suivante** : Une fois le travail terminé, passez sur la branche suivante (ex: 02-home-page)
3. **Consultez la documentation de cette branche** : Elle vous indiquera ce qu'il faut faire pour la branche suivante (ex: 03-affichage-offres)
4. **Consultez le contexte du projet** : Voir [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) pour l'ordre complet de toutes les branches
4. **Lisez les concepts théoriques** : Chaque branche référence les cours pertinents
5. **Suivez les consignes** : Instructions étape par étape pour implémenter les fonctionnalités
6. **Validez votre progression** : Utilisez les points de contrôle pour vérifier votre travail

## 📋 Prérequis

- Connaissances de base en HTML, CSS et JavaScript
- Node.js installé (version 20.19.0 ou >= 22.12.0)
- Un éditeur de code (VS Code recommandé)
- Git installé

## 🛠️ Installation initiale

```bash
# Cloner le projet
git clone <repository-url>
cd internship-review

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev:vue

# Dans un autre terminal, démarrer le serveur JSON (pour les données)
npm run json-server

# Démarrer le serveur de développement de Nuxt
npm run dev:nuxt
```

## 📝 Notes importantes

- **Progression linéaire** : Suivez les branches dans l'ordre pour une progression cohérente
- **Validation** : Vérifiez chaque point de contrôle avant de passer à la suite
- **Aide** : N'hésitez pas à poser des questions pendant les cours
- **Pratique** : Testez régulièrement votre code avec `npm run dev:vue` et `npm run dev:nuxt`

---

**Bonne chance dans votre apprentissage de Vue.js ! 🎉**
