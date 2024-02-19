export class alertMsg{

    dialogTitle(num){
        try{
            return cy.get('h1').should('have.text', num);
        }
        catch (error) {
            Cypress.log({
                name: 'Dynamic table',
                message: error.message
            })
        }   
    }

    buttons(){
        try{
            return cy.get('.col-md-9 > .d-flex');
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }

    alertBtn(){
        try{
            return cy.get('#js-alert');
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }

    confirmBtn(){
        try{
            return cy.get('#js-confirm');
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }

    promptBtn(){
        try{
            return cy.get('#js-prompt');
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }

    dialogResponse(num){
        try{
            return cy.get('#dialog-response').should('have.text', num);
        }
        catch (error) {
            Cypress.log({
                name: 'Dynamic table',
                message: error.message
            })
        }   
    }
}