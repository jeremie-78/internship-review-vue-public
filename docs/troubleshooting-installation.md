# Dépannage de l'installation (monorepo)

Problèmes fréquents lors de `npm install` dans ce monorepo et solutions.

## À essayer en premier

```bash
npm run clean-install
```

Ce script supprime `node_modules`, les `package-lock.json` (dont ceux dans `apps/`) et relance `npm install`.

---

## Symptômes possibles

- Installation qui échoue au milieu (erreur après quelques modules)
- `npm cache clean --force` qui échoue avec « prefix can't find module »
- Erreurs différentes selon Mac / Windows
- Installations partielles ou incohérentes

---

## Solution 1 : Nettoyage complet puis réinstallation

**Depuis la racine du projet** (là où se trouve le `package.json` principal) :

```bash
# 1. Supprimer node_modules à tous les niveaux
rm -rf node_modules apps/vue/node_modules apps/nuxt/node_modules

# 2. Supprimer UNIQUEMENT le package-lock.json racine
rm -f package-lock.json

# 3. Sur Windows (PowerShell), équivalent :
# Remove-Item -Recurse -Force node_modules, apps\vue\node_modules, apps\nuxt\node_modules
# Remove-Item -Force package-lock.json
```

Puis réinstaller :

```bash
npm install
```

---

## Solution 2 : Si `npm cache clean` échoue (« prefix can't find module »)

Cette erreur indique souvent un problème de configuration npm global. Essayez **dans l'ordre** :

### Option A : Vider le cache sans `npm cache clean`

```bash
# Mac / Linux — emplacement par défaut du cache npm
rm -rf ~/.npm/_cacache

# Windows — chemin typique
# Supprimer le dossier : %APPDATA%\npm-cache\_cacache
```

Puis relancer `npm install` depuis la racine.

### Option B : Forcer le répertoire de travail

```bash
cd /chemin/vers/internship-review-vue   # Chemin complet vers le projet
npm install
```

### Option C : Réinitialiser le prefix npm (si erreur persistante)

```bash
npm config get prefix
# Si le chemin est bizarre ou inexistant :
npm config set prefix ~/.npm-global
# Ou pour revenir au défaut :
npm config delete prefix
```

---

## Solution 3 : Version de Node incompatible

Le projet requiert **Node 20.19+ ou 22.12+**. Vérifier :

```bash
node -v
```

Si la version est trop ancienne (ex. 18.x, 16.x) :

- Installer [nvm](https://github.com/nvm-sh/nvm) (Mac/Linux) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows)
- Puis : `nvm install 22` et `nvm use 22`

---

## Solution 4 : Installer depuis la racine uniquement

Ne jamais faire `npm install` à l’intérieur de `apps/vue` ou `apps/nuxt`.

Toujours exécuter :

```bash
# Depuis la racine du monorepo
cd internship-review-vue
npm install
```

---

## Solution 5 : Connexion / pare-feu / antivirus

Des échecs intermittents peuvent venir de :

- Pare-feu ou proxy bloquant les requêtes vers `registry.npmjs.org`
- Antivirus bloquant l’écriture dans `node_modules`

À tester : désactiver temporairement l’antivirus pendant `npm install`, ou vérifier les paramètres proxy si vous en utilisez un.

---

## Solution 6 : Réseau instable

En cas de timeouts ou échecs liés au réseau :

```bash
npm install --prefer-offline --no-audit --no-fund
```

Ou augmenter le timeout :

```bash
npm config set fetch-timeout 60000
npm install
```

---

## Checklist rapide

1. [ ] Être à la **racine** du projet (`internship-review-vue`)
2. [ ] Node 20.19+ ou 22.12+ (`node -v`)
3. [ ] Supprimer `node_modules` (racine + apps)
4. [ ] Supprimer `package-lock.json` (racine uniquement)
5. [ ] Si besoin : vider `~/.npm/_cacache` (au lieu de `npm cache clean`)
6. [ ] Exécuter `npm install`

Si le problème persiste, copier le message d’erreur complet (y compris la stack trace) pour le diagnostic.
