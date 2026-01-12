import api from './api'
import * as schemas from '../../../../shared/schemas/accounts'

// Types
import * as AccountAPITypes from '../../../../shared/api/accounts'
import type { IAccount } from '../../../../shared/models/account'

type ListAccount = {
  _id: string
  name: string
  email: string
  role: {
    _id: string
    name: string
    level: number
  }
  deleted: boolean
}

// Hooks
import { useAccountsList } from './hooks/useAccountsList'
import { useAccountSearch } from './hooks/useAccountSearch'
import { useCreateAccountFormValidation } from './hooks/useCreateAccountForm'
import { useUpdateAccountFormValidation } from './hooks/useUpdateAccountFormValidation'

// Components
import { CreateAccountForm } from './components/CreateAccountForm'
import { UpdateAccountForm } from './components/UpdateAccountForm'
import { AccountsTable } from './components/AccountsTable'

export type { AccountAPITypes, IAccount, ListAccount }
export default {
  api,
  schemas,
  hooks: {
    useCreateAccountFormValidation,
    useAccountsList,
    useUpdateAccountFormValidation,
    useAccountSearch,
  },
  components: {
    CreateAccountForm,
    AccountsTable,
    UpdateAccountForm,
  },
}
