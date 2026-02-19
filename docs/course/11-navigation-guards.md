# Navigation Guards - Protéger les routes

## 🎯 Objectif

Apprendre à utiliser les navigation guards de Vue Router pour protéger des routes et contrôler la navigation dans l'application.

## 📚 Qu'est-ce qu'un navigation guard ?

Un navigation guard est une fonction qui s'exécute avant, pendant ou après la navigation vers une route. Il permet de contrôler si la navigation doit être autorisée, redirigée ou annulée.

### Types de guards

1. **Global guards** : S'appliquent à toutes les routes
2. **Per-route guards** : Définis dans la configuration de la route
3. **In-component guards** : Définis dans le composant de la route

## 🔧 Global Guards

### `beforeEach`

Le guard `beforeEach` s'exécute **avant** chaque navigation. C'est le plus utilisé pour protéger des routes.

```javascript
import { createRouter } from 'vue-router'

const router = createRouter({
  // ... configuration
})

// Guard global qui s'exécute avant chaque navigation
router.beforeEach((to, from, next) => {
  // to : Route vers laquelle on navigue
  // from : Route d'où on vient
  // next : Fonction pour continuer la navigation
  
  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = checkAuth()
  
  // Si la route nécessite une authentification
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Rediriger vers la page de connexion
    next('/login')
  } else {
    // Autoriser la navigation
    next()
  }
})
```

### Paramètres du guard

- **`to`** : Objet route vers laquelle on navigue
  - `to.path` : Chemin de la route
  - `to.name` : Nom de la route
  - `to.meta` : Métadonnées de la route
  - `to.query` : Query parameters
  - `to.params` : Route parameters
  - `to.fullPath` : Chemin complet avec query params

- **`from`** : Objet route d'où on vient (même structure que `to`)

- **`next`** : Fonction pour continuer la navigation
  - `next()` : Autoriser la navigation
  - `next('/login')` : Rediriger vers une autre route
  - `next({ name: 'login', query: { redirect: to.fullPath } })` : Rediriger avec options
  - `next(false)` : Annuler la navigation

## 💡 Exemple 1 : Protection basique

```javascript
import { createRouter } from 'vue-router'
import { getToken } from '../services/authService.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
      meta: { requiresAuth: true } // Cette route nécessite une authentification
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Vérifier si la route nécessite une authentification
  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = !!getToken()

  if (requiresAuth && !isAuthenticated) {
    // Rediriger vers login avec le chemin de retour
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    // Autoriser la navigation
    next()
  }
})

export default router
```

## 💡 Exemple 2 : Liste de routes protégées

```javascript
// Liste des routes qui nécessitent une authentification
const protectedRoutes = ['/', '/results', '/profile']

router.beforeEach((to, from, next) => {
  const isProtected = protectedRoutes.includes(to.path) || to.meta?.requiresAuth
  const isAuthenticated = !!getToken()

  if (isProtected && !isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})
```

## 💡 Exemple 3 : Redirection après connexion

Dans votre page de connexion, récupérez le paramètre `redirect` et redirigez après connexion :

```vue
<!-- LoginPage.vue -->
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

async function handleLogin(email, password) {
  try {
    await login(email, password)
    
    // Récupérer le chemin de redirection depuis les query params
    const redirectPath = route.query.redirect || '/'
    
    // Rediriger vers la page demandée
    router.push(redirectPath)
  } catch (error) {
    console.error('Erreur de connexion:', error)
  }
}
</script>
```

## 🔄 Autres guards globaux

### `afterEach`

S'exécute **après** chaque navigation réussie. Utile pour le tracking, les logs, etc.

```javascript
router.afterEach((to, from) => {
  // Log de navigation
  console.log(`Navigated from ${from.path} to ${to.path}`)
  
  // Tracking analytics
  analytics.track('page_view', { path: to.path })
})
```

### `beforeResolve`

S'exécute juste avant que la navigation soit confirmée, après que tous les guards de composants soient résolus.

```javascript
router.beforeResolve((to, from, next) => {
  // S'exécute après beforeEach et les guards de composants
  next()
})
```

