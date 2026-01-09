import * as storage from "./storage";

// Types
import { IPreferences } from "./types";

// Hooks
import { usePreferencesModal } from "./hooks/usePreferencesModal";

// Components
import PreferencesModal from "./components/PreferencesModal";

export type { IPreferences };
export default {
  storage,
  hooks: {
    usePreferencesModal,
  },
  components: {
    PreferencesModal,
  },
};
