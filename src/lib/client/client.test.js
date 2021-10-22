import { Client } from './client';

const client = new Client();
test('create a route', () => {
  client.get('test', () => {
    return { status: 'success' }
  })
  expect(client.routes.length).toBe(1);
});
