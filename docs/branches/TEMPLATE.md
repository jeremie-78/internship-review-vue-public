# Template : Documentation de Branche

Ce fichier sert de template pour créer la documentation d'une nouvelle branche.

## 📋 Règles importantes

### Principe fondamental
**La documentation sur une branche décrit le travail à faire pour la branche suivante.**

Exemple : La documentation sur la branche `setup` décrit ce qu'il faut faire pour arriver à la branche `02-home-page`.

### Style des consignes
- ✅ **Décrire les besoins fonctionnels**, pas les détails techniques
- ✅ **Pas de code** dans les consignes
- ✅ **Pas de mentions techniques** (pas de `ref`, `onMounted`, `v-for`, etc.)
- ✅ Les étudiants consultent les cours théoriques pour savoir comment implémenter
- ✅ Utiliser un langage orienté "besoin" et "fonctionnalité"

### Exemples

❌ **Mauvais** :
- "Utilisez `ref` pour créer une variable réactive"
- "Importez `onMounted` depuis Vue"
- "Utilisez `v-for` pour itérer sur les offres"

✅ **Bon** :
- "Le composant doit stocker la valeur tapée par l'utilisateur"
- "La page doit charger les données au démarrage"
- "Afficher la liste des offres en utilisant le composant OfferCard pour chaque offre"

---

# Branche [NOM-BRANCHE] : [Titre descriptif]

## 🎯 Objectifs d'apprentissage

À la fin de cette branche, vous serez capable de :

- ✅ [Objectif 1 - compétence concrète]
- ✅ [Objectif 2 - compétence concrète]
- ✅ [Objectif 3 - compétence concrète]

**Note** : Les objectifs doivent être mesurables et concrets.

---

## 📚 Concepts théoriques nécessaires

Avant de commencer, assurez-vous d'avoir lu et compris :

