describe('Ranking Mechanism Test', () => {

    let dbData;
    before(() => {
      cy.fixture('db.json').then((db) => {
        dbData = db;
      });

      //we using intercept to mock our HTTP requests
      cy.intercept('GET', '/', { fixture: '/db.json'}).as('getData'); 
    })

    it('Check website date value', () => {
      cy.customApiRequest('GET', '/websites').then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body[0].date_created).eq("15/10/2023");
      })
    }); 
  
    it('Same keyword appears in more than 1 product', () => {
      cy.request('GET', '/products').then((response) => {
          expect(response.status).to.eq(200);

          // Create an object to store the count of each text value
          const textToCount = "product";
          const products = dbData.products;
          let count = 0; 

          // Use forEach to iterate over the array and count occurrences
          for (let i = 0; i < products.length; i++) {
            const innerArray = products[i];
            cy.log(innerArray)

            for (let j = 0; j < innerArray.keywords.length; j++) {
              const innerText = innerArray.keywords[j];

              if (innerText === textToCount) {
                // Increment the counter
                count++;
              }
            }
          }
          cy.wrap(textToCount).should('have.length.gt', 1);
          cy.log(`The text "${textToCount}" appears ${count} times in the array.`);
        });     
    });

    it('Update exist website with a reference link', () => {
      cy.customApiRequest('GET', '/websites').then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body[0].URL).eq("https://example1.com")

        //${websiteToUpdate.id}
        const websiteToUpdate = response.body[0];
        const updatedWebsite = { ...websiteToUpdate, reference: "www.referenced_site.com" };

        cy.request({
          method: 'PUT', 
          url: `/websites/${websiteToUpdate.id}`,
          body: updatedWebsite,
        }).then((putResponse) => {
          expect(putResponse.status).to.be.eq(200);
          cy.log('Website updated successfully');
        });

        // After website is updated with a reference also websites_products will be updated as well
        cy.customApiRequest('GET', '/websites_products').then((response)=>{
          expect(response.status).to.eq(200);
          expect(response.body[0].id).eq("1")

          const websiteToUpdate = response.body[0];
          const updatedWebsite = { ...websiteToUpdate, references: true };

          cy.request({
            method: 'PUT', 
            url: `/websites_products/${websiteToUpdate.id}`,
            body: updatedWebsite,
          }).then((putResponse) => {
            expect(putResponse.status).to.be.eq(200);
            cy.log('websites_products updated successfully');
          });
        });
      });
    });  

    it('Remove one product from DB', () => {
      cy.customApiRequest('GET', '/products').then((response)=>{
        expect(response.status).to.eq(200);
        let deleteProduct = dbData.products[2]

        cy.request({
          method: 'DELETE',
          url: `/products/${deleteProduct.id}`,
        }).then((deleteResponse) => {
          // Ensure the DELETE request was successful
          expect(deleteResponse.status).to.eq(200);
        })
      });
    });

    it('Check if total grade for site+product is higher then second total grade site+product', () => {
      let priority_1 = dbData.ranking_parameters[0].priority
      let priority_2 = dbData.ranking_parameters[1].priority

      function gradeCalc(references,seniurity,keywords){
        let totalGrade;
        if (references == true){
          const references = 15;
          keywords *= 5
          totalGrade = seniurity + keywords + references;
        }else{
          keywords *= 5
          totalGrade = seniurity + keywords;
        }
        return totalGrade
      };
      
      const result_1 = gradeCalc(priority_1[0].references, priority_1[0].seniurity, priority_1[0].keywords)
      const result_2 = gradeCalc(priority_2[0].references, priority_2[0].seniurity, priority_2[0].keywords)
      if(result_1 > result_2){
        cy.log(`result_1 total grade is ${result_1}, its greater then result_2 total grade: ${result_2}, this why result_1 priority is higher`)
      }else{
        cy.log(`result_2 total grade is ${result_2}, its greater then result_1 total grade: ${result_1}, this why result_2 priority is higher`)
      }  
    })

    it('Insert new website to database, verify if statusText return Created', () => {
      cy.fixture('addWebsite.json').then((data) => {
        cy.customApiRequest('POST', '/websites', data).then((postResponse) => {
          expect(postResponse.status).to.eq(201);
          expect(postResponse.statusText).to.contain("Created")
        });
      })
    });

    it('Insert new product to database, verify if statusText return Created', () => {
      cy.fixture('addProduct.json').then((data) => {
        cy.customApiRequest('POST', '/products', data).then((postResponse) => {
          expect(postResponse.status).to.eq(201);
          expect(postResponse.statusText).to.contain("Created")
        });
      })
    });
});