# Composables - Réutiliser la logique

## 🎯 Objectif

Apprendre à créer et utiliser des composables pour partager la logique et l'état entre plusieurs composants Vue.js.

## 📚 Qu'est-ce qu'un composable ?

Un composable est une fonction qui encapsule une logique réutilisable avec état. C'est une convention de nommage Vue.js pour les fonctions qui utilisent la Composition API.

### Caractéristiques

- **Réutilisable** : La même logique peut être utilisée dans plusieurs composants
- **Avec état** : Peut gérer un état réactif partagé ou local
- **Composition API** : Utilise `ref`, `computed`, `watch`, etc.
- **Convention de nommage** : Commence par `use` (ex: `useAuth`, `useCounter`)

## 🔧 Structure d'un composable

Un composable est simplement une fonction qui retourne des valeurs réactives et des fonctions :

```javascript
import { ref, computed } from 'vue'

export function useCounter() {
  // État local au composable
  const count = ref(0)

  // Fonctions
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  // Propriété calculée
  const isEven = computed(() => count.value % 2 === 0)

  // Retourner ce qui doit être accessible depuis le composant
  return {
    count,
    increment,
    decrement,
    reset,
    isEven
  }
}
```

## 💡 Exemple 1 : Composable simple (compteur)

### Créer le composable

```javascript
// src/composables/useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  return {
    count,
    increment,
    decrement,
    reset
  }
}
```

### Utiliser le composable dans un composant

```vue
<script setup>
import { useCounter } from '../composables/useCounter.js'

const { count, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <div>
    <p>Compteur: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

## 💡 Exemple 2 : Composable avec état partagé

Parfois, vous voulez partager l'état entre plusieurs composants. Pour cela, déclarez l'état en dehors de la fonction :

```javascript
// src/composables/useAuth.js
import { ref, computed } from 'vue'
import { login as authLogin, logout as authLogout, getToken } from '../services/authService.js'

// État partagé entre tous les composants qui utilisent useAuth
const currentUser = ref(null)
const token = ref(getToken())

// Propriété calculée partagée
const isAuthenticated = computed(() => {
  return !!token.value
})

export function useAuth() {
  async function login(email, password) {
    const user = await authLogin(email, password)
    // Mettre à jour l'état partagé
    token.value = getToken()
    currentUser.value = user
    return user
  }

  function logout() {
    authLogout()
    // Réinitialiser l'état partagé
    token.value = null
    currentUser.value = null
  }

  // Retourner l'état et les fonctions
  return {
    currentUser,
    token,
    isAuthenticated,
    login,
    logout
  }
}
```

### Utilisation dans plusieurs composants

```vue
<!-- ComponentA.vue -->
<script setup>
import { useAuth } from '../composables/useAuth.js'

const { currentUser, isAuthenticated, login } = useAuth()
</script>

<!-- ComponentB.vue -->
<script setup>
import { useAuth } from '../composables/useAuth.js'

// Même état partagé que ComponentA
const { currentUser, logout } = useAuth()
</script>
```

## 💡 Exemple 3 : Composable pour les appels API

```javascript
// src/composables/useApi.js
import { ref } from 'vue'

export function useApi(url) {
  const data = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchData() {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données')
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    isLoading,
    error,
    fetchData
  }
}
```

### Utilisation

```vue
<script setup>
import { onMounted } from 'vue'
import { useApi } from '../composables/useApi.js'

const { data, isLoading, error, fetchData } = useApi('/api/offers')

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else-if="error">Erreur: {{ error }}</div>
  <div v-else>{{ data }}</div>
</template>
```

## 🔄 Cycle de vie et watchers

Vous pouvez utiliser des watchers dans un composable :

```javascript
import { ref, watch } from 'vue'

export function useSearch(query) {
  const results = ref([])
  const isLoading = ref(false)

  // Watcher pour réagir aux changements de query
  watch(query, async (newQuery) => {
    if (newQuery.length > 2) {
      isLoading.value = true
      // Faire la recherche
      results.value = await searchAPI(newQuery)
      isLoading.value = false
    }
  })

  return {
    results,
    isLoading
  }
}
```

## 📁 Organisation des composables

Organisez vos composables dans un dossier `composables` :

```
src/
  composables/
    useAuth.js
    useCounter.js
    useApi.js
    useSearch.js
```

## ✅ Bonnes pratiques

### 1. Nommer avec `use`

Tous les composables doivent commencer par `use` :

```javascript
// ✅ Bon
export function useAuth() { }
export function useCounter() { }

// ❌ Mauvais
export function auth() { }
export function counter() { }
```

### 2. Retourner un objet

Retournez toujours un objet avec les propriétés nommées :

```javascript
// ✅ Bon
return {
  count,
  increment,
  decrement
}

// ❌ Mauvais
return [count, increment, decrement] // Difficile à utiliser
```

### 3. État partagé vs état local

- **État local** : Déclaré dans la fonction → chaque composant a son propre état
- **État partagé** : Déclaré en dehors → tous les composants partagent le même état

```javascript
// État local (chaque composant a son propre compteur)
export function useCounter() {
  const count = ref(0) // Dans la fonction
  return { count }
}

// État partagé (tous les composants partagent le même état)
const count = ref(0) // En dehors de la fonction
export function useCounter() {
  return { count }
}
```

### 4. Gérer les effets de bord

Si votre composable a des effets de bord (abonnements, timers), nettoyez-les :

```javascript
import { onUnmounted } from 'vue'

export function useTimer() {
  let intervalId = null

  function start() {
    intervalId = setInterval(() => {
      console.log('Tick')
    }, 1000)
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId)
    }
  }

  // Nettoyer au démontage
  onUnmounted(() => {
    stop()
  })

  return { start, stop }
}
```

## 🆚 Composables vs Mixins

Les composables remplacent les mixins de Vue 2 :

| Caractéristique | Composables | Mixins (Vue 2) |
|----------------|-------------|----------------|
| Composition API | ✅ | ❌ |
| TypeScript | ✅ Meilleur support | ⚠️ Support limité |
| Clarté | ✅ Source claire | ⚠️ Peut être confus |
| Conflits | ✅ Pas de conflits | ❌ Conflits possibles |

## 📝 Résumé

- Un composable est une fonction qui encapsule une logique réutilisable
- Commencez toujours le nom par `use`
- Retournez un objet avec les propriétés nommées
- Utilisez l'état local pour des instances séparées, l'état partagé pour un état global
- Organisez vos composables dans le dossier `composables`
- Nettoyez les effets de bord dans `onUnmounted`
