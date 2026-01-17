import * as storage from "./storage";

// Types
import { IPreferences } from "./types";

// Hooks
import { usePreferencesModal } from "./hooks/usePreferencesModal";

// Components
import PreferencesModal from "./components/PreferencesModal";

// Slice
import slice, { fetchPreferences } from "./slice";

export type { IPreferences };
export default {
  storage,
  slice,
  hooks: {
    usePreferencesModal,
  },
  components: {
    PreferencesModal,
  },
  actions: {
    fetchPreferences,
  },
};
