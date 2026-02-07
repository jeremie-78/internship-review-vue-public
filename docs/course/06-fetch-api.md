# Fetch API et async/await

## Qu'est-ce que Fetch API ?

L'API Fetch est une interface JavaScript moderne pour faire des requêtes HTTP. Elle remplace l'ancienne `XMLHttpRequest` et est plus simple à utiliser.

## Requête GET de base

### Syntaxe de base

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error))
```

### Avec async/await

```js
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Erreur:', error)
  }
}
```

## async/await : Syntaxe moderne

`async/await` est une syntaxe JavaScript qui rend le code asynchrone plus lisible.

### Fonction async

Une fonction `async` retourne toujours une Promise :

```js
async function fetchData() {
  // Code asynchrone ici
}
```

### await

`await` attend que la Promise soit résolue avant de continuer :

```js
async function example() {
  const data = await fetch('https://api.example.com/data')
  // Le code ici attend que fetch soit terminé
}
```

## Exemple complet : Service API

L’idée est d’avoir un fichier de configuration pour l’URL de base, puis un service qui regroupe les appels HTTP. Voici un exemple avec une API **d’articles** (le principe est le même pour n’importe quelle ressource).

### Fichier de configuration

```js
// Exemple : src/services/api.js
const API_BASE_URL = 'https://api.example.com'

export { API_BASE_URL }
```

### Service qui appelle l’API

```js
// Exemple : src/services/articleService.js (principe général)
import { API_BASE_URL } from './api.js'

export async function getArticles() {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`)
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    throw error
  }
}

export async function getArticleById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`)
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article ${id}:`, error)
    throw error
  }
}
```

## Utilisation dans un composant Vue

On peut appliquer le même schéma dans n’importe quel composant : état de chargement, erreur, liste de données. Exemple avec des **articles** :

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { getArticles } from '../services/articleService.js'

const articles = ref([])
const isLoading = ref(true)
const isError = ref(false)

async function loadArticles() {
  isLoading.value = true
  isError.value = false
  
  try {
    const data = await getArticles()
    articles.value = data
  } catch (error) {
    isError.value = true
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadArticles()
})
</script>

<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else-if="isError">Erreur lors du chargement</div>
  <div v-else>
    <div v-for="article in articles" :key="article.id">
      {{ article.title }}
    </div>
  </div>
</template>
```

## Gestion des erreurs

### Vérifier le statut de la réponse

```js
async function fetchData() {
  const response = await fetch('https://api.example.com/data')
  
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`)
  }
  
  return await response.json()
}
```

### Gestion avec try/catch

```js
async function fetchData() {
  try {
    const data = await fetchData()
    // Utiliser les données
  } catch (error) {
    // Gérer l'erreur
    console.error('Erreur:', error)
  }
}
```

## Requêtes POST, PUT, DELETE

Le même principe s’applique à toute ressource. Exemple avec une API **commentaires** :

### POST

```js
async function createComment(commentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData)
    })
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erreur:', error)
    throw error
  }
}
```

### PUT

```js
async function updateComment(id, commentData) {
  const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData)
  })
  
  return await response.json()
}
```

### DELETE

```js
async function deleteComment(id) {
  const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: 'DELETE'
  })
  
  return await response.json()
}
```

## Bonnes pratiques

1. **Toujours gérer les erreurs** : Utilisez try/catch pour toutes les requêtes
2. **Vérifier response.ok** : Vérifiez toujours le statut de la réponse
3. **Gérer les états de chargement** : Affichez un indicateur pendant le chargement
4. **Séparer la logique** : Créez des services séparés pour les appels API
5. **Utiliser async/await** : Plus lisible que les Promises avec `.then()`

## Ressources

- [Documentation MDN - Fetch API](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
- [async/await sur MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function)
