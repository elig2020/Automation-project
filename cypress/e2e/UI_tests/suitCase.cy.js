import { dynamicTable } from "../../../POM/dynamic_table_page";
import { webInput } from "../../../POM/web_input_page";
import { uploadFile } from "../../../POM/uplaod_file_page";
import { loginPage } from "../../../POM/login_page";
import { alertMsg } from "../../../POM/check_alert_messages";


describe('Test Goggle UI', () => {
    const web_input = new webInput;
    const dynamic_table = new dynamicTable;
    const upload_file = new uploadFile;
    const alert = new loginPage()
    const url = 'https://practice.expandtesting.com'

    before(() => {
        cy.visit(url);
    })

    it('Inserts new inputs and check returned outputs', () => {        
        cy.visit(`${url}/inputs`);
        //enter inputs
        web_input.inputNumber('1');
        web_input.inputText('test');
        web_input.inputPassword('abc12345');
        web_input.displayInputs()
        //verified outputs
        web_input.outputNumber('1')
        web_input.outputText('test');
        web_input.outputPassword('abc12345');         
    })

    it('Compare CPU value of Chrome with expected CPU value', () => {
        cy.visit(`${url}/dynamic-table`);
        dynamic_table.dynamicTableTitle('Dynamic Table');
        cy.checkBrowserCPU();
    })

    it('Upload text file and verified if it uploaded successfully', () => {
        cy.visit(`${url}/upload`)
        // Choose text file from fixtures folder
        cy.fileUpload()
        // Click on upload button and verified if its a success using .then() (Async)
        upload_file.uploadButton().then(() =>{
            cy.get('h1').should('have.text', 'File Uploaded!')
        })      
    });

    it('Make login with wrong data, correct data, verify text, and logout', () => {      
        cy.visit(`${url}/login`)
        //enter wrong credentials, and verify error message appears.
        cy.fixture('login.json').then(data => {
            const username = data.falseCreds.userName
            const password = data.falseCreds.passWord
            const _username = data.trueCreds.userName
            const _password = data.trueCreds.passWord

            //make a wrong login and check alert message
            cy.login(username, password).then(()=>{
                alert.alertMsg().should('be.visible').should('contain.text', 'Your username is invalid!')
            })
            //make a correct login and check alert message
            cy.login(_username, _password).then(()=>{
                alert.alertMsg().should('be.visible').should('contain.text', 'You logged into a secure area!')
            })
            //make a logout and check alert message
            alert.logOut().click()
            alert.alertMsg().should('be.visible').should('contain.text', 'You logged out of the secure area!')
        })
    })

    it('Click on JavaScript alerts buttons and verify alert message', () => {
        cy.visit(`${url}/js-dialogs`)

        cy.window().then(function(p){
            cy.stub(p, "prompt").returns("Hi my name is Eli")
        })

        const jsAlerts = new alertMsg
        jsAlerts.dialogTitle('JavaScript Dialogs')
        jsAlerts.dialogResponse('Waiting')
        cy.checkJSalerts()
    })
})