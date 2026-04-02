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

### Créer un service

```js
// src/services/api.js
const API_BASE_URL = 'http://localhost:3000'

export { API_BASE_URL }
```

```js
// src/services/offerService.js
import { API_BASE_URL } from './api.js'

export async function getOffers() {
  try {
    const response = await fetch(`${API_BASE_URL}/offers`)
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des offres:', error)
    throw error
  }
}

export async function getOfferById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/offers/${id}`)
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'offre ${id}:`, error)
    throw error
  }
}
```

## Utilisation dans un composant Vue

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { getOffers } from '../services/offerService.js'

const offers = ref([])
const isLoading = ref(true)
const isError = ref(false)

async function loadOffers() {
  isLoading.value = true
  isError.value = false
  
  try {
    const data = await getOffers()
    offers.value = data
  } catch (error) {
    isError.value = true
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadOffers()
})
</script>

<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else-if="isError">Erreur lors du chargement</div>
  <div v-else>
    <div v-for="offer in offers" :key="offer.id">
      {{ offer.title }}
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

### POST

```js
async function createOffer(offerData) {
  try {
    const response = await fetch(`${API_BASE_URL}/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offerData)
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
async function updateOffer(id, offerData) {
  const response = await fetch(`${API_BASE_URL}/offers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(offerData)
  })
  
  return await response.json()
}
```

### DELETE

```js
async function deleteOffer(id) {
  const response = await fetch(`${API_BASE_URL}/offers/${id}`, {
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
