# Events et Communication entre Composants

## Événements Vue

Les événements permettent à un composant enfant de communiquer avec son parent.

## Écouter des événements

### Syntaxe de base

```vue
<!-- ParentComponent.vue -->
<script setup>
function handleClick(message) {
  console.log('Message reçu:', message)
}
</script>

<template>
  <ChildComponent @click="handleClick" />
</template>
```

### Syntaxe courte avec @

```vue
<template>
  <!-- Équivalent -->
  <ChildComponent @click="handleClick" />
  <ChildComponent v-on:click="handleClick" />
</template>
```

## Émettre des événements

Un composant enfant peut émettre un événement vers son parent avec `emit`.

### Définir les événements

```vue
<!-- ChildComponent.vue -->
<script setup>
const emit = defineEmits(['click', 'update', 'delete'])

function handleButtonClick() {
  emit('click', 'Données envoyées au parent')
}
</script>

<template>
  <button @click="handleButtonClick">Cliquer</button>
</template>
```

### Émettre avec des données

```vue
<script setup>
const emit = defineEmits(['search'])

const query = ref('')

function handleSearch() {
  emit('search', query.value)
}
</script>

<template>
  <input v-model="query" />
  <button @click="handleSearch">Rechercher</button>
</template>
```

## Exemple complet : Formulaire de recherche

### Composant enfant (SearchBar)

```vue
<!-- SearchBar.vue -->
<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])

const searchQuery = ref('')

function handleSubmit() {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="searchQuery" type="text" placeholder="Rechercher..." />
    <button type="submit">Rechercher</button>
  </form>
</template>
```

### Composant parent (HomePage)

```vue
<!-- HomePage.vue -->
<script setup>
import SearchBar from './components/SearchBar.vue'

function handleSearch(query) {
  console.log('Recherche:', query)
  // Traiter la recherche
}
</script>

<template>
  <div>
    <SearchBar @search="handleSearch" />
  </div>
</template>
```

## Événements natifs du DOM

Vous pouvez aussi écouter les événements natifs du navigateur :

```vue
<template>
  <!-- Événements de formulaire -->
  <form @submit.prevent="handleSubmit">
    <!-- .prevent empêche le rechargement de page -->
  </form>

  <!-- Événements de clic -->
  <button @click="handleClick">Cliquer</button>

  <!-- Événements de clavier -->
  <input @keyup.enter="handleEnter" />

  <!-- Événements de souris -->
  <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    Survoler
  </div>
</template>
```

## Modificateurs d'événements

Vue.js fournit des modificateurs pour les événements courants :

- **.prevent** : `event.preventDefault()`
- **.stop** : `event.stopPropagation()`
- **.once** : Ne déclencher qu'une seule fois
- **.enter**, **.esc**, etc. : Pour les touches du clavier

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Empêche le rechargement de page -->
  </form>

  <button @click.stop="handleClick">
    <!-- Empêche la propagation -->
  </button>

  <input @keyup.enter="handleEnter" />
  <!-- Se déclenche uniquement sur Enter -->
</template>
```

## Communication bidirectionnelle

Pour une communication bidirectionnelle, combinez props et events :

```vue
<!-- ChildComponent.vue -->
<script setup>
const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateValue(newValue) {
  emit('update:modelValue', newValue)
}
</script>

<template>
  <input :value="modelValue" @input="updateValue($event.target.value)" />
</template>
```

```vue
<!-- ParentComponent.vue -->
<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const value = ref('')
</script>

<template>
  <ChildComponent v-model="value" />
</template>
```

## Bonnes pratiques

1. **Nommer les événements clairement** : Utilisez des noms descriptifs (`search`, `update`, `delete`)
2. **Passer des données structurées** : Envoyez des objets plutôt que plusieurs paramètres
3. **Valider les données** : Vérifiez les données avant d'émettre
4. **Utiliser v-model** : Pour les cas de communication bidirectionnelle

## Ressources

- [Documentation officielle - Events](https://vuejs.org/guide/components/events.html)
- [v-model personnalisé](https://vuejs.org/guide/components/v-model.html)
