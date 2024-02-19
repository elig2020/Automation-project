export class dynamicTable{

    dynamicTableTitle(num){
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

    browserTable(){     
        try{
            return cy.get('tbody');
        }
        catch (error) {
            Cypress.log({
                name: 'Dynamic table',
                message: error.message
            })
        }
    }

    tableHeaderNames(){     
        try{
            return cy.get('table thead tr');
        }
        catch (error) {
            Cypress.log({
                name: 'Dynamic table',
                message: error.message
            })
        }
    }

    chromeCPU(){     
        try{
            return cy.get('#chrome-cpu');
        }
        catch (error) {
            Cypress.log({
                name: 'Dynamic table',
                message: error.message
            })
        }
    }
}