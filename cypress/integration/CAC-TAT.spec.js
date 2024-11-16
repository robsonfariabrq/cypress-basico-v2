
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    // se depois da palavra it escrevermos .only o único teste executado será este
    // exemplo: it.only(...)
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Lei da gravitação universal: Dois corpos quaisquer no universo se atraem com uma força diretamente proporcional às suas massas e inversamente proporcional ao quadrado da distância que os separa.'
        cy.get('#firstName').type('Colodina')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('colodina.silva@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Colodina')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('colodina.silva@gmail,com')
        cy.get('#open-text-area').type('Teste de mensagem de erro', { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório e não é preenchido', function(){
        cy.get('#firstName').type('Colodina')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('colodina.silva@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste de mensagem de erro', { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Colodina')
            .should('have.value', 'Colodina')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('colodina.silva@gmail.com')
            .should('have.value', 'colodina.silva@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('11987654321')
            .should('have.value', '11987654321')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando comando customizado', function(){
        cy.fillMandatoryFieldsAndSubimit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor value', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) pelo seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/arquivo para upload.txt')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('arquivo para upload.txt')
            })
        
    })

    it('seleciona um arquivo simulando drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/arquivo para upload.txt', { action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('arquivo para upload.txt')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('arquivo para upload.txt').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('arquivo para upload.txt')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página de política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })


})
