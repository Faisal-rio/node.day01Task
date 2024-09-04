const fs = require("fs");
const path = require("path");

const baseFolderPath = path.join(__dirname, "files");

// Ensure the base folder exists
if (!fs.existsSync(baseFolderPath)) {
  fs.mkdirSync(baseFolderPath);
}

// Function to create a text file with the current timestamp
function createFile() {
  const timestamp = new Date().toISOString();
  const folderName = new Date().toISOString().replace(/:/g, "-").split(".")[0];
  const folderPath = path.join(baseFolderPath, folderName);

  // Ensure the folder exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filename = `${timestamp.replace(/:/g, "-")}.txt`;
  const filePath = path.join(folderPath, filename);

  fs.writeFile(filePath, `Welcome! Current timestamp: ${timestamp}`, (err) => {
    if (err) {
      console.error("Error creating file:", err);
    } else {
      console.log(`File created: ${filename}`);
    }
  });
}

// Function to read all text files in the folder
function readFiles() {
  fs.readdir(baseFolderPath, (err, folders) => {
    if (err) {
      console.error("Error reading base folder:", err);
      return;
    }

    let allFiles = [];
    folders.forEach((folder) => {
      const folderPath = path.join(baseFolderPath, folder);
      const files = fs
        .readdirSync(folderPath)
        .map((file) => path.join(folder, file));
      allFiles = allFiles.concat(files);
    });

    console.log("Files:", allFiles);
  });
}

// Example usage
createFile();
readFiles();
