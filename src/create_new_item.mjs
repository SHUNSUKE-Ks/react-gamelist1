// create_new_item.js

const fs = require("fs");
const path = require("path");

const componentName = "DialogueBox";
const targetDir = `src/components/${componentName}`;

const files = [
  {
    name: "BaseDialogueBox.jsx",
    content: `export default function BaseDialogueBox({ speaker, text }) {
  return (
    <div className="dialogue-box">
      <div className="dialogue-speaker">{speaker}</div>
      <div className="dialogue-text">{text}</div>
    </div>
  );
}
`
  },
  {
    name: "DialogueBoxModule.jsx",
    content: `import BaseDialogueBox from "./BaseDialogueBox";

export default function DialogueBoxModule() {
  const speaker = "ミリナ";
  const text = "こんにちは！この学校は不思議がいっぱいです。";

  return <BaseDialogueBox speaker={speaker} text={text} />;
}
`
  },
  {
    name: "dialogueStyle.css",
    content: `.dialogue-box {
  width: 300px;
  background-color: white;
  border: 2px solid black;
  padding: 12px;
  font-family: sans-serif;
}

.dialogue-speaker {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
  color: #444;
}

.dialogue-text {
  font-size: 16px;
}
`
  }
];

// ディレクトリ作成
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`📁 フォルダ作成: ${targetDir}`);
}

// ファイル作成
files.forEach(({ name, content }) => {
  const filePath = path.join(targetDir, name);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ ファイル作成: ${filePath}`);
});