1. [Nom du cours](../../course/XX-nom-cours.md) - [Description courte de ce qu'il couvre]
2. [Nom du cours](../../course/YY-nom-cours.md) - [Description courte de ce qu'il couvre]

**Note** : Ne référencer QUE les cours nécessaires pour cette branche. Vérifier dans PROJECT_CONTEXT.md quels concepts sont utilisés.

---

## 📋 Vue d'ensemble de la branche

Dans cette branche, vous allez créer [description fonctionnelle de ce qui sera fait] :

- [Fonctionnalité 1]
- [Fonctionnalité 2]
- [Fonctionnalité 3]

**Note** : Décrire ce qui sera sur la branche SUIVANTE, pas la branche actuelle.

---

## 🛠️ Consignes étape par étape

### Étape 1 : [Titre de l'étape]

**Objectif** : [Objectif fonctionnel de cette étape]

1. [Action à faire - description fonctionnelle]
   - [Sous-action ou détail fonctionnel]
   - [Sous-action ou détail fonctionnel]

2. [Action à faire - description fonctionnelle]
   - [Sous-action ou détail fonctionnel]

3. [Action à faire - description fonctionnelle]

**Point de contrôle** : [Critère de validation fonctionnel, pas technique]

---

### Étape 2 : [Titre de l'étape]

**Objectif** : [Objectif fonctionnel de cette étape]

1. [Action à faire - description fonctionnelle]

2. [Action à faire - description fonctionnelle]

**Point de contrôle** : [Critère de validation fonctionnel]

---

## ✅ Checklist de validation

Avant de passer à la branche suivante ([NOM-BRANCHE-SUIVANTE]), vérifiez que :

- [ ] [Critère fonctionnel de validation]
- [ ] [Critère fonctionnel de validation]
- [ ] [Critère fonctionnel de validation]
- [ ] [Critère fonctionnel de validation]
- [ ] Aucune erreur dans la console du navigateur
- [ ] Le code respecte les conventions (pas d'erreurs ESLint)

**Note** : Les critères doivent être fonctionnels, pas techniques. Éviter "utilise v-for" mais plutôt "affiche la liste des éléments".

---

## 🧪 Tests à effectuer

1. **Test [nom du test]** :
   - [Action de test]
   - [Vérification attendue]
   - [Vérification attendue]

2. **Test [nom du test]** :
   - [Action de test]
   - [Vérification attendue]

3. **Test visuel** :
   - [Vérification visuelle]
   - [Vérification responsive]

---

## 📝 Notes importantes

- **[Sujet]** : [Note importante]
- **[Sujet]** : [Note importante]
- **Consultez les cours** : Si vous ne savez pas comment implémenter quelque chose, référez-vous aux cours théoriques listés ci-dessus

---

## 🔗 Ressources complémentaires

- [Lien vers documentation externe pertinente]
- [Lien vers documentation Vue.js pertinente]
- [Autre ressource utile]

---

## 🚀 Prochaine étape

Une fois cette branche terminée et validée, vous pouvez passer à la branche suivante : **[NOM-BRANCHE-SUIVANTE]**

Sur cette branche, vous trouverez le code complet de ce que vous venez de créer, et la documentation pour la prochaine étape.

**Note importante** : Vous pouvez soit supprimer votre travail actuel (car la correction est déjà sur la branche suivante), soit créer une branche et faire un commit de votre travail pour garder une trace de votre progression.

---

**Bon courage ! 💪**

---

## 📝 Guide de création d'une nouvelle documentation

### 1. Préparation

1. **Identifier la branche actuelle** et la branche suivante
   - Exemple : Si vous documentez `02-home-page`, la doc décrit le travail pour `03-affichage-offres`

2. **Consulter PROJECT_CONTEXT.md** pour comprendre :
   - Ce qui est fait sur la branche suivante
   - Les concepts Vue.js utilisés
   - La valeur pédagogique

3. **Vérifier le code sur la branche suivante** pour comprendre exactement ce qui doit être créé

### 2. Structure à suivre

1. **Objectifs d'apprentissage** : Compétences concrètes et mesurables
2. **Concepts théoriques** : Référencer UNIQUEMENT les cours nécessaires
3. **Vue d'ensemble** : Décrire ce qui sera sur la branche SUIVANTE
4. **Consignes** : Description fonctionnelle, pas technique
5. **Checklist** : Critères fonctionnels de validation
6. **Tests** : Actions de test et vérifications
7. **Notes** : Points importants à retenir
8. **Ressources** : Liens utiles
9. **Prochaine étape** : Nom de la branche suivante

### 3. Règles d'écriture

#### ✅ À FAIRE
- Décrire les besoins fonctionnels
- Utiliser un langage orienté "besoin" et "fonctionnalité"
- Dire "le composant doit afficher..." plutôt que "utilisez v-for..."
- Dire "gérer l'état de chargement" plutôt que "créer une variable isLoading avec ref"
- Dire "émettre un événement" plutôt que "utiliser defineEmits"

#### ❌ À ÉVITER
- Mentionner des détails techniques (`ref`, `onMounted`, `v-for`, `defineEmits`, etc.)
- Donner du code d'exemple
- Dire comment implémenter techniquement
- Référencer des concepts non nécessaires

### 4. Exemples de transformation

**Avant (trop technique)** :
```
2. Dans le `<script setup>`, importez `ref` et `onMounted` depuis Vue
3. Créez une variable réactive avec `ref([])` pour stocker les offres
4. Utilisez `onMounted` pour appeler `loadOffers()` au montage
```

**Après (orienté besoin)** :
```
2. La page doit charger les offres au démarrage
3. La page doit stocker les offres récupérées pour les afficher
```

### 5. Vérification finale

Avant de finaliser, vérifiez que :
- [ ] Aucune mention technique dans les consignes
- [ ] Les consignes décrivent des besoins fonctionnels
- [ ] Les cours référencés sont tous nécessaires
- [ ] La documentation décrit bien le travail pour la branche SUIVANTE
- [ ] Les points de contrôle sont fonctionnels
- [ ] La checklist est orientée fonctionnalité

---

**Ce template doit être utilisé comme référence pour toutes les nouvelles documentations de branches.**
