import api from "./api";
import slice, { getConnectionStatus } from "./slice";

// Components
import ConnectionIndicator from "./components/ConnectionIndicator";

export default {
	api,
	slice,
	actions: {
		getConnectionStatus,
	},
	components: {
		ConnectionIndicator,
	},
};
