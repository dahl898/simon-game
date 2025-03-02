describe('simon game tests', () => {
  
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/")
  })

  it('playing the game: winning scenario', () => {
    
    cy.getTest("title").should('contain', 'Press A Key to Start')
    cy.get('body').trigger('keydown', { key: 'a' })
    cy.getTest("title").should('contain', 'Level 1')

    cy.wait(2000)
    for (let i = 0; i < 5; i++) {
      cy.getTest("title").should('contain', `Level ${i + 1}`)
      cy.get('body').trigger('keydown', { key: 'a' })
      

      cy.window().then((window) => {
        const sequence = window.simonList
        expect(sequence.length).to.equal(i + 1)
        cy.wait(2000)
        for (let j = 0; j < sequence.length; j++) {
          cy.get('#' + sequence[j]).click()
          cy.getTest('title').should('not.contain', 'Game Over. Press any key to restart.')
        }
      })

    }
    cy.getTest('reset-btn').click()
  })

    it('playing the game: losing scenario', () => {
      cy.getTest("title").should('contain', 'Press A Key to Start')
      cy.get('body').trigger('keydown', { key: 'a' })
      cy.getTest("title").should('contain', 'Level 1')
      cy.window().then((window) => {
        cy.wait(2000)
        const sequence = window.simonList
        const wrongAnswer = sequence[0] === "yellow" ? "green" : "yellow"
        cy.get('#' + wrongAnswer).click()

        cy.getTest('title').contains('Game Over. Press any key to restart.')
    })
    

  })


})

