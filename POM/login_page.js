export class loginPage{

    userName(){
        try{
            return cy.get('#username');
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }

    passWord(){
        try{
            return cy.get('#password');
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }

    loginButton(){
        try{
            return cy.get('[type="submit"]');
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }

    alertMsg(){
        try{
            return cy.get('#flash-message'); 
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }

    logOut(){
        try{
            return cy.get('.icon-2x'); 
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }  
}