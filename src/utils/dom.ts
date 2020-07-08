import { SyntheticEvent } from 'react';

export const isElementWithValue = (
  element: any,
): element is HTMLInputElement | HTMLTextAreaElement =>
  element && typeof element.value === 'string';

export const extractEventTargetValue = (event: SyntheticEvent): string => {
  if (!event.target || !isElementWithValue(event.target)) {
    return '';
  }

  return event.target.value;
};

export const createEventHandler = <A extends any[]>(
  callback: (event: SyntheticEvent, ...args: A) => void,
) => (event: SyntheticEvent, ...args: A): void => {
  event.preventDefault();
  callback(event, ...args);
};

export const createEventTargetValueExtractor = (
  callback: (value: string) => void,
) => (event: SyntheticEvent): void => {
  callback(extractEventTargetValue(event));
};
