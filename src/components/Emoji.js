import React, { useState } from "react";

const emojis = [
  "ʕ⁠っ⁠•⁠ᴥ⁠•⁠ʔ⁠っ",
  "(≧◡≦)",
  "(づ｡◕‿‿◕｡)づ",
  "（＾∀＾●）ﾉｼ",
  "(✿◠‿◠)",
  "(￣▽￣)ノ",
  "ヽ(♡‿♡)ノ",
  "⟵⁠(⁠๑⁠¯⁠◡⁠¯⁠๑⁠)",
  "(⁠٥⁠↼⁠_⁠↼⁠)",
  "(⁠*⁠﹏⁠*⁠;⁠)",
  "•́⁠ ⁠ ⁠‿⁠ ⁠,⁠•̀",
  "/⁠ᐠ⁠｡⁠ꞈ⁠｡⁠ᐟ⁠\\",
  "⊂⁠(⁠・⁠▽⁠・⁠⊂⁠)",
  "^⁠_⁠_⁠_⁠_⁠_⁠_⁠_⁠_⁠_⁠^",
  "(⁠◕⁠ᴗ⁠◕⁠✿⁠)",
  "(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠✧⁠*⁠。"
];

const Emoji = () => {
  const [emoji, setEmoji] = useState(emojis[0]);

  const changeEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setEmoji(emojis[randomIndex]);
  };

  return (
    <p
      className="words-list-emoji"
      style={{ cursor: "pointer" }}
      onClick={changeEmoji}
    >
      {emoji}
    </p>
  );
};

export default Emoji;
