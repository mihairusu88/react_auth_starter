import { GET_MESSAGES, CLEAR_MESSAGES } from '../actions/types';

const initialState = {
  msg: {},
  status: null,
  id: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_MESSAGES:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}