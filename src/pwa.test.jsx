import { getOfflineData, setOfflineData, queueAction, syncQueuedActions } from './pwa-setup';

describe('PWA Offline Functionality', () => {
  beforeEach(() => {
    // Clear localforage before each test
    localforage.clear();
  });

  test('should save and retrieve data from localforage', async () => {
    const testData = { id: 1, name: 'Test Data' };
    await setOfflineData('test-key', testData);
    const retrievedData = await getOfflineData('test-key');
    expect(retrievedData).toEqual(testData);
  });

  test('should queue an action when offline', async () => {
    const action = { url: '/api/test', method: 'POST', body: { data: 'test' } };
    await queueAction(action);
    const queue = await getOfflineData('actionQueue');
    expect(queue).toHaveLength(1);
    expect(queue[0]).toEqual(action);
  });

  test('should sync queued actions when online', async () => {
    const action = { url: '/api/test', method: 'POST', body: { data: 'test' } };
    await queueAction(action);

    // Mock the fetch function to simulate a successful API call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );

    await syncQueuedActions();

    expect(fetch).toHaveBeenCalledWith(action.url, {
      method: action.method,
      headers: action.headers,
      body: JSON.stringify(action.body),
    });

    const queue = await getOfflineData('actionQueue');
    expect(queue).toHaveLength(0);
  });
});
