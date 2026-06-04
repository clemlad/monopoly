# 🎩 Monopoly – Version Française

Jeu de Monopoly complet en HTML/CSS/JS vanilla, sans dépendances.

## 🚀 Déploiement sur Vercel (2 méthodes)

### Méthode 1 — Via l'interface Vercel (la plus simple)

1. Crée un compte sur [vercel.com](https://vercel.com) (gratuit)
2. Va sur [vercel.com/new](https://vercel.com/new)
3. Clique sur **"Deploy without Git"** ou **"Browse"**
4. Glisse-dépose ce dossier `monopoly/`
5. Clique **Deploy** → c'est en ligne en 30 secondes ✅

### Méthode 2 — Via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Dans le dossier du projet
cd monopoly
vercel

# Suivre les prompts (tout accepter par défaut)
# → URL publique fournie automatiquement
```

### Méthode 3 — Via GitHub + Vercel (pour garder les mises à jour)

1. Push ce dossier sur un repo GitHub
2. Va sur [vercel.com/new](https://vercel.com/new)
3. Importe le repo GitHub
4. Deploy → chaque `git push` redéploie automatiquement ✅

## 🎮 Fonctionnalités

- **2 à 6 joueurs** (humains et/ou bots 🤖)
- Plateau complet avec les **40 cases** version française
- Achat de propriétés, paiement de loyers
- Construction de **maisons** 🏠 et **hôtels** 🏨
- Cartes **Chance** 🃏 et **Caisse de Communauté** 💰
- **Prison**, gares, compagnies de services
- Détection de **faillite** et victoire automatique
- **Doubles** : rejouer + 3 doubles = prison
- IA basique pour les bots

## 📁 Structure

```
monopoly/
├── index.html     ← Tout le jeu (HTML + CSS + JS)
├── vercel.json    ← Config déploiement Vercel
└── README.md      ← Ce fichier
```
