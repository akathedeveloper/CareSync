
import localforage from 'localforage';

localforage.config({
  name: 'CareSync',
  storeName: 'offline-data',
  description: 'Offline storage for CareSync application data.',
});

export const getOfflineData = async (key) => {
  try {
    const data = await localforage.getItem(key);
    return data;
  } catch (error) {
    console.error('Error getting offline data:', error);
    return null;
  }
};

export const setOfflineData = async (key, value) => {
  try {
    await localforage.setItem(key, value);
  } catch (error) {
    console.error('Error setting offline data:', error);
  }
};

export const queueAction = async (action) => {
  try {
    const queue = (await localforage.getItem('actionQueue')) || [];
    queue.push(action);
    await localforage.setItem('actionQueue', queue);
  } catch (error) {
    console.error('Error queuing action:', error);
  }
};

export const syncQueuedActions = async () => {
  const queue = (await localforage.getItem('actionQueue')) || [];
  if (queue.length === 0) {
    return;
  }

  const successfullySynced = [];
  for (const action of queue) {
    try {
      // Replace with your actual API call
      await fetch(action.url, {
        method: action.method,
        headers: action.headers,
        body: JSON.stringify(action.body),
      });
      successfullySynced.push(action);
    } catch (error) {
      console.error('Error syncing action:', error);
    }
  }

  const newQueue = queue.filter((action) => !successfullySynced.includes(action));
  await localforage.setItem('actionQueue', newQueue);
};
