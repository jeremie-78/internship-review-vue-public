# Query Parameters avec Vue Router

## Qu'est-ce qu'un query parameter ?

Les query parameters sont des paramètres passés dans l'URL après le `?`. Ils permettent de partager l'état de l'application via l'URL.

Exemple : `/results?q=developpeur&location=paris`

## Lire les query parameters

Utilisez `useRoute` pour accéder aux query parameters :

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// Lire un paramètre spécifique
const searchQuery = route.query.q

// Lire plusieurs paramètres
const location = route.query.location
const type = route.query.type
</script>
```

## Navigation avec query parameters

Utilisez `useRouter` pour naviguer avec des query parameters :

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function search(query) {
  router.push({
    path: '/results',
    query: { q: query }
  })
  // Crée une URL : /results?q=developpeur
}
</script>
```

## Exemple complet : Recherche avec query parameters

### Page HomePage

```vue
<script setup>
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'

const router = useRouter()

function handleSearch(query) {
  router.push({
    path: '/results',
    query: { q: query }
  })
}
</script>

<template>
  <SearchBar @search="handleSearch" />
</template>
```

### Page ResultsPage

```vue
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getOffers, searchOffers } from '../services/offerService.js'

const route = useRoute()
const offers = ref([])

async function loadOffers() {
  const searchQuery = route.query.q
  
  if (searchQuery) {
    offers.value = await searchOffers(searchQuery)
  } else {
    offers.value = await getOffers()
  }
}

onMounted(() => {
  loadOffers()
})

// Réagir aux changements d'URL
watch(
  () => route.query.q,
  () => {
    loadOffers()
  }
)
</script>

<template>
  <div>
    <p v-if="route.query.q">
      Résultats pour : "{{ route.query.q }}"
    </p>
    <!-- Afficher les offres -->
  </div>
</template>
```

## Plusieurs query parameters

Vous pouvez passer plusieurs paramètres :

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function advancedSearch(query, location, type) {
  router.push({
    path: '/results',
    query: {
      q: query,
      location: location,
      type: type
    }
  })
  // Crée : /results?q=developpeur&location=paris&type=stage
}
</script>
```

## Modifier les query parameters

Pour modifier un paramètre existant sans perdre les autres :

```vue
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function updateLocation(newLocation) {
  router.push({
    path: route.path,
    query: {
      ...route.query, // Garder les paramètres existants
      location: newLocation // Modifier ou ajouter location
    }
  })
}
</script>
```

## Supprimer un query parameter

Pour supprimer un paramètre :

```vue
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function clearSearch() {
  router.push({
    path: '/results'
    // Pas de query, donc tous les paramètres sont supprimés
  })
}
</script>
```

## Avantages des query parameters

1. **Partageable** : L'URL peut être partagée avec l'état de recherche
2. **Navigable** : Le bouton retour du navigateur fonctionne
3. **Bookmarkable** : L'utilisateur peut sauvegarder une recherche
4. **SEO** : Les paramètres sont visibles dans l'URL

## Bonnes pratiques

1. **Encoder les valeurs** : Vue Router encode automatiquement, mais soyez conscient des caractères spéciaux
2. **Valider les paramètres** : Vérifiez toujours que les paramètres existent avant de les utiliser
3. **Réagir aux changements** : Utilisez `watch` pour réagir aux changements d'URL
4. **Synchroniser l'état** : Gardez l'état de l'application synchronisé avec l'URL

## Ressources

- [Vue Router - Query Parameters](https://router.vuejs.org/guide/essentials/navigation.html#query-parameters)
- [Vue Router - Programmatic Navigation](https://router.vuejs.org/guide/essentials/navigation.html)
