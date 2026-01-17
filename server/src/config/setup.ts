import fs from "fs-extra";
import path from "path";

const setup = () => {
  // Create the 'data' directory if it doesn't exist
  const folders = ["data/logs", "data/rag-documents", "data/uploads"];
  folders.forEach((folder) => {
    const dirPath = path.join(__dirname, "../..", folder);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  console.log("Setup complete.");
};

export default setup;
