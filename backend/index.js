import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { join } from "path";

const app = express();
const PORT = "8000";

app.use(cors());
app.use(express.json());

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const languages = ["ar", "en", "id", "vi", "th"];

const loadTranslations = () => {
  let filePath;

  try {
    filePath = join(__dirname, "translations", "translations.json");

    const translations = JSON.parse(readFileSync(filePath, "utf8"));
    return translations;
  } catch (err) {
    console.error(err);
  }
};

// Endpoint to fetch the translations for a specific language
app.get("/api/translations/:lng", (req, res) => {
  let { lng } = req?.params;

  if (!languages.includes(lng)) lng = "en";

  const translations = loadTranslations();

  if (!translations) {
    return res.status(500).json({ error: "Error loading translations" });
  }

  // Return the translated keys for the requested language
  const response = {};

  for (const key in translations) {
    response[key] = translations[key][lng] || translations[key]["en"];
  }

  return res.json(response);
});

// Endpoint to get the default language
app.get("/api/lng", (req, res) => {
  return res.json({
    lng: "ar",
  });
});

app.listen(PORT, () => {
  console.log(`Your app started successfully and is running at port: ${PORT}`);
});
