import React from 'react'

import * as e from '../../env'

import * as a from '../../actions'

import * as i18n from '../../i18n'

import * as m from '../../views/misc'

import * as p from '../../views/pages'
import * as v from '../../views'

import * as tf from './transaction-form'
import * as tl from './transaction-list'

type TransactionPageProps = {}


export class TransactionsPage extends m.ViewComponent<TransactionPageProps> {
  openDialog = () => {
    const {context} = this

    e.dispatch(a.addDialog(
      p.FormDialog,
      {
        title: i18n.xln(context, i18n.NEW_TRANSACTION),
        form: tf.TransactionForm,
      }
    ))
  }

  render() {
    const {openDialog} = this

    return (
      <v.ListPage action={<v.Fab onClick={openDialog} />}>
        <tl.TransactionsList />
      </v.ListPage>
    )
  }
}
