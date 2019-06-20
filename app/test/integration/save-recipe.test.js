describe('saves recipes', function () {
    it('shows the recipe in the sidebar on click', function () {
        cy.visit('http://localhost:8000')
        cy.get('#root section > div').should('have.text', 'Start adding recipes to your shopping list by clicking on them');
        cy.get('div > [role=button]:nth-child(1) [data-test="recipe-name"]').should('have.text', 'Crevettes à la Sauce Yuzu')
    })
})