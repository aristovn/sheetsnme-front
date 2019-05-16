import React from 'react'
import {render} from 'react-dom'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider, connect} from 'react-redux'
import thunk from 'redux-thunk'

import * as r from './reducers'
import * as a from './actions'
import * as u from './utils'
import * as t from './views/translations'

import {AppRouter} from './views/routes'

export const store = createStore(combineReducers(r), applyMiddleware(thunk))
window.env = {store}

class App extends u.ViewComponent {
  constructor({dispatch, lang}) {
    super(...arguments)

    // TODO Think how to organize better
    dispatch(a.init({
      fetchUser        : u.xln({lang}, t.FETCHING_USER),
      fetchAccounts    : u.xln({lang}, t.FETCHING_ACCOUNTS),
      fetchCategories  : u.xln({lang}, t.FETCHING_CATEGORIES),
      fetchPayees      : u.xln({lang}, t.FETCHING_PAYEES),
      fetchTransactions: u.xln({lang}, t.FETCHING_TRANSACTIONS),
    }))
  }

  render({props: {isMobile, lang}}) {
    return (
      <u.Context.Provider value={{isMobile, lang}}>
        {/* Force components render when language was changed */}
        <AppRouter key={lang} />
      </u.Context.Provider>
    )
  }
}

const ConnectedApp = connect(state => ({
  isMobile: state.dom.geometry.isMobile,
  lang: state.dom.lang,
}))(App)

const elem = (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
)

const rootNode = document.getElementById('root')

render(elem, rootNode, initDom)

function initDom() {
  window.addEventListener('resize', () => {
    store.dispatch(a.resize(u.geometry(window.innerWidth)))
  })
}
