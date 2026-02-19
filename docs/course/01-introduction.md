# Introduction à Vue.js

## Qu'est-ce que Vue.js ?

Vue.js est un framework JavaScript progressif pour construire des interfaces utilisateur. Il est conçu pour être adopté progressivement : vous pouvez l'utiliser pour améliorer des parties d'une application existante ou construire une application complète.

## Concepts fondamentaux

### 1. Vue Instance / Composant

En Vue 3, nous utilisons principalement la **Composition API** avec `<script setup>` :

```vue
<script setup>
// Votre logique JavaScript ici
const message = 'Hello Vue!'
</script>

<template>
  <!-- Votre HTML avec directives Vue -->
  <div>{{ message }}</div>
</template>
```

### 2. Interpolation de données

Utilisez la syntaxe `{{ }}` pour afficher des données dans le template :

```vue
<template>
  <h1>{{ title }}</h1>
  <p>{{ description }}</p>
</template>

<script setup>
const title = 'Mon titre'
const description = 'Ma description'
</script>
```

### 3. Directives Vue

Les directives sont des attributs spéciaux préfixés par `v-` :

- **v-model** : Liaison bidirectionnelle pour les formulaires (voir [cours dédié](./04-v-model.md))
- **v-if / v-else / v-show** : Affichage conditionnel (voir ci-dessous)
- **v-for** : Boucles pour lister des éléments (voir ci-dessous)
- **v-on** ou **@** : Écouter des événements
- **v-bind** ou **:** : Lier des attributs

#### v-if / v-else : Affichage conditionnel

`v-if` permet d'afficher conditionnellement un élément selon une condition :

```vue
<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
const hasError = ref(false)
const data = ref(null)
</script>

<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else-if="hasError">Une erreur est survenue</div>
  <div v-else>{{ data }}</div>
</template>
```

**v-if vs v-else-if vs v-else** :
- `v-if` : Condition principale
- `v-else-if` : Condition alternative (peut être répété plusieurs fois)
- `v-else` : Cas par défaut si aucune condition n'est vraie

**Exemple pratique : Gestion d'états** :

```vue
<template>
  <!-- État de chargement -->
  <div v-if="isLoading">
    <p>Chargement des données...</p>
  </div>
  
  <!-- État d'erreur -->
  <div v-else-if="hasError">
    <p>Erreur : {{ errorMessage }}</p>
    <button @click="retry">Réessayer</button>
  </div>
  
  <!-- Données chargées -->
  <div v-else>
    <div v-for="item in items" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
```

**Note** : `v-if` supprime complètement l'élément du DOM s'il est faux. Pour un simple masquage CSS, utilisez `v-show`.

#### v-for : Itérer sur des listes

`v-for` permet de créer une boucle pour afficher une liste d'éléments :

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
```

**Important** : Toujours utiliser `:key` avec `v-for` pour de meilleures performances. La clé doit être unique.

Vous pouvez aussi accéder à l'index :

```vue
<li v-for="(item, index) in items" :key="item.id">
  {{ index + 1 }}. {{ item.name }}
</li>
```

### 4. Réactivité

Vue.js rend les données réactives automatiquement :

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++ // Notez le .value pour les ref
}
</script>

<template>
  <button @click="increment">Compteur: {{ count }}</button>
</template>
```

## Structure d'un composant Vue

```vue
<script setup>
// 1. Imports
import { ref } from 'vue'

// 2. État réactif
const data = ref('valeur')

// 3. Fonctions
function handleClick() {
  // Logique
}

// 4. Lifecycle hooks (optionnel)
import { onMounted } from 'vue'
onMounted(() => {
  // Code exécuté après le montage du composant
  // Idéal pour charger des données depuis une API
})
```

### 5. Lifecycle Hooks

Les hooks de cycle de vie permettent d'exécuter du code à des moments précis du cycle de vie d'un composant :

**onMounted** : Exécuté après que le composant soit monté dans le DOM

```vue
<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)

onMounted(async () => {
  // Charger des données depuis une API
  const response = await fetch('/api/data')
  data.value = await response.json()
})
</script>
```

**Autres hooks courants** :
- `onBeforeMount` : Avant le montage
- `onUpdated` : Après une mise à jour
- `onUnmounted` : Avant la destruction du composant

<template>
  <!-- Structure HTML -->
  <div>
    <!-- Contenu -->
  </div>
</template>

<style scoped>
/* Styles CSS (optionnel) */
</style>
```

## Ressources

- [Documentation officielle Vue.js](https://vuejs.org/)
- [Guide de démarrage](https://vuejs.org/guide/quick-start.html)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
