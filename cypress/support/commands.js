import { dynamicTable } from "../../POM/dynamic_table_page";
import { uploadFile } from "../../POM/uplaod_file_page";
import { loginPage } from "../../POM/login_page";
import { alertMsg } from "../../POM/check_alert_messages";

function customApiRequest(method, endpoint, data = null, contentType = 'application/json') {
   cy.request({
      method: method,
      url: endpoint,
      body: data,
      headers: {
        'Content-Type': contentType
      },
    }).then((response) => {
        return response;
    })
}

function totalGradeCalc(ref, seniurity, keywords){
  let totalGrade;
  if (ref == true){
    const references = 15;
    keywords *= 5
    totalGrade = seniurity + keywords + references;
  }else{
    keywords *= 5
    totalGrade = seniurity + keywords;
  }
  return totalGrade
};

function checkBrowserCPU(){
  const dynamic_table = new dynamicTable;
  const browserTable = dynamic_table.browserTable();
  const chromeCPU = dynamic_table.chromeCPU();

  browserTable.then($table => {
    // Iterate through rows
    $table.find('tr').each((index, row) => {
        // Iterate through columns
        const columns = Cypress.$(row).find('td');
        columns.each((index, column) => {
            const cellText = Cypress.$(column).text();
            const cellTextCPU = parseFloat(cellText.split('%')[0]);
            // Extract CPU load
            if (cellText.includes('%')) {
                // Perform comparison with another element
                chromeCPU.then($element => {
                    const otherCPUValue = $element.text();
                    const cpuLoad = parseFloat(otherCPUValue.split(':')[1]);
                    if(cellTextCPU == cpuLoad){
                      expect(cellTextCPU).to.be.equal(cpuLoad);
                    }
                });
              }
          });
      });
  });
}

function fileUpload(){
  const fileUpload = new uploadFile;

  fileUpload.fileUploadField().then(input => {
    cy.fixture('test.txt').then(fileContent => {
        const blob = Cypress.Blob.base64StringToBlob(fileContent);
        const file = new File([blob], 'test.txt', { type: 'text/plain' });
  
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input[0].files = dataTransfer.files;
    });
  });
}

function login(username, password){
  const loginCred = new loginPage;

  loginCred.userName().type(username)
  loginCred.passWord().type(password)
  loginCred.loginButton().click()
}

function checkJSalerts(){
  const jsAlerts = new alertMsg
  const alertBtn = jsAlerts.alertBtn()
  const confirmBtn = jsAlerts.confirmBtn()
  const promptBtn = jsAlerts.promptBtn()

  const buttons = ['button1', 'button2', 'button3'];
  
  // Iterate over each button
  buttons.forEach(button => {
    switch (button) {
      case 'button1':
        alertBtn.click();
        jsAlerts.dialogResponse('OK')
        break;
      case 'button2':
        confirmBtn.click();
        jsAlerts.dialogResponse('Ok')
        break;
      case 'button3':
        promptBtn.click();
        jsAlerts.dialogResponse('Hi my name is Eli')
        break;
      default:
        // Handle default case if needed
        break;
    }
  });
}

Cypress.Commands.add('shutdownMockServer', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3030/shutdown',
  });
});


Cypress.Commands.add('checkJSalerts', checkJSalerts);
Cypress.Commands.add('login', login);
Cypress.Commands.add('fileUpload', fileUpload);
Cypress.Commands.add('checkBrowserCPU', checkBrowserCPU);
Cypress.Commands.add('totalGradeCalc', totalGradeCalc);
Cypress.Commands.add('customApiRequest', customApiRequest);
