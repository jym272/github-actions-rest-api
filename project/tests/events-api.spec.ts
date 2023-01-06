import { test, expect } from '@playwright/test';

test('get home', async ({ request }) => {
  const response = await request.get('/');
  const body = await response.body();

  expect(response.ok()).toBe(true);
  expect(body.toString()).toBe('Hello there!');
  expect(response.status()).toBe(200);
});

// test('event creation', async ({ request }) => {
//   const testTitle = 'Test event';
//   const response = await request.post('/', {
//     data: {
//       title: testTitle
//     }
//   });
//   expect(response.ok()).toBeTruthy();
//   const resDataRaw = await response.body();
//   const resData = JSON.parse(resDataRaw.toString());
//   expect(resData).toHaveProperty('event.id');
//   expect(resData.event.title).toBe(testTitle);
// });

// test('getting events', async ({ request }) => {
//   const response = await request.get('/');
//   expect(response.ok()).toBeTruthy();
//   const resDataRaw = await response.body();
//   const resData = JSON.parse(resDataRaw.toString());
//   expect(resData).toHaveProperty('events');
//   expect(resData.events.length).toBeGreaterThan(0);
// });
