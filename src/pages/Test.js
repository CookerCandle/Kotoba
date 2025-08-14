import HanziWriter from "hanzi-writer";
import React, { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    const writer = HanziWriter.create("kanji-target", "学", {
      width: 200,
      height: 200,
      padding: 5,
      strokeAnimationSpeed: 1.2,
      delayBetweenStrokes: 300,
      showOutline: true,
      showCharacter: false
    });

    writer.animateCharacter();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div id="kanji-target"></div>
      <p>Анимация написания кандзи "学"</p>
    </div>
  );
};

export default Test;