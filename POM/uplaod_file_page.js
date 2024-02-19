export class uploadFile{

    fileUploadField(){
        try{
            return cy.get('[data-testid="file-input"]');
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }

    uploadButton(){
        try{
            return cy.get('[data-testid="file-submit"]').click();
        }
        catch (error) {
            Cypress.log({
                name: 'Upload file',
                message: error.message
            })
        }   
    }
}