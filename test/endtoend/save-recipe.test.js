describe('saves recipes', function () {
    it('shows the recipe in the sidebar on click', function () {
        cy.visit('http://localhost:8000')
        cy.get('#root section > div').should('have.text', 'Start adding recipes to your shopping list by clicking on themAdd 5 random recipes to your list');
        cy.get('div > [role=button]:nth-child(1) [data-test="recipe-name"]').should('have.text', 'Grill-Steamed Sea Bass with Citrus Relish')
    })
})