const product = {
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
};

const modifiedProduct = {
    "id": 0,
    "title": "Produit A modifié",
    "resume": "Une brève description du produit A modifié.",
    "desc": "Description détaillée du produit A modifié.",
    "price": 88,
    "average_rate": 4.0,
    "reviews": [
        {"title": "Excellent!", "desc": "Ce produit a dépassé mes attentes.", "rate": 5, "date": "2024-07-20"},
        {"title": "Pas mal", "desc": "Le produit est bon mais pourrait être amélioré.", "rate": 3, "date": "2024-06-15"}
    ],
    "last_modified": "2024-08-01",
    "is_deleted": false
};

describe('Edit page tests', () => {

    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:8000/api/products/2', (req) => {
            console.log('Intercepted GET request for product:', req);
            req.reply({
                statusCode: 200,
                body: product,
            });
        }).as('getProductPage');

        cy.intercept('PUT', 'http://localhost:8000/api/products/2', (req) => {
            console.log('Intercepted PUT request:', req);
            req.reply({
                statusCode: 200,
                body: modifiedProduct,
            });
        }).as('updateProduct');
    });

    it('should display the product page and check if title exists', () => {
        cy.visit('/products/2');
        cy.wait('@getProductPage');
        cy.contains('h1', product.title);
    });

    it('should display the edit page & edit product', () => {
        cy.visit('/products/2/edit');

        cy.get('[data-testid="price-input"] input').clear().type(modifiedProduct.price.toString());
        cy.get('[data-testid="title-input"] input').clear().type(modifiedProduct.title);
        cy.get('[data-testid="desc-input"] textarea').clear().type(modifiedProduct.desc);
        cy.get('[data-testid="resume-input"] textarea').clear().type(modifiedProduct.resume);
        cy.get('[data-testid="validate-inputs-button"]').click();

        cy.wait('@updateProduct').then((interception) => {
            if (interception.response)
            {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body.title).to.eq(modifiedProduct.title);
            }
            
        });
    });
});
