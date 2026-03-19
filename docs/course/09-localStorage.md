# localStorage - Stockage dans le navigateur

## 🎯 Objectif

Apprendre à utiliser `localStorage` pour stocker des données dans le navigateur et les conserver entre les sessions.

## 📚 Qu'est-ce que localStorage ?

`localStorage` est une API du navigateur qui permet de stocker des données de manière persistante dans le navigateur de l'utilisateur. Contrairement aux variables JavaScript qui sont perdues lors du rechargement de la page, les données stockées dans `localStorage` restent disponibles même après la fermeture du navigateur.

### Caractéristiques importantes

- **Persistance** : Les données restent même après la fermeture du navigateur
- **Par domaine** : Chaque site web a son propre `localStorage` (séparé par domaine)
- **Stockage limité** : Environ 5-10 MB selon le navigateur
- **Clé-valeur** : Stocke uniquement des paires clé-valeur en format string
- **Synchrone** : Les opérations sont synchrones (bloquantes)

## 🔧 Méthodes principales

### `setItem(key, value)`

Stocke une valeur associée à une clé.

```javascript
// Stocker une valeur
localStorage.setItem('username', 'John')
localStorage.setItem('age', '25')
```

**Important** : `localStorage` ne stocke que des chaînes de caractères. Pour stocker des objets, il faut les convertir en JSON :

```javascript
const user = { name: 'John', age: 25 }
localStorage.setItem('user', JSON.stringify(user))
```

### `getItem(key)`

Récupère la valeur associée à une clé.

```javascript
// Récupérer une valeur
const username = localStorage.getItem('username') // 'John'
const age = localStorage.getItem('age') // '25'
```

Si la clé n'existe pas, `getItem` retourne `null` :

```javascript
const notFound = localStorage.getItem('nonexistent') // null
```

Pour récupérer un objet stocké :

```javascript
const userString = localStorage.getItem('user')
const user = JSON.parse(userString) // { name: 'John', age: 25 }
```

### `removeItem(key)`

Supprime une clé et sa valeur.

```javascript
localStorage.removeItem('username')
localStorage.getItem('username') // null
```

### `clear()`

Supprime toutes les données du `localStorage` pour le domaine actuel.

```javascript
localStorage.clear() // Supprime tout
```

### `key(index)`

Récupère le nom de la clé à l'index donné.

```javascript
localStorage.setItem('key1', 'value1')
localStorage.setItem('key2', 'value2')
localStorage.key(0) // 'key1'
localStorage.key(1) // 'key2'
```

## 💡 Exemples pratiques

### Exemple 1 : Stocker et récupérer un token d'authentification

```javascript
// Stocker le token après connexion
const token = 'abc123xyz'
localStorage.setItem('auth_token', token)

// Récupérer le token
const savedToken = localStorage.getItem('auth_token')
if (savedToken) {
  console.log('Utilisateur connecté avec token:', savedToken)
} else {
  console.log('Aucun token trouvé')
}

// Supprimer le token lors de la déconnexion
localStorage.removeItem('auth_token')
```

### Exemple 2 : Stocker des préférences utilisateur

```javascript
// Stocker les préférences
const preferences = {
  theme: 'dark',
  language: 'fr',
  notifications: true
}
localStorage.setItem('preferences', JSON.stringify(preferences))

// Récupérer les préférences
const savedPrefs = localStorage.getItem('preferences')
if (savedPrefs) {
  const prefs = JSON.parse(savedPrefs)
  console.log('Thème:', prefs.theme) // 'dark'
}
```

### Exemple 3 : Gérer les erreurs

`localStorage` peut échouer dans certains cas (mode privé, quota dépassé). Il faut gérer les erreurs :

```javascript
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error('Erreur lors du stockage:', error)
    return false
  }
}

function getFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Erreur lors de la récupération:', error)
    return null
  }
}
```

## 🔄 Utilisation avec Vue.js

Dans Vue.js, vous pouvez utiliser `localStorage` dans vos composants ou services :

```javascript
// Dans un service
export function saveToken(token) {
  localStorage.setItem('auth_token', token)
}

export function getToken() {
  return localStorage.getItem('auth_token')
}

export function removeToken() {
  localStorage.removeItem('auth_token')
}

// Dans un composant
import { onMounted, ref } from 'vue'

const user = ref(null)

onMounted(() => {
  // Récupérer les données au chargement
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})

// Sauvegarder quand l'utilisateur change
function updateUser(newUser) {
  user.value = newUser
  localStorage.setItem('user', JSON.stringify(newUser))
}
```

## ⚠️ Limitations et bonnes pratiques

### Limitations

1. **Taille limitée** : Environ 5-10 MB par domaine
2. **Format string uniquement** : Nécessite `JSON.stringify/parse` pour les objets
3. **Synchrone** : Peut bloquer le thread principal si beaucoup de données
4. **Pas de sécurité** : Accessible par JavaScript, ne pas stocker de données sensibles
5. **Par domaine** : Séparé par domaine, pas accessible entre domaines différents

### Bonnes pratiques

1. **Gérer les erreurs** : Toujours utiliser `try/catch` pour gérer les erreurs potentielles
2. **Valider les données** : Vérifier que les données existent avant de les utiliser
3. **Ne pas stocker de données sensibles** : Pas de mots de passe, tokens sensibles, etc.
4. **Nettoyer** : Supprimer les données inutiles pour éviter de remplir le quota
5. **Utiliser des clés descriptives** : Nommer clairement les clés pour éviter les conflits

## 🆚 localStorage vs sessionStorage

`sessionStorage` fonctionne de la même manière que `localStorage`, mais les données sont supprimées à la fermeture de l'onglet :

| Caractéristique | localStorage | sessionStorage |
|----------------|--------------|----------------|
| Persistance | Survit à la fermeture du navigateur | Supprimé à la fermeture de l'onglet |
| Portée | Par domaine | Par onglet |
| Utilisation | Données persistantes (préférences, tokens) | Données temporaires (panier, formulaire) |

## 📝 Résumé

- `localStorage` permet de stocker des données de manière persistante dans le navigateur
- Utilisez `setItem()` pour stocker, `getItem()` pour récupérer, `removeItem()` pour supprimer
- Convertissez les objets en JSON avec `JSON.stringify()` avant de stocker
- Parsez les données avec `JSON.parse()` après récupération
- Gérez toujours les erreurs avec `try/catch`
- Ne stockez pas de données sensibles dans `localStorage`
