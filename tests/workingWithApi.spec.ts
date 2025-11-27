import { test, expect, request } from '@playwright/test'
// @ts-ignore
import tags from "../test-data/tags.json"


// test.beforeEach(async ({page}) => {
//   await page.route('*/**/api/tags', async route => {
//     await route.fulfill({
//       body: JSON.stringify(tags),
//     })
//   })
//
//   await page.goto('http://conduit.bondaracademy.com');
// })


test('has title', async ({page}) => {

  await page.route('*/**/api/articles*', async route => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "This is a MOCK test title"; //add our own title
    responseBody.articles[0].description = "This is a MOCK description";

    await route.fulfill({
      body: JSON.stringify(responseBody),
    })
  })
  await page.getByText('Global Feed').click();
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK test title');
  await expect(page.locator('app-article-list p').first()).toContainText('This is a MOCK description');
})

test('delete article', async ({page, request}) => {
  const response = await request.post('https://api.realworld.io/api/users/login', {
    data: {
      "user":{"email":"pwtest@test.com","password":"Welcome1"}
    }
  })
  const responseBody = await response.json();

  const articleResponse = await request.post('https://api.realworld.io/api/articles', {
    data: {
      "article":{"tagList":[],"title":"This is a test title","description":"This is a test description"}
    },
    headers: {
      "content-type": "application/json",
    }
  })
  expect(articleResponse.status()).toEqual(201);

  await page.getByText('Global Feed').click();
  await page.getByText('This is a test title').click();
  await page.getByRole('button', { name: 'Delete Article' }).first().click();

})

//TODO Intercept response
test('create article', async ({page, request}) => {
  //create article steps ...
  const articleResponse = await page.waitForResponse('https://api.realworld.io/api/articles'); //intercept wait for response
  const articleResponseBody = await articleResponse.json();
  const slugId = articleResponseBody.artcile.slug;

  const deleteArticleResponse =  await request.delete(`https://api.realworld.io/api/articles/${slugId}`)
  expect(deleteArticleResponse.status()).toEqual(204);

})
