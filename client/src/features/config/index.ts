import api from './api'
import slice, { fetchConfig } from './slice'

import * as ConfigAPITypes from '../../../../shared/api/config'
import type { IConfig } from '../../../../shared/models/config'

import * as schemas from '../../../../shared/schemas/config'

// Hooks
import { useUpdateConfigFormValidation } from './hooks/useUpdateConfigFormValidation'
import { useTutorial } from './hooks/useTutorial'

// Components
import { UpdateConfigForm } from './components/UpdateConfigForm'

const objectToExport = {
  api,
  slice,
  actions: {
    fetchConfig,
  },
  schemas,
  hooks: {
    useUpdateConfigFormValidation,
    useTutorial,
  },
  components: {
    UpdateConfigForm,
  },
}

export type { IConfig, ConfigAPITypes }
export default objectToExport
