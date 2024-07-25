describe('Home page tests', () => {
	const products = [
        { id: 0, title: 'Product 1', desc: 'Description 1' },
        { id: 1, title: 'Product 2', desc: 'Description 2' },
        { id: 2, title: 'Product 3', desc: 'Description 3' },
        { id: 3, title: 'Product 4', desc: 'Description 4' },
        { id: 4, title: 'Product 5', desc: 'Description 5' },
        { id: 5, title: 'Product 6', desc: 'Description 6' },
    ];

	/**
	 * Mocking API Response
	 * w/ an empty products list
	 * w/ product_name=Product
	 * w/ product_name=Product2
	 */

    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:8000/api/products_by_name?product_name=', {
            statusCode: 200,
            body: [],
        }).as('getInitialProducts');

        cy.intercept('GET', 'http://localhost:8000/api/products_by_name?product_name=Product', {
            statusCode: 200,
            body: products,
        }).as('getAllProducts');

        cy.intercept('GET', 'http://localhost:8000/api/products_by_name?product_name=Product%202', {
            statusCode: 200,
            body: [products[1]],
        }).as('getProduct2');

		cy.intercept('DELETE', 'http://localhost:8000/api/delete_product?product_id=2', {
			statusCode: 200,
			body: products.filter(product => product.id !== 2),
		}).as('deleteProduct');

        cy.intercept('GET', 'http://localhost:8000/api/deleted_products', {
            statusCode: 200,
            body: [products[2]],
        }).as('getDeletedProducts');
    });

	/**
	 * Basic home page without any products to display
	 */
    it('should display the homepage without interacting with DsfrHead', () => {
        cy.visit('/');

        cy.get('body').should('not.contain', '[data-testid="dsfr-head"]');
        
		cy.wait('@getInitialProducts');

        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 1');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 2');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 3');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 4');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 5');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 6');
    });

	/**
	 * Display all products from list
	 */
    it('should find the search bar, type into it and get all articles', () => {
        cy.visit('/');

        cy.get('[data-testid="search-bar"] input').type('Product{enter}');
        cy.get('[data-testid="search-bar"] button').click();

        cy.wait('@getAllProducts');

        cy.get('[data-testid="products-list"]').should('contain', 'Product 1');
        cy.get('[data-testid="products-list"]').should('contain', 'Product 2');
        cy.get('[data-testid="products-list"]').should('contain', 'Product 3');
        cy.get('[data-testid="products-list"]').should('contain', 'Product 4');
        cy.get('[data-testid="products-list"]').should('contain', 'Product 5');
        cy.get('[data-testid="products-list"]').should('contain', 'Product 6');
    });

	/**
	 * Display Product 2
	 */
    it('should find the search bar, type into it and get article 2', () => {
        cy.visit('/');

        cy.get('[data-testid="search-bar"] input').type('Product 2{enter}');
        cy.get('[data-testid="search-bar"] button').click();

        cy.wait('@getProduct2');

        cy.get('[data-testid="products-list"]').should('contain', 'Product 2');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 1');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 3');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 4');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 5');
        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 6');
    });

	/**
	 * Delete product 3
	 */
	it('should delete Product 3', () => {
        cy.visit('/');

        cy.get('[data-testid="search-bar"] input').type('Product{enter}');
        cy.get('[data-testid="search-bar"] button').click();

        cy.wait('@getAllProducts');

        cy.get('[data-testid="delete-button-2"]').click();

        cy.wait('@deleteProduct');
        cy.wait('@getDeletedProducts');

        cy.get('[data-testid="products-list"]').should('not.contain', 'Product 3');
    });

	it('should navigate to the edit page when edit button is clicked', () => {
        cy.visit('/');

        cy.get('[data-testid="search-bar"] input').type('Product{enter}');
        cy.get('[data-testid="search-bar"] button').click();

        cy.wait('@getAllProducts');

        cy.get('[data-testid="edit-button-2"]').click();

        cy.url().should('include', '/products/2/edit');
    });
});
