# Example project

How to get started:

Link to cypress guide - https://docs.cypress.io/guides/getting-started/installing-cypress

1. Create your folder where you prefer the project to be.
2. Go to the terminal and write - cd /your/project/path.
3. Make sure to run "npm init" or have a node_modules folder or package.json file in the root of your project to ensure cypress is installed in the correct directory.
4. Install Cypress - Write in the terminal "npm install cypress --save-dev"

Running Cypress:
1. Run Cypress command "npx cypress open" or "yarn run Cypress open", you will open Cypress UI and start a quick configuration of Cypress.
2. In order to install a mock server go to the terminal, and write - "npm install json-server --save-dev"
3. Once in the project please make sure the following commands are in Package.json:
    "scripts": {
      "cy:open": "cypress open",
      "start-mock-server": "json-server --watch cypress/fixtures/db.json --port 3030"
    },
4. Run server.json from the terminal using the "npm run start-mock-server" command.
   * to see the server on the web go to "http://localhost:3030/"
5. Open Cypress from the terminal using "npm run cy:open" command.

Now you are free to run tests, good luck! :)
   


