import React from "react";
import Word from "./Word";
import Emoji from "./Emoji";

const Words = ({ words, searchText}) => {
  if (!words.length) {
    return <Emoji />;
  }

  return (
    <div className="words-list">
      {words.map((w, idx) => (
        <Word key={idx} word={w} searchText={searchText}/>
      ))}
    </div>
  );
};

export default Words;
