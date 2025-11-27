import { test as setup } from '@playwright/test';
import user from '../.auth/user.json';
// @ts-ignore
import fs from 'fs'

const authFile = '.auth/user.json';

setup('authentication', async ({page, request}) => {
  const response = await request.post('https://api.realworld.io/api/users/login', {
    data: {
      "user":{"email":"pwtest@test.com","password":"Welcome1"}
    }
  })
  const responseBody = await response.json();
  const accessToken = responseBody.access_token;
  user.origins[0].localStorage[0].value = accessToken; //user.json now have token from api
  fs.writeFileSync(authFile, JSON.stringify(user))

  process.env['ACCESS_TOKEN'] = accessToken;
})
