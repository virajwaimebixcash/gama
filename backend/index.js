import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import dotenv from "dotenv/config";

const app = express();
const PORT = "8000";

app.use(cors());
app.use(express.json());

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const languages = ["ar", "en", "id", "vi", "th"];

console.log(process.env.DEFAULT_LANG, "language");

const loadTranslation = (lang) => {
  let filePath;

  try {
    filePath = join(__dirname, "translations", `${lang}.json`);

    const translations = JSON.parse(readFileSync(filePath, "utf8"));

    return translations;
  } catch (err) {
    console.error(err);
  }
};

const saveTranslation = (lang, translations) => {
  try {
    const filePath = join(__dirname, "translations", `${lang}.json`);

    writeFileSync(filePath, JSON.stringify(translations, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving translation file:", err);
  }
};

app.get("/api/translations/:lng", (req, res) => {
  let { lng } = req?.params;

  if (!languages.includes(lng)) lng = "ar";

  const translations = loadTranslation(lng);

  return res.json(translations);
});

app.get("/api/lng", (req, res) => {
  return res.json({
    lng: "th",
  });
});

// POST route to add new translation keys
app.post("/api/addTranslation", (req, res) => {
  const { lang, groupName, groupHeader } = req.body;

  if (!languages.includes(lang)) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  // Load the current translations for the specified language
  const translations = loadTranslation(lang);

  if (!translations) {
    return res.status(500).json({ error: "Error loading translation file" });
  }

  // Check if the groupName and groupHeader keys already exist
  if (translations[groupName] || translations[groupHeader]) {
    return res.status(400).json({ error: "Translation keys already exist" });
  }

  // Add the new translation keys
  translations[groupName] = groupName; // or provide a default translation
  translations[groupHeader] = groupHeader; // or provide a default translation

  // Save the updated translation file
  saveTranslation(lang, translations);

  return res.status(200).json({ message: "Translation added successfully" });
});

app.listen(PORT, () => {
  console.log(`Your app started successfully and is running at port: ${PORT}`);
});
