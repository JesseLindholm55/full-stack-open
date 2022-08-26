describe('Blog ', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Username:')
        cy.contains('Password:')
    })

    it('login works', function () {
        cy.get('#username').type('Jam3')
        cy.get('#password').type('kon')
        cy.get('#login').click()
        cy.contains('James 3 is logged in.')
    })
})
