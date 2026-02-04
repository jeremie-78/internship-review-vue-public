# Composants et Props

## Qu'est-ce qu'un composant ?

Un composant Vue est une unité réutilisable qui encapsule du HTML, du CSS et du JavaScript. Les composants permettent de diviser une application en petits morceaux réutilisables.

## Créer un composant

### Structure de base

```vue
<!-- MyComponent.vue -->
<script setup>
// Logique du composant
</script>

<template>
  <div>
    <!-- Template HTML -->
  </div>
</template>

<style scoped>
/* Styles CSS */
</style>
```

### Utiliser un composant

```vue
<script setup>
import MyComponent from './components/MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

## Props : Passer des données au composant

Les **props** permettent de passer des données d'un composant parent à un composant enfant.

### Définir des props

```vue
<!-- ChildComponent.vue -->
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Compteur: {{ count }}</p>
  </div>
</template>
```

### Utiliser les props

```vue
<!-- ParentComponent.vue -->
<script setup>
import ChildComponent from './ChildComponent.vue'
</script>

<template>
  <ChildComponent title="Mon titre" :count="5" />
</template>
```

### Types de props

```vue
<script setup>
defineProps({
  // String requis
  name: {
    type: String,
    required: true
  },
  // Number avec valeur par défaut
  age: {
    type: Number,
    default: 18
  },
  // Array
  items: {
    type: Array,
    default: () => []
  },
  // Object
  config: {
    type: Object,
    default: () => ({})
  },
  // Boolean
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>
```

## Exemple complet

```vue
<!-- UserCard.vue -->
<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="user-card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
  </div>
</template>

<style scoped>
.user-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
}
</style>
```

```vue
<!-- App.vue -->
<script setup>
import UserCard from './components/UserCard.vue'

const user = {
  name: 'John Doe',
  email: 'john@example.com'
}
</script>

<template>
  <UserCard :user="user" />
</template>
```

## Bonnes pratiques

1. **Nommer les props clairement** : Utilisez des noms descriptifs
2. **Définir les types** : Toujours spécifier le type des props
3. **Valeurs par défaut** : Fournir des valeurs par défaut quand c'est approprié
4. **Props requises** : Marquer comme `required: true` si la prop est essentielle

## Ressources

- [Documentation officielle - Props](https://vuejs.org/guide/components/props.html)
- [TypeScript avec Props](https://vuejs.org/guide/typescript/composition-api.html#typing-component-props)
