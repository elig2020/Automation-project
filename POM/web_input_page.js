export class webInput{
    //inputs
    inputNumber(num){
        try{
            return cy.get('#input-number').type(num);
        }
        catch (error) {
            Cypress.log({
                name: 'Test 1',
                message: error.message
            })
        }   
    }
    inputText(text){     
        try{
            return cy.get('#input-text').type(text);
        }
        catch (error) {
            Cypress.log({
                name: 'Test 1',
                message: error.message
            })
        }
    }
    inputPassword(pass){
        try{
            return cy.get('#input-password').type(pass);
        }
        catch (error) {
            Cypress.log({
                name: 'Test 1',
                message: error.message
            })
        }
    }
    displayInputs(){
        try{
            return cy.get('#btn-display-inputs').click();
        }
        catch (error) {
            Cypress.log({
                name: 'Test 1',
                message: error.message
            })
        }
    } 

    //output
    outputNumber(num){  
        try{
            return cy.get('#output-number').should('have.text', num);
        }
        catch (error) {
            Cypress.log({
                name: 'Test 1',
                message: error.message
            })
        }
    } 
    outputText(text){
        try{
            return cy.get('#output-text').should('have.text', text);
        }
        catch (error) {
            Cypress.log({
                name: 'Test 1',
                message: error.message
            })
        }
    } 
    outputPassword(pass){    
        try{
            return cy.get('#output-password').should('have.text', pass);
        }
        catch (error) {
            Cypress.log({
                name: 'Test 1',
                message: error.message
            })
        }
    }   
}