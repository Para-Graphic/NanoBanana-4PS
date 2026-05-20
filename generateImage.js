const axios = require("axios");
const fs = require("fs");

// دریافت ورودی‌ها از main.js
const apiKey = process.env.GEMINI_API_KEY;
const prompt = process.env.IMAGE_PROMPT || "glowing DNA strand";
const negativePrompt = process.argv[4];
const width = parseInt(process.argv[5]) || 1024;
const height = parseInt(process.argv[6]) || 1024;

// بررسی اولیه
if (!apiKey || !prompt) {
  console.error("❌ API Key یا پرامپت وارد نشده.");
  process.exit(1);
}

// ساخت درخواست به Gemini API
const endpoint = `https://generativelanguage.googleapis.com/v1beta1/models/gemini-pro:generateContent?key=${apiKey}`;

const payload = {
  contents: [
    {
      parts: [
        { text: prompt },
        ...(negativePrompt ? [{ text: `Negative prompt: ${negativePrompt}` }] : [])
      ]
    }
  ]
};

// ارسال درخواست
axios
  .post(endpoint, payload)
  .then((response) => {
    const imageURL =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.fileData?.fileUri;

    if (imageURL) {
      fs.writeFileSync("imageURL.txt", imageURL);
      console.log("✅ تصویر تولید شد:", imageURL);
    } else {
      console.log("❌ تصویر دریافت نشد.");
    }
  })
  .catch((error) => {
    console.error("❌ خطا در ارتباط با Gemini:", error.message);
  });