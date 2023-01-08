const { test, expect } = require('@playwright/test');

// This site helps to perform API testing Swagger link: https://fakerestapi.azurewebsites.net/index.html
const authorId = 1234;

test('API test for fetching book count and names', async ({ request }) => {
    const response = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Books');
    await expect(response).toBeOK();
    const body = await response.json();
   
    // Extracting only book title
    let values = [];
    for (let i = 0; i < body.length; i++) {
        values.push(body[i].title);
    }
    console.log("Book count: ", body.length)
    console.log("Available books name", values);
});

test('API test to post author info', async ({ request }) => {
    const response = await request.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', {
        data: {
            "id": authorId,
            "idBook": authorId,
            "firstName": "John",
            "lastName": "Wilson"
        }
      });
    await expect(response).toBeOK();
    const body = await response.json();
    await expect(body.id).toEqual(authorId)
});

test('API test to delete author info', async ({ request }) => {
    var deleteurl = 'https://fakerestapi.azurewebsites.net/api/v1/Authors/' + authorId;
    const response = await request.delete(deleteurl);
    await expect(response).toBeOK();
});