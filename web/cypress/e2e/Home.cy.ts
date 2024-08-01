import { Product } from "app/interfaces/Product";

export const products = [
        {
            "id": 0,
            "title": "Produit A",
            "resume": "Une brève description du produit A.",
            "desc": "Description détaillée du produit A.",
            "price": 29,
            "average_rate": 4.0,
            "reviews": [
                {"title": "Excellent!", "desc": "Ce produit a dépassé mes attentes.", "rate": 5, "date": "2024-07-20"},
                {"title": "Pas mal", "desc": "Le produit est bon mais pourrait être amélioré.", "rate": 3, "date": "2024-06-15"}
            ],
            "last_modified": "2024-07-10",
            "is_deleted": false
        },
        {
            "id": 1,
            "title": "Produit B",
            "resume": "Une brève description du produit B.",
            "desc": "Description détaillée du produit B.",
            "price": 49,
            "average_rate": 3.0,
            "reviews": [
                {"title": "Bon rapport qualité-prix", "desc": "Vaut chaque centime!", "rate": 4, "date": "2024-07-10"},
                {"title": "Pourrait être mieux", "desc": "Le produit a quelques défauts.", "rate": 2, "date": "2024-06-25"}
            ],
            "last_modified": "2024-06-15",
            "is_deleted": false
        },
        {
            "id": 2,
            "title": "Produit C",
            "resume": "Une brève description du produit C.",
            "desc": "Description détaillée du produit C.",
            "price": 19,
            "average_rate": 4.0,
            "reviews": [
                {"title": "Parfait pour le prix", "desc": "Bonne qualité pour un prix bas.", "rate": 5, "date": "2024-07-05"},
                {"title": "Correct", "desc": "Pas le meilleur, mais acceptable.", "rate": 3, "date": "2024-06-30"}
            ],
            "last_modified": "2024-08-01",
            "is_deleted": false
        },
        {
            "id": 3,
            "title": "Produit D",
            "resume": "Une brève description du produit D.",
            "desc": "Description détaillée du produit D.",
            "price": 89,
            "average_rate": 3.5,
            "reviews": [
                {"title": "Haute qualité", "desc": "Ce produit est bien fabriqué et durable.", "rate": 5, "date": "2024-07-15"},
                {"title": "Cher", "desc": "Trop cher pour ce qu'il offre.", "rate": 2, "date": "2024-06-20"}
            ],
            "last_modified": "2024-06-25",
            "is_deleted": false
        }
    ];

describe('Home page tests', () => {

	/**
	 * Mocking API Response
	 * w/ an empty products list
	 * w/ product_name=Product
	 * w/ product_name=Product2
	 */

    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:8000/api/search_by_name?product_name=', {
            statusCode: 200,
            body: {
                products: [],
                redo_products: []
            },
        }).as('getInitialProducts');

        cy.intercept('GET', 'http://localhost:8000/api/search_by_name?product_name=Produit', {
            statusCode: 200,
            body: {
                products: products,
                redo_products: []
            },
        }).as('getAllProducts');

        cy.intercept('GET', 'http://localhost:8000/api/search_by_name?product_name=Produit%20B', {
            statusCode: 200,
            body: {
                products: [products[1]],
                redo_products: []
            },
        }).as('getProduct2');

       cy.intercept('DELETE', 'http://localhost:8000/api/delete_product/2', (req) => {
        let updatedProducts = [...products];
        const productIndex = updatedProducts.findIndex(product => product.id === 2);

        if (productIndex !== -1) {
            updatedProducts[productIndex] = {
                ...updatedProducts[productIndex],
                is_deleted: true
            };
        }

        req.reply({
            statusCode: 200,
            body: {
                products: updatedProducts,
                redo_products: []
            },
        });
    }).as('deleteProduct');

    cy.intercept('GET', 'http://localhost:8000/api/products/2', (req) => {
        req.reply({
            statusCode: 200,
            body: products[2],
        });
    }).as('getProduct2Edit');

    });

	/**
	 * Basic home page without any products to display
	 */
    it('should display the homepage without interacting with DsfrHead', () => {
		cy.visit('/');

		cy.get('body').should('not.contain', '[data-testid="dsfr-head"]');

		cy.wait('@getInitialProducts');

		cy.contains('h1', 'Aucun produit ne correspond à votre recherche.').should('be.visible');
	});

	/**
	 * Display all products from list
	 */
    it('should find the search bar, type into it and get all articles', () => {
        cy.visit('/');

        cy.get('[data-testid="search-bar"] input').type('Produit{enter}');
        cy.get('[data-testid="search-bar"] button').click();

        cy.wait('@getAllProducts');

        cy.get('[data-testid="products-list"]').should('contain', 'Produit A');
        cy.get('[data-testid="products-list"]').should('contain', 'Produit B');
        cy.get('[data-testid="products-list"]').should('contain', 'Produit C');
        cy.get('[data-testid="products-list"]').should('contain', 'Produit D');
    });

	/**
	 * Display Produit B
	 */
    it('should find the search bar, type into it and get article 2', () => {
        cy.visit('/');

        cy.get('[data-testid="search-bar"] input').type('Produit B{enter}');
        cy.get('[data-testid="search-bar"] button').click();

        cy.wait('@getProduct2');

        cy.get('[data-testid="products-list"]').should('contain', 'Produit B');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Produit A');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Produit C');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Produit D');
    });

	/**
	 * Delete Produit C
	 */
	it('should delete Produit C', () => {
       cy.visit('/');

    cy.get('[data-testid="search-bar"] input').type('Produit{enter}');
    cy.get('[data-testid="search-bar"] button').click();

    cy.wait('@getAllProducts').then((interception) => {
        if (interception.response) {
            console.log('Intercepted data:', interception.response.body);
        }
    });
    cy.get('[data-testid="delete-button-2"]').click();

    cy.wait('@deleteProduct').then((interception) => {
            if (interception.response) {
                const updatedProducts = interception.response.body.products;
                const productC = updatedProducts.find((product: Product) => product.id === 2);
                
                expect(productC).to.exist;
                expect(productC.is_deleted).to.be.true;

            }
        })
    });

	it('should navigate to the edit page when edit button is clicked', () => {
         cy.visit('/');

        cy.get('[data-testid="search-bar"] input').type('Produit{enter}');
        cy.get('[data-testid="search-bar"] button').click();

        cy.wait('@getAllProducts');
        cy.get('[data-testid="search-bar"] button').click();


        cy.get('[data-testid="edit-button-2"]').click();

        cy.url().should('include', '/products/2/edit');

        cy.wait('@getProduct2Edit')
    });
});
