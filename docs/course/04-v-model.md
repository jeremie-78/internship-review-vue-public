# v-model : Liaison bidirectionnelle

## Qu'est-ce que v-model ?

`v-model` est une directive Vue.js qui crée une liaison bidirectionnelle entre un élément de formulaire et une variable réactive. Cela signifie que lorsque l'utilisateur modifie la valeur dans le formulaire, la variable est automatiquement mise à jour, et vice versa.

## Utilisation de base

### Avec un input texte

```vue
<script setup>
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <input v-model="message" type="text" />
  <p>Vous avez tapé : {{ message }}</p>
</template>
```

Quand vous tapez dans l'input, la variable `message` est automatiquement mise à jour, et le paragraphe affiche la valeur en temps réel.

### Avec différents types d'inputs

**Input texte** :
```vue
<input v-model="text" type="text" />
```

**Textarea** :
```vue
<textarea v-model="description"></textarea>
```

**Checkbox** :
```vue
<input v-model="isChecked" type="checkbox" />
```

**Radio** :
```vue
<input v-model="selectedOption" type="radio" value="option1" />
<input v-model="selectedOption" type="radio" value="option2" />
```

**Select** :
```vue
<select v-model="selectedCity">
  <option value="paris">Paris</option>
  <option value="lyon">Lyon</option>
  <option value="marseille">Marseille</option>
</select>
```

## Comment ça fonctionne ?

`v-model` est en fait un raccourci pour :

```vue
<!-- Ceci -->
<input v-model="message" />

<!-- Est équivalent à -->
<input 
  :value="message" 
  @input="message = $event.target.value" 
/>
```

- `:value` lie la valeur de l'input à la variable
- `@input` écoute les changements et met à jour la variable

## Modificateurs de v-model

Vue.js fournit des modificateurs pour `v-model` :

### .trim

Supprime automatiquement les espaces au début et à la fin :

```vue
<input v-model.trim="searchQuery" />
```

### .number

Convertit la valeur en nombre :

```vue
<input v-model.number="age" type="number" />
```

### .lazy

Met à jour la variable seulement après que l'utilisateur ait quitté le champ (au lieu de chaque frappe) :

```vue
<input v-model.lazy="email" />
```

### Combinaison de modificateurs

Vous pouvez combiner plusieurs modificateurs :

```vue
<input v-model.trim.lazy="searchQuery" />
```

## Exemple pratique : Formulaire de recherche

```vue
<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

function handleSearch() {
  if (searchQuery.value.trim()) {
    console.log('Recherche:', searchQuery.value)
    // Logique de recherche
  }
}
</script>

<template>
  <form @submit.prevent="handleSearch">
    <input 
      v-model.trim="searchQuery" 
      type="text" 
      placeholder="Rechercher..."
    />
    <button type="submit" :disabled="!searchQuery.trim()">
      Rechercher
    </button>
  </form>
</template>
```

Dans cet exemple :
- `v-model.trim` lie l'input à `searchQuery` et supprime les espaces
- Le bouton est désactivé si la requête est vide
- Le formulaire empêche le rechargement avec `.prevent`

## v-model avec les composants personnalisés

Vous pouvez aussi utiliser `v-model` avec vos propres composants :

### Composant enfant - Approche avec fonction

```vue
<!-- SearchInput.vue -->
<script setup>
defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <input :value="modelValue" @input="updateValue" />
</template>
```

### Composant enfant - Approche avec computed (recommandée)

```vue
<!-- SearchInput.vue -->
<script setup>
import { computed } from 'vue'

defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <input v-model="searchQuery" />
</template>
```

### Composant parent

```vue
<script setup>
import { ref } from 'vue'
import SearchInput from './SearchInput.vue'

const searchQuery = ref('')
</script>

<template>
  <SearchInput v-model="searchQuery" />
</template>
```

**Note** : L'approche avec `computed` est plus élégante car elle permet d'utiliser directement `v-model` dans le template du composant enfant.

## Bonnes pratiques

1. **Utilisez .trim** : Pour les champs de texte, utilisez souvent `.trim` pour éviter les espaces inutiles
2. **Validez les données** : Vérifiez toujours que les données ne sont pas vides avant de les utiliser
3. **Désactivez les boutons** : Désactivez les boutons de soumission si les champs requis sont vides
4. **Utilisez .lazy** : Pour les gros formulaires, utilisez `.lazy` pour améliorer les performances

## Ressources

- [Documentation officielle - v-model](https://vuejs.org/guide/essentials/forms.html)
- [v-model avec composants](https://vuejs.org/guide/components/v-model.html)
