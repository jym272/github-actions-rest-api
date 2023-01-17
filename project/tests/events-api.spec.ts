import { test, expect } from '@playwright/test';

test.describe('test', () => {
  test('get home', async ({ request }) => {
    const response = await request.get('/');
    const body = await response.body();

    expect(response.ok()).toBe(true);
    expect(body.toString()).toBe('Hello there!');
    expect(response.status()).toBe(200);
  });

  test('save a person', async ({ request }) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    const data = {
      name: 'John',
      age: 30
    };

    const response = await request.post('/save', { headers, data });
    const body = await response.body();
    expect(response.ok()).toBe(true);
    expect(body.toString()).toBe('{"message":"Person saved..."}');
    expect(response.status()).toBe(200);
  });
});
