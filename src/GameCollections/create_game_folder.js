/* global process */
// 実行例：node ./src/GameCollections/create_game_folder.js

import fs from "fs";
import path from "path";

const baseDir = path.resolve("./src/GameCollections");

// コマンドライン引数からゲーム名を取得（例: 01_TapCounter）
const gameName = process.argv[2];

if (!gameName) {
  console.error("Error: 新規ゲーム名を引数で指定してください（例：01_TapCounter）");
  process.exit(1);
}

const gameDir = path.join(baseDir, gameName);

if (fs.existsSync(gameDir)) {
  console.error(`Error: フォルダ「${gameName}」は既に存在します。`);
  process.exit(1);
}

// フォルダ作成
fs.mkdirSync(gameDir);
fs.mkdirSync(path.join(gameDir, "Resources"));

// ファイルテンプレートの中身（番号付き）
const files = {
  "00_TapCounterManager.jsx": `// ${gameName} の管理・画面遷移コンポーネント\nexport default function TapCounterManager() {\n  return null;\n}\n`,
  "01_Title.jsx": `// タイトル画面コンポーネント\nexport default function Title() {\n  return null;\n}\n`,
  "02_Tutorial.jsx": `// チュートリアル画面コンポーネント\nexport default function Tutorial() {\n  return null;\n}\n`,
  "03_MainGame.jsx": `// メインゲーム画面コンポーネント\nexport default function MainGame() {\n  return null;\n}\n`,
  "04_Result.jsx": `// リザルト画面コンポーネント\nexport default function Result() {\n  return null;\n}\n`
};

// ファイル生成
for (const [fileName, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(gameDir, fileName), content, "utf8");
}

console.log(`✅ 新規ゲームフォルダ「${gameName}」を作成しました。`);
