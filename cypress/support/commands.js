Cypress.Commands.add('fillMandatoryFieldsAndSubimit', function(){
    const longText = 'Lei da gravitação universal: Dois corpos quaisquer no universo se atraem com uma força diretamente proporcional às suas massas e inversamente proporcional ao quadrado da distância que os separa.'
    cy.get('#firstName').type('Colodina')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('colodina.silva@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()    
})