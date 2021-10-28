import { Client } from './client';

describe('get', () => {
  test('create a route', () => {
    const client = new Client();

    client.get('test', () => {
      return { status: 'success' }
    })
    expect(client.routes.length).toBe(1);
  });

  test('define route method GET', () => {
    const client = new Client();
    const route = 'test';

    client.get(route, () => {
      return { status: 'success' }
    })

    const expected_route = client.routes.find(r => r.label === route);
    expect(expected_route.method).toBe('GET');
  });
});

describe('post', () => {
  test('create a route', () => {
    const client = new Client();

    client.post('test', () => {
      return { status: 'success' }
    })
    expect(client.routes.length).toBe(1);
  });

  test('define route method POST', () => {
    const client = new Client();
    const route = 'test';

    client.post(route, () => {
      return { status: 'success' }
    })

    const expected_route = client.routes.find(r => r.label === route);
    expect(expected_route.method).toBe('POST');
  });
});

describe('call', () => {
  test('get a return of a created route', () => {
    const client = new Client();
    const route = 'test';
    const response = { status: 'success' }

    client.get(route, () => response)

    const expected_response = client.call('GET', route);

    expect(expected_response).toBe(response);
  })

  test('return a error when the route does not exist', () => {
    const client = new Client();

    const expected_response = client.call('GET', 'test');

    expect(expected_response).toStrictEqual({ error: 'Cannot GET test' });
  })
})
