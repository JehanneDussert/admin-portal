<!-- Parler des fonctionnalités -->
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

L'application est composée comme suit :
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
pnpm install
pnpm run dev
```

Le routage repose sur Next.js ce qui permet d'accéder facilement :

```bash
# liste des produits
http://localhost:3000/

# page d'un produit particulier
http://localhost:3000/products/{productId}

# page de modification d'un produit
http://localhost:3000/products/{productId}/edit
```

### Back-end

#### Organisation

L'application est composée comme suit :
- fichier d'installation des dépendances (requirements.txt) et Dockerfile à la racine
- dossier app/ comprenant :
    - le main permettant de lancer l'app et de définir le partage des ressources entre origines multiples (CORS)
    - un dossier crud qui définit la logique de chaque route
    - un dossier models qui définit le modèle Product utilisé
    - un dossier routes qui définit les routes de l'API
- dossier pyetst-rest-api composé des tests des différentes routes

#### Accès

Le back-end écoute sur le __port 8000__ et peut être lancé dans le dossier api/app/ avec la commande :

```bash
fastapi dev main.py
```

Un swagger est accessible à l'adresse :
```bash
http://localhost:8000/docs
```

Les routes sont les suivantes :

```bash

#   GET

#   liste des produits: disponibles, supprimés, restaurés
http://localhost:8000/api/products

#   produit particulier identifié par son id
http://localhost:8000/api/products/{productId}

#   liste des produits composés dans leur title du product_name spécifié
#   si le champs est vide, tous les produits sont retournés
http://localhost:8000/api/products_by_name/?product_name={productName}

#   liste des produits supprimés
http://localhost:8000/api/deleted_products

#   POST

#   restauration du dernier produit supprimé
http://localhost:8000/api/restore_product

#   suppression du dernier produit restauré
http://localhost:8000/api/redo_product

#   PUT

#   modification d'un produit identifié par son id
http://localhost:8000/api/products/{productId}

#   DELETE

#   suppression d'un produit identifié par son id
http://localhost:8000/api/delete_product/{productId}
```

### Ressources

- [Cypress docs](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)
- [Mocking API Response In Cypress](https://kailash-pathak.medium.com/mocking-api-response-in-cypress-a73dea514cfd)