# Vue Router : Navigation dans l'application

## Qu'est-ce que Vue Router ?

Vue Router est la bibliothèque officielle de routage pour Vue.js. Elle permet de créer des applications à page unique (SPA - Single Page Application) avec navigation entre différentes vues sans rechargement de page.

## Configuration de base

### Installation et configuration

Le router est généralement configuré dans `src/router/index.js` :

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    }
  ]
})

export default router
```

### Routes imbriquées (Nested Routes)

Pour créer des layouts avec des routes enfants :

```js
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage
        },
        {
          path: 'results',
          name: 'results',
          component: () => import('../pages/ResultsPage.vue')
        }
      ]
    }
  ]
})

export default router
```

## Navigation avec RouterLink

`RouterLink` est le composant Vue Router pour créer des liens de navigation.

### Lien simple

```vue
<template>
  <RouterLink to="/">Accueil</RouterLink>
  <RouterLink to="/results">Résultats</RouterLink>
</template>
```

### Lien avec nom de route

```vue
<template>
  <RouterLink :to="{ name: 'home' }">Accueil</RouterLink>
  <RouterLink :to="{ name: 'results' }">Résultats</RouterLink>
</template>
```

### Lien avec classe active

Vue Router ajoute automatiquement une classe `router-link-active` aux liens actifs. Vous pouvez aussi utiliser `active-class` :

```vue
<template>
  <RouterLink 
    to="/" 
    active-class="bg-blue-600"
    class="px-4 py-2"
  >
    Accueil
  </RouterLink>
</template>
```

## router-view : Afficher les composants

`<router-view />` est l'endroit où Vue Router affiche le composant correspondant à la route actuelle.

### Dans un layout

```vue
<!-- AppLayout.vue -->
<template>
  <div>
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>
```

Quand vous naviguez vers une route, le composant correspondant s'affiche à la place de `<router-view />`.

## Navigation programmatique

Vous pouvez naviguer depuis le code JavaScript avec `useRouter` :

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToResults() {
  router.push('/results')
  // ou
  router.push({ name: 'results' })
}

function goBack() {
  router.back()
}
</script>
```

## Exemple complet : Layout avec navigation

### AppLayout.vue

```vue
<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
```

### Header.vue

```vue
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="px-4 py-2">Accueil</RouterLink>
      <RouterLink to="/results" class="px-4 py-2">Résultats</RouterLink>
    </nav>
  </header>
</template>
```

## Routes dynamiques

Vous pouvez créer des routes avec des paramètres dynamiques :

```js
{
  path: '/offer/:id',
  name: 'offer',
  component: () => import('../pages/OfferDetailPage.vue')
}
```

Accéder au paramètre dans le composant :

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const offerId = route.params.id
</script>
```

## Navigation avec paramètres

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function viewOffer(id) {
  router.push({ name: 'offer', params: { id } })
}
</script>
```

**Note** : Pour les query parameters (paramètres de requête dans l'URL), voir le [cours dédié](./08-query-parameters.md).

## Routes protégées

Pour protéger des routes avec authentification, voir le [cours dédié sur les Navigation Guards](./11-navigation-guards.md).

## Bonnes pratiques

1. **Utilisez des noms de routes** : Plus maintenable que les chemins en dur
2. **Lazy loading** : Utilisez `() => import()` pour charger les composants à la demande
3. **RouterLink au lieu de `<a>`** : Utilisez toujours `RouterLink` pour la navigation interne
4. **Structure claire** : Organisez vos routes de manière logique

## Ressources

- [Documentation officielle Vue Router](https://router.vuejs.org/)
- [Guide de démarrage](https://router.vuejs.org/guide/)
