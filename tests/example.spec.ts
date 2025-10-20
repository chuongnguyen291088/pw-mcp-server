import { test, expect } from '@playwright/test';

test.skip('API check', async ({ request }) => {
  const loginResponse = await request.get('/web/index.php/auth/login')
  const htmlSourceText = await loginResponse.text()

  const matcher = htmlSourceText.match(/:token="&quot;(.+?)&quot;"/)
  const csrfToken = matcher ? matcher[1] : null
  console.log(' 📋 CSRF Token:', csrfToken)
  process.env['CSRF_TOKEN'] = csrfToken

  const validateResponse = await request.post('/web/index.php/auth/validate',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
      },
      form: {
        username: process.env.ADMIN_USER_NAME,
        password: process.env.ADMIN_PASSWORD,
        _token: csrfToken
      }
    }
  )

  expect(validateResponse.status() == 200).toBeTruthy()
});
