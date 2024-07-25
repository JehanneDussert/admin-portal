describe('template spec', () => {
 it('should display the homepage without interacting with DsfrHead', () => {
    cy.visit('/');
    cy.get('body').should('not.contain', '[data-testid="dsfr-head"]');
  });
})