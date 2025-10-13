import React from "react";

import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

import { useTranslation } from "react-i18next";

const ConnectionIndicatorComponent: React.FC = () => {
	const { status: serverConnectionStatus } = useSelector(
		(state: RootState) => state.stats,
	);
	const { t } = useTranslation(["dashboard"]);

	const [connectionStatus, setConnectionStatus] =
		React.useState<string>("loading");

	React.useEffect(() => {
		setConnectionStatus(serverConnectionStatus);
	}, [serverConnectionStatus]);

	return (
		<div className="flex items-center gap-4">
			<div
				className={`h-3 w-3 rounded-full flex items-center justify-center ${
					connectionStatus === "succeeded"
						? "bg-green-500"
						: connectionStatus === "failed"
							? "bg-red-500"
							: "bg-orange-500"
				}`}
				title={
					connectionStatus
						? t("dashboard:connected")
						: t("dashboard:disconnected")
				}
			>
				<div
					className={`h-3 w-3 rounded-full animate-ping duration-700 ${
						connectionStatus === "succeeded"
							? "bg-green-400"
							: connectionStatus === "failed"
								? "bg-red-400"
								: "bg-orange-400"
					}`}
				></div>
			</div>
			<span className="text-sm text-gray-500 dark:text-gray-400">
				{connectionStatus === "loading"
					? t("dashboard:connecting")
					: connectionStatus === "failed"
						? t("dashboard:disconnected")
						: connectionStatus === "succeeded"
							? t("dashboard:connected")
							: t("dashboard:connecting")}
			</span>
		</div>
	);
};

export default ConnectionIndicatorComponent;
