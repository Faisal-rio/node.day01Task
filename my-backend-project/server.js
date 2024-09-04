const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const baseFolderPath = path.join(__dirname, "files");

// Ensure the base folder exists
if (!fs.existsSync(baseFolderPath)) {
  fs.mkdirSync(baseFolderPath);
}

// Endpoint to create a text file with the current timestamp
app.post("/create-file", (req, res) => {
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
      return res.status(500).send("Error creating file");
    }
    res.send(`File created: ${filename}`);
  });
});

// Endpoint to retrieve all text files in the folder
app.get("/files", (req, res) => {
  fs.readdir(baseFolderPath, (err, folders) => {
    if (err) {
      return res.status(500).send("Error reading base folder");
    }

    let allFiles = [];
    folders.forEach((folder) => {
      const folderPath = path.join(baseFolderPath, folder);
      const files = fs
        .readdirSync(folderPath)
        .map((file) => path.join(folder, file));
      allFiles = allFiles.concat(files);
    });

    res.send(allFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
