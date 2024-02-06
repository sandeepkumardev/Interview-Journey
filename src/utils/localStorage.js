import { localStorageKey } from '../constants';

export const get = () => {
  return JSON.parse(window.localStorage.getItem(localStorageKey));
};

export const set = (data) => {
  return window.localStorage.setItem(localStorageKey, JSON.stringify(data));
};
