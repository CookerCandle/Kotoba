const parseJSONFiles = (files, mode = "returnText", fileName = "output", onParsedText) => {
  if (!files || !files.length) return;

  // Создаём массив промисов для каждого файла
  const filePromises = files.map((file, index) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          const text = (json.subtitles || []).map(s => s.text).join(" ");
          // Нумеруем файлы
          resolve(`${index + 1}) ${text}\n\n`);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file, "UTF-8");
    });
  });

  // Когда все файлы прочитаны, объединяем текст
  Promise.all(filePromises)
    .then((texts) => {
      const combinedText = texts.join("");

      if (mode === "download") {
        const blob = new Blob([combinedText.trim()], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName.endsWith(".txt") ? fileName : fileName + ".txt";
        link.click();
        URL.revokeObjectURL(link.href);
      } else if (mode === "returnText" && onParsedText) {
        onParsedText(combinedText.trim());
      }
    })
    .catch((err) => console.error("Ошибка парсинга JSON:", err));
};

export default parseJSONFiles;