## 🛡️ Guards par route

Vous pouvez définir des guards directement dans la configuration de la route :

```javascript
const router = createRouter({
  routes: [
    {
      path: '/admin',
      component: AdminPage,
      beforeEnter: (to, from, next) => {
        // Guard spécifique à cette route
        if (isAdmin()) {
          next()
        } else {
          next('/unauthorized')
        }
      }
    }
  ]
})
```

## 🎯 Guards dans les composants

Vous pouvez aussi définir des guards directement dans le composant de la route :

```vue
<script setup>
import { onBeforeRouteLeave } from 'vue-router'

// Guard avant de quitter la route
onBeforeRouteLeave((to, from, next) => {
  // Si le formulaire n'est pas sauvegardé
  if (hasUnsavedChanges.value) {
    const answer = window.confirm(
      'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?'
    )
    if (answer) {
      next()
    } else {
      next(false) // Annuler la navigation
    }
  } else {
    next()
  }
})
</script>
```

Autres guards disponibles dans les composants :

- `onBeforeRouteEnter` : Avant d'entrer dans la route
- `onBeforeRouteUpdate` : Avant de mettre à jour la route (même route, params différents)
- `onBeforeRouteLeave` : Avant de quitter la route

## 📝 Exemple complet : Système d'authentification

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../services/authService.js'

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
          component: () => import('../pages/HomePage.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'results',
          name: 'results',
          component: () => import('../pages/ResultsPage.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../pages/LoginPage.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../pages/RegisterPage.vue')
        }
      ]
    }
  ]
})

// Liste des routes protégées
const protectedRoutes = ['/', '/results']

// Guard global
router.beforeEach((to, from, next) => {
  // Vérifier si la route nécessite une authentification
  const isProtected = protectedRoutes.includes(to.path) || to.meta?.requiresAuth
  const isAuthenticated = !!getToken()

  if (isProtected && !isAuthenticated) {
    // Rediriger vers login avec le chemin de retour
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (to.path === '/login' && isAuthenticated) {
    // Si déjà connecté, rediriger depuis login
    next('/')
  } else {
    // Autoriser la navigation
    next()
  }
})

export default router
```

## ⚠️ Points importants

### Toujours appeler `next()`

**Important** : Vous devez toujours appeler `next()` dans un guard, sinon la navigation sera bloquée :

```javascript
// ✅ Bon
router.beforeEach((to, from, next) => {
  if (condition) {
    next()
  } else {
    next('/login')
  }
})

// ❌ Mauvais - La navigation sera bloquée
router.beforeEach((to, from, next) => {
  if (condition) {
    // Oublié d'appeler next() !
  }
})
```

### Ordre d'exécution

L'ordre d'exécution des guards est :

1. Navigation déclenchée
2. `beforeEach` (global)
3. `beforeEnter` (per-route)
4. `onBeforeRouteEnter` (in-component)
5. Navigation confirmée
6. `beforeResolve` (global)
7. `afterEach` (global)
8. `onBeforeRouteUpdate` (in-component, si même route)
9. `onBeforeRouteLeave` (in-component, si on quitte)

## ✅ Bonnes pratiques

1. **Utiliser `meta` pour marquer les routes protégées** : Plus maintenable que les listes
2. **Gérer les redirections** : Sauvegarder le chemin de destination pour rediriger après connexion
3. **Éviter les boucles infinies** : Ne pas rediriger vers une route protégée depuis le guard
4. **Toujours appeler `next()`** : Sinon la navigation sera bloquée
5. **Utiliser des fonctions utilitaires** : Extraire la logique d'authentification dans des fonctions réutilisables

## 📝 Résumé

- Les navigation guards permettent de contrôler la navigation
- `beforeEach` est le guard le plus utilisé pour protéger des routes
- Utilisez `to.meta.requiresAuth` pour marquer les routes protégées
- Toujours appeler `next()` pour autoriser ou rediriger la navigation
- Sauvegardez le chemin de destination pour rediriger après authentification
