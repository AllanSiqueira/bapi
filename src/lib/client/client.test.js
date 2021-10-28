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

  test('console a error when try to create duplicate routes', () => {
    const client = new Client();
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    client.get('test', () => null);
    client.get('test', () => null);

    expect(console.error).toHaveBeenLastCalledWith('[bapi:nonfatal] GET test already exists.');
    consoleErrorMock.mockRestore();
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
  });

  test('return a error when the route does not exist', () => {
    const client = new Client();

    const expected_response = client.call('GET', 'test');

    expect(expected_response).toStrictEqual({ error: 'Cannot GET test' });
  });

  test('get a return with middleware', () => {
    const client = new Client();
    const route = 'test';

    client.use((context) => {
      context.version = 'v1.0';
      return context;
    });
    client.get(route, ctx => {
      return {
        status: 'success',
        version: ctx.version
      };
    });

    const expected_response = client.call('GET', route, {});

    expect(expected_response).toStrictEqual({
      status: 'success',
      version: 'v1.0'
    });
  });
});

describe('on', () => {
  test('call listener createRoute on get route create', () => {
    const client = new Client();
    const eventListener = jest.fn();

    client.on('createRoute', eventListener);
    client.get('test', () => null);

    expect(eventListener).toHaveBeenCalledTimes(1);
  });

  test('call listener createRoute on every route create', () => {
    const client = new Client();
    const eventListener = jest.fn();

    client.on('createRoute', eventListener);
    client.post('test', () => null);
    client.get('test', () => null);

    expect(eventListener).toHaveBeenCalledTimes(2);
  });
});

describe('use', () => {
  test('create a middleware', () => {
    const client = new Client();

    client.use(context => {
      context.version = 'v1.0';
      return context;
    });

    expect(client.middlewares.length).toBe(1);
  });
});
