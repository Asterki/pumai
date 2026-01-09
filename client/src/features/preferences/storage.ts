import { get, set } from "idb-keyval";
import { IPreferences } from "./types";

export const getPreferences = async (): Promise<IPreferences> => {
  const prefs = await get("preferences");
  return prefs || { theme: "light", location: "UNAH-Comayagua", name: "" };
};

export const savePreferences = async (
  preferences: IPreferences,
): Promise<boolean> => {
  try {
    await set("preferences", preferences);
    return true;
  } catch (error) {
    console.error("Error saving preferences:", error);
    return false;
  }
};
