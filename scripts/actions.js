import * as n from './net'

export const RESIZE                 = 'RESIZE'
export const SET_DIALOG             = 'SET_DIALOG'

export const ADD_NOTIFICATION       = 'ADD_NOTIFICATION'
export const REMOVE_NOTIFICATION    = 'REMOVE_NOTIFICATION'

export const REQUEST_USER           = 'REQUEST_USER'
export const RECEIVE_USER           = 'RECEIVE_USER'

export const REQUEST_CATEGORIES     = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES     = 'RECEIVE_CATEGORIES'
export const RECEIVE_CATEGORY       = 'RECEIVE_CATEGORY'
export const POST_CATEGORY          = 'POST_CATEGORY'

export const REQUEST_ACCOUNTS       = 'REQUEST_ACCOUNTS'
export const RECEIVE_ACCOUNTS       = 'RECEIVE_ACCOUNTS'
export const RECEIVE_ACCOUNT        = 'RECEIVE_ACCOUNT'
export const POST_ACCOUNT           = 'POST_ACCOUNT'

export const REQUEST_PAYEES         = 'REQUEST_PAYEES'
export const RECEIVE_PAYEES         = 'RECEIVE_PAYEES'
export const RECEIVE_PAYEE          = 'RECEIVE_PAYEE'
export const POST_PAYEE             = 'POST_PAYEE'

export const REQUEST_TRANSACTIONS   = 'REQUEST_TRANSACTIONS'
export const RECEIVE_TRANSACTIONS   = 'RECEIVE_TRANSACTIONS'
export const RECEIVE_TRANSACTION    = 'RECEIVE_TRANSACTION'
export const POST_TRANSACTION       = 'POST_TRANSACTION'

export const resize = geometry => ({
  type: RESIZE,
  geometry,
})

export const setDialog = (dialog, props) => ({
  type: SET_DIALOG,
  dialog,
  props,
})

export const notify = notification => ({
  type: ADD_NOTIFICATION,
  notification: createNotification(notification),
})

export const removeNotification = time => ({
  type: REMOVE_NOTIFICATION,
  time,
})

export const receiveTransaction = transaction => ({
  type: RECEIVE_TRANSACTION,
  transaction,
})

export const receiveCategory = category => ({
  type: RECEIVE_CATEGORY,
  category,
})

export const receiveAccount = account => ({
  type: RECEIVE_ACCOUNT,
  account,
})

export const receivePayee = payee => ({
  type: RECEIVE_PAYEE,
  payee,
})

export const init = () => dispatch => {
  dispatch(fetchUser())
    .then(() => window.Promise.all([
      dispatch(fetchCategories()),
      dispatch(fetchAccounts()),
      dispatch(fetchPayees()),
    ]))
    .then(() => dispatch(fetchTransactions()))
}

export const fetchUser = () => dispatch => {
  dispatch({type: REQUEST_USER})
  return n.authedJsonFetch('/api/user')
    .then(user => dispatch({type: RECEIVE_USER, user}))
}

export const fetchCategories  = () => dispatch => {
  dispatch({type: REQUEST_CATEGORIES})
  return n.authedJsonFetch('/api/categories')
    .then(categories => dispatch({type: RECEIVE_CATEGORIES, categories}))
}

export const createCategory = category => dispatch => {
  dispatch({type: POST_CATEGORY})
  return n.authedJsonFetch('/api/categories', {
    method: 'POST',
    body: JSON.stringify(category),
  })
}

export const updateCategory = (category, id) => dispatch => {
  dispatch({type: POST_CATEGORY})
  return n.authedJsonFetch(`/api/categories/${id}`, {
    method: 'POST',
    body: JSON.stringify(category),
  })
}

export const fetchAccounts  = () => dispatch => {
  dispatch({type: REQUEST_ACCOUNTS})
  return n.authedJsonFetch('/api/accounts')
    .then(accounts => dispatch({type: RECEIVE_ACCOUNTS, accounts}))
}

export const createAccount = account => dispatch => {
  dispatch({type: POST_ACCOUNT})
  return n.authedJsonFetch('/api/accounts', {
    method: 'POST',
    body: JSON.stringify(account),
  })
}

export const updateAccount = (account, id) => dispatch => {
  dispatch({type: POST_ACCOUNT})
  return n.authedJsonFetch(`/api/accounts/${id}`, {
    method: 'POST',
    body: JSON.stringify(account),
  })
}

export const fetchPayees  = () => dispatch => {
  dispatch({type: REQUEST_PAYEES})
  return n.authedJsonFetch('/api/payees')
    .then(payees => dispatch({type: RECEIVE_PAYEES, payees}))
}

export const createPayee = payee => dispatch => {
  dispatch({type: POST_PAYEE})
  return n.authedJsonFetch('/api/payees', {
    method: 'POST',
    body: JSON.stringify(payee),
  })
}

export const updatePayee = (payee, id) => dispatch => {
  dispatch({type: POST_PAYEE})
  return n.authedJsonFetch(`/api/payees/${id}`, {
    method: 'POST',
    body: JSON.stringify(payee),
  })
}

export const fetchTransactions = () => dispatch => {
  dispatch({type: REQUEST_TRANSACTIONS})
  return n.authedJsonFetch('/api/transactions')
    .then(transactions => dispatch({type: RECEIVE_TRANSACTIONS, transactions}))
}

export const createTransaction = transaction => dispatch => {
  dispatch({type: POST_TRANSACTION})
  return n.authedJsonFetch('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(transaction),
  })
}

export const updateTransaction = (transaction, id) => dispatch => {
  dispatch({type: POST_TRANSACTION})
  return n.authedJsonFetch(`/api/transactions/${id}`, {
    method: 'POST',
    body: JSON.stringify(transaction),
  })
}

function createNotification({timeout = 4000, ...props}) {
  return {
    timeout,
    time: new Date().getTime(),
    ...props,
  }
}
