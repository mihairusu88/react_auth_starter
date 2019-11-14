import { GET_MESSAGES, CLEAR_MESSAGES } from './types';

// RETURN MESSAGES
export const returnMessages = (msg, status, id = null) => {
  return {
    type: GET_MESSAGES,
    payload: { msg, status, id }
  };
};

// CLEAR MESSAGES
export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  };
};
