# Watchers : Réagir aux changements

## Qu'est-ce qu'un watcher ?

Les watchers permettent d'exécuter du code quand une valeur réactive change. C'est utile pour réagir à des changements de données et déclencher des actions automatiques.

## watch : Surveiller une valeur

`watch` surveille une valeur réactive et exécute une fonction quand elle change :

```vue
<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')

watch(searchQuery, (newValue, oldValue) => {
  console.log(`La recherche a changé de "${oldValue}" à "${newValue}"`)
  // Exécuter une action quand la recherche change
})
</script>
```

## Syntaxe de base

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(`Compteur: ${oldValue} → ${newValue}`)
})
</script>
```

## Surveiller des propriétés d'objets

Vous pouvez surveiller une propriété spécifique d'un objet :

```vue
<script setup>
import { ref, watch } from 'vue'

const user = ref({
  name: 'John',
  age: 25
})

watch(
  () => user.value.name, // Fonction getter pour accéder à la propriété
  (newName, oldName) => {
    console.log(`Nom changé: ${oldName} → ${newName}`)
  }
)
</script>
```

## Exemple pratique : Réagir aux changements d'URL

Un cas d'usage courant est de réagir aux changements de paramètres dans l'URL :

```vue
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.query.q, // Surveiller le paramètre de recherche dans l'URL
  (newQuery) => {
    // Exécuter une action quand le paramètre change
    if (newQuery) {
      performSearch(newQuery)
    } else {
      loadAllOffers()
    }
  }
)
</script>
```

## watch avec options

Vous pouvez passer des options à `watch` :

```vue
<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')

watch(
  searchQuery,
  (newValue) => {
    // Fonction exécutée quand la valeur change
    performSearch(newValue)
  },
  {
    immediate: true, // Exécuter immédiatement au montage
    deep: true // Surveiller les changements profonds dans les objets
  }
)
</script>
```

## watchEffect : Alternative automatique

`watchEffect` exécute automatiquement le code et suit toutes les dépendances réactives utilisées :

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const searchQuery = ref('')
const results = ref([])

watchEffect(() => {
  // Ce code s'exécute automatiquement quand searchQuery change
  if (searchQuery.value) {
    performSearch(searchQuery.value)
  }
})
</script>
```

## Exemple complet : Recherche avec watcher

```vue
<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getOffers, searchOffers } from '../services/offerService.js'

const route = useRoute()
const offers = ref([])
const isLoading = ref(false)

async function loadOffers() {
  isLoading.value = true
  try {
    const searchQuery = route.query.q
    if (searchQuery) {
      offers.value = await searchOffers(searchQuery)
    } else {
      offers.value = await getOffers()
    }
  } finally {
    isLoading.value = false
  }
}

// Charger au montage
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
```

## Quand utiliser watch ?

- **Réagir aux changements d'URL** : Quand les query parameters changent
- **Valider des données** : Quand un champ change
- **Sauvegarder automatiquement** : Quand des données sont modifiées
- **Synchroniser des états** : Entre différents composants ou sources de données

## Bonnes pratiques

1. **Éviter les watchers inutiles** : Utilisez la réactivité directe quand possible
2. **Nettoyer les watchers** : Les watchers sont automatiquement nettoyés quand le composant est détruit
3. **Utiliser watchEffect** : Pour des cas simples où vous voulez suivre toutes les dépendances automatiquement
4. **Éviter les boucles infinies** : Ne modifiez pas la valeur surveillée dans le watcher sans condition

## Ressources

- [Documentation officielle - Watchers](https://vuejs.org/guide/essentials/watchers.html)
- [watchEffect](https://vuejs.org/guide/essentials/watchers.html#watcheffect)
