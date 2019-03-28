import * as a from './actions'
import * as u from './utils'

export const dom = (state = {
  dialog: null,
  dialogs: 0,
  geometry: u.geometry(window.innerWidth),
}, action) => {
  switch (action.type) {
    case a.SET_DIALOG:
      return {
        ...state,
        dialog: action.dialog,
        dialogs: action.dialog ? state.dialogs + 1 : state.dialogs - 1,
      }
    case a.RESIZE:
      return {
        ...state,
        geometry: action.geometry,
      }
    default:
      return state
  }
}

const defaultTransaction = {
  date: new Date(),
  type: 'outcome',
  category: '',
  payee: '',
  comment: '',
  account: '',
  amount: '',
}

export const net = (state = {
  user: {},
  transaction: defaultTransaction,
  transactions: [],
  pending: [],
  errors: [],
}, action) => {
  switch (action.type) {
    case a.REQUEST_USER:
      return {
        ...state,
        pending: [...state.pending, a.REQUEST_USER],
      }
    case a.RECEIVE_USER:
      return {
        ...state,
        pending: state.pending.filter(item => item !== a.REQUEST_USER),
        user: action.user,
      }
    case a.REQUEST_TRANSACTIONS:
      return {
        ...state,
        pending: [...state.pending, a.REQUEST_TRANSACTIONS],
      }
    case a.RECEIVE_TRANSACTIONS:
      return {
        ...state,
        pending: state.pending.filter(item => item !== a.REQUEST_TRANSACTIONS),
        transactions: action.transactions,
      }
    case a.POST_TRANSACTION:
      return {
        ...state,
        pending: [...state.pending, a.POST_TRANSACTION],
      }
    case a.RECEIVE_TRANSACTION:
      return {
        ...state,
        pending: state.pending.filter(item => item !== a.POST_TRANSACTION),
        transaction: action.transaction || defaultTransaction,
      }
    case a.REQUEST_ERROR:
      return {
        ...state,
        error: [...state.errors, action.error],
      }
    default:
      return state
  }
}
