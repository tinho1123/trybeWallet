import requestCurrencies from '../Fetch';

export const USER_LOGIN = 'USER_LOGIN';
export const SEND_EXPENSES = 'SEND_EXPENSES';
export const CHANGE_EXPENSE = 'CHANGE_EXPENSE';
export const HIDE_EDIT_FORM = 'HIDE_EDIT_FO RM';
export const REMOVE_COST = 'REMOVE_COST';
export const SHOW_EDIT_FORM = 'SHOW_EDIT_FORM';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  data: currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await requestCurrencies();
    return dispatch(receiveCurrencies(response));
  };
}

export const userLogin = (payload) => (
  {
    type: USER_LOGIN,
    payload,
  }
);

export const expenses = (payload) => ({
  type: SEND_EXPENSES,
  payload,
});

export const changeExpenses = (data) => ({
  type: CHANGE_EXPENSE,
  data,
});

export const hideEditForm = () => ({
  type: HIDE_EDIT_FORM,
});

export const removeCost = (id) => ({
  type: REMOVE_COST,
  id,
});

export const showEditForm = () => ({
  type: SHOW_EDIT_FORM,
});
