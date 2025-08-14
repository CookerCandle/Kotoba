import React from "react";
import * as wanakana from "wanakana";

const highlightText = (text, query) => {
  if (!query) return text;

  let regex;

  if (/^[a-zA-Z]+$/.test(query)) {
    // Пользователь ввёл romaji → ищем kana (hiragana+katakana)
    const hiragana = wanakana.toHiragana(query);
    const katakana = wanakana.toKatakana(query);
    regex = new RegExp(`(${hiragana}|${katakana})`, "g");
  } 
  else if (wanakana.isKana(query)) {
    // Пользователь ввёл kana → точное совпадение
    regex = new RegExp(`(${query})`, "g");
  } 
  else if (wanakana.isKanji(query)) {
    // Пользователь ввёл кандзи → точное совпадение
    regex = new RegExp(`(${query})`, "g");
  } 
  else {
    // Любой другой текст (узбекский, русский и т.д.)
    regex = new RegExp(`(${query})`, "gi");
  }

  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
};

const Word = ({ word, searchText }) => {
  return (
    <div className="word-card">
      <div className="word-lesson">
        {word.lesson} — Урок {word.dars}
      </div>

      <div className="word-header">
        <span className="word-jp">{highlightText(word.jp, searchText)}</span>
        <span className="word-kana">[{highlightText(word.kana, searchText)}]</span>
      </div>
      <div className="word-meaning">
        <p>{highlightText(word.uzb, searchText)}</p>
      </div>
    </div>
  );
};

export default Word;
