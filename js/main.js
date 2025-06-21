// Подключение библиотеки WanaKana через CDN
const script = document.createElement("script");
script.src = "https://unpkg.com/wanakana";
document.head.appendChild(script);

script.onload = () => {
    console.log("WanaKana загружен");
};

async function loadJSONFiles(fileUrls) {
    const promises = fileUrls.map(async url => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
            const data = await response.json();
            return { url, data };
        } catch (error) {
            console.error(`Ошибка при загрузке ${url}:`, error);
            return { url, data: [] };
        }
    });
    return Promise.all(promises);
}

async function searchWord(word, fileUrls) {
    const jsonData = await loadJSONFiles(fileUrls);
    let results = [];
    const lowerCaseWord = word.toLowerCase();
    const kanaWord = window.wanakana ? wanakana.toHiragana(lowerCaseWord) : lowerCaseWord;

    jsonData.forEach(({ url, data }) => {
        data.forEach(entry => {
            entry["so'zlar"].forEach(soz => {
                if (
                    (soz.jp && (soz.jp.toLowerCase().includes(lowerCaseWord) || soz.jp.includes(kanaWord))) ||
                    (soz.kana && (soz.kana.toLowerCase().includes(lowerCaseWord) || soz.kana.includes(kanaWord))) ||
                    (soz.uzb && soz.uzb.toLowerCase().includes(lowerCaseWord))
                ) {
                    results.push({
                        word: soz.jp || "Неизвестно",
                        kana: soz.kana || null,
                        translation: soz.uzb || "Неизвестно",
                        kanji: soz.kana ? entry.dars : entry.dars
                    });
                }
            });
        });
    });

    return results;
}

function highlightText(text, searchWords) {
    const regex = new RegExp(`(${searchWords.join('|')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

async function updateResults(word, fileUrls) {
    const results = await searchWord(word, fileUrls);
    console.clear();
    console.log("Результаты поиска:", results);
    
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    // Преобразуем введенное слово в хирагану
    const kanaWord = window.wanakana ? wanakana.toHiragana(word) : word;
    const searchWords = [word.toLowerCase(), kanaWord]; // Массив для поиска

    results.forEach(result => {
        const div = document.createElement("div");
        div.className = "result-item";

        // Подсветка для каждого поля
        const highlightedWord = highlightText(result.word, searchWords);
        const highlightedKana = result.kana ? highlightText(result.kana, searchWords) : null;
        const highlightedTranslation = highlightText(result.translation, searchWords);

        if (result.kana) {
            div.innerHTML = `Kanji ${result.kanji}: ${highlightedWord} (${highlightedKana}) - ${highlightedTranslation}`;
        } else {
            div.innerHTML = `Dars ${result.kanji}: ${highlightedWord} - ${highlightedTranslation}`;
        }
        resultsContainer.appendChild(div);
    });
}

const fileUrls = [
    "https://raw.githubusercontent.com/CookerCandle/KotobaSearcher/main/data/new-kanji.json",
    "https://raw.githubusercontent.com/CookerCandle/KotobaSearcher/main/data/vocabularyN4.json",
    "https://raw.githubusercontent.com/CookerCandle/KotobaSearcher/main/data/vocabularyN5.json",
    "https://raw.githubusercontent.com/CookerCandle/KotobaSearcher/main/data/N3_words.json",
];

const container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);

const input = document.createElement("input");
input.type = "text";
input.id = "search-input";
input.placeholder = "Введите слово";
input.className = "search-input";
container.appendChild(input);

const resultsContainer = document.createElement("div");
resultsContainer.id = "results";
resultsContainer.className = "results-container";
container.appendChild(resultsContainer);

input.addEventListener("input", () => {
    updateResults(input.value, fileUrls);
});

// Добавление стилей
const style = document.createElement("style");
style.textContent = null;
document.head.appendChild(style);
