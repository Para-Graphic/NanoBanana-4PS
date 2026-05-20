function generateImage() {
    const apiKey = document.getElementById("apiKey").value.trim();
    const prompt = document.getElementById("prompt").value.trim();
    const negativePrompt = document.getElementById("negativePrompt").value.trim();
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
  
    if (!apiKey || !prompt) {
      alert("لطفاً کلید API و پرامپت را وارد کنید.");
      return;
    }
  
    const { exec } = require("child_process");
  
    const command = `node generateImage.js "${apiKey}" "${prompt}" "${negativePrompt}" ${width} ${height}`;
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        alert("❌ خطا در تولید تصویر:\n" + error.message);
        return;
      }
  
      // نمایش پیش‌نمایش تصویر
      const fs = require("fs");
      const imagePath = "imageURL.txt";
  
      if (fs.existsSync(imagePath)) {
        const imageURL = fs.readFileSync(imagePath, "utf8").trim();
        const preview = document.getElementById("preview");
        preview.src = imageURL;
        preview.style.display = "block";
      } else {
        alert("✅ تصویر تولید شد اما فایل imageURL.txt پیدا نشد.");
      }
    });
  }
  
  function sendToPhotoshop() {
    alert("لطفاً فایل n-banana4ps.jsx را در فتوشاپ اجرا کنید تا تصویر وارد شود.");
  }