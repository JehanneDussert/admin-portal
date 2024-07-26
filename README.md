## Installation

### Stack

#### Frontend

- Next.js : pour le rendu côté serveur et la génération statique
- TypeScript : pour assurer la robustesse de l'application
- React : pour générer des composants réutilisables
- DSFR : pour uniformiser et rendre accessibles les interfaces
- Eslint / prettier : pour formater les fichiers

#### Backend

- Python
- FastAPI : pour construire une API rapide

#### Conteneurisation

- Docker : pour assurer la portabilité de l'application
- Docker-compose : pour la gestion multi-conteneurs

### Pré-requis
- docker et docker-compose

### Commandes make

```bash
make install    # installation des dépendances du projet
make build      # construction des images Docker
make run        # lancement des conteneurs Docker
make test       # exécution des tests front/back
make clean      # nettoyage de l'environnement
```

## Tests

- Frontend : tests end-to-end avec Cypress

```bash
cd web
pnpm run cypress:run
```

- Backend : tests des routes de l'API avec pytest

```bash
cd api
pytest
```

## Composition de l'app

### Front-end

#### Organisation

L'application est composé comme suit :
- fichiers de configuration et Dockerfile à la racine
- dossier app/ comprenant :
    - les composants réutilisables : 
        - boutons de modification et suppression de produits
        - affichage des produits
        - boutons défaire/refaire
    - les interfaces
    - un dossier utils comprenant :
        - un hook personnalisé useFetch pour gérer plus simplement les appels API et gérer les éventuelles erreurs
        - un fichier constants pour lister les différentes URL à appeler
    - un dossier products/ qui comporte les différentes pages de l'application

#### Accès

Le front-end écoute sur le __port 3000__ et peut être lancé dans le dossier web/ avec la commande :

```bash
pnpm run dev
```

Le routage repose sur Next.js ce qui permet d'accéder facilement :

```bash
route 'http://localhost:3000/'  # liste des produits
route 'http://localhost:3000/products/{productId}'  # page d'un produit particulier
route 'http://localhost:3000/products/{productId}/edit'  # page de modification d'un produit
```

### Back-end

### Ressources

- [Cypress docs](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)
- [Mocking API Response In Cypress](https://kailash-pathak.medium.com/mocking-api-response-in-cypress-a73dea514cfd)