# 新規ゲーム作成手順

このドキュメントは、`GameCollections` ディレクトリに新しいゲームを追加するための手順を説明します。

## 1. 新しいゲーム用のフォルダ作成

はじめに、新しいゲーム用のフォルダを `src/GameCollections/` 内に作成します。フォルダ名は、ゲームの連番と名前がわかるように `##_GameName` の形式にします。

**例:**
```bash
mkdir src/GameCollections/12_NewGame
```

## 2. 構成ファイルの作成

次に、作成したゲームフォルダ内に、以下の構成でファイルを作成します。既存のゲーム (`01_TapCounter` や `11_HighLow` など) を参考にしてください。

-   `00_GameNameManager.jsx`: ゲーム全体の状態を管理するコンポーネント。
-   `01_Title.jsx`: ゲームのタイトル画面を表示するコンポーネント。
-   `02_Tutorial.jsx`: ゲームの遊び方を説明するチュートリアル画面のコンポーネント。
-   `03_MainGame.jsx`: ゲームのメインロジックを実装するコンポーネント。
-   `04_Result.jsx`: ゲームの結果を表示するコンポーネント。
-   `GameName.css` (任意): ゲーム固有のスタイルを定義するCSSファイル。
-   `Resources/` (任意): ゲームで使用する画像などのアセットを格納するディレクトリ。

**ファイル作成例:**
```bash
touch src/GameCollections/12_NewGame/00_NewGameManager.jsx
touch src/GameCollections/12_NewGame/01_Title.jsx
touch src/GameCollections/12_NewGame/02_Tutorial.jsx
touch src/GameCollections/12_NewGame/03_MainGame.jsx
touch src/GameCollections/12_NewGame/04_Result.jsx
```

## 3. `App.jsx`へのゲームの追加

新しいゲームをアプリケーションのゲームリストに追加し、選択可能にするために、`src/App.jsx` を編集します。

1.  `src/App.jsx` を開きます。
2.  新しいゲームの `Manager` コンポーネントをインポートします。
3.  `gameList` 配列に、新しいゲームの情報を追加します。
4.  `GameRouter` コンポーネント内の `switch` 文に、新しいゲームのケースを追加します。

**編集例 (`src/App.jsx`):**

```javascript
// ... 他のインポート
import NewGameManager from "./GameCollections/12_NewGame/00_NewGameManager"; // 新しいゲームのManagerをインポート

const gameList = [
  // ... 既存のゲーム
  {
    id: "NewGame", // ゲームのユニークなID
    title: "新しいゲームのタイトル", // ゲームの表示名
    description: "新しいゲームの説明" // ゲームの説明
  }
];

function GameRouter() {
  // ... 省略

  if (state.gameState === GameState.TITLE) {
    switch (state.currentGame) {
      // ... 既存のケース
      case "NewGame": // 新しいゲームのID
        return <NewGameManager />; // 新しいゲームのManagerコンポーネント
      default:
        return <div>ゲームが見つかりません</div>;
    }
  }

  // ... 以下略
}
```

## 4. その他必要なアセットやスタイルの追加

ゲームに必要な画像や音声ファイルは、手順2で作成した `Resources/` フォルダに追加します。
また、ゲーム固有のスタイルは、同じく手順2で作成したCSSファイルに記述します。

グローバルに適用したいスタイルがある場合は、`src/GameStyles/global.css` の編集を検討してください。

## 5. 共通ロジックのHooks化について

複数のゲームで共通して利用できるロジック（例: ゲームの状態管理、データフロー、特定のUI操作など）は、カスタムHooks (`src/hooks/` ディレクトリ) として抽出することを推奨します。これにより、コードの再利用性が高まり、各コンポーネントの責務が明確になります。

**例:**
- ゲームのフェーズ管理 (`useGameFlow`)
- タイマー処理
- 特定のデータ操作

## 6. GSAPの使用について

このプロジェクトでは、`gsap` ライブラリによるアニメーションが利用可能です。
コンポーネントで `gsap` をインポートして、豊かなアニメーション表現を追加できます。

**インストール済みバージョン:** `^3.13.0`

**使用例:**
```javascript
import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';

function MyComponent() {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(".box", { rotation: "+=360" });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp}>
            <div className="box">Hello</div>
        </div>
    );
}
```

## 6. プロジェクト構成

### `package.json`

```json
{
  "name": "react-gamelist1",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.13.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react-swc": "^3.9.0",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "vite": "^6.3.5"
  }
}
```

### `src` ディレクトリ構成

```
src/
├── App.css
├── App.jsx
├── create_new_item.mjs
├── index.css
├── main.jsx
├── test.css
├── assets/
│   └── react.svg
├── components/
│   ├── DialogueBox/
│   │   ├── BaseDialogueBox.jsx
│   │   ├── DialogueBoxModule.jsx
│   │   └── dialogueStyle.css
│   └── UI/
│       ├── Button/
│       └── Timer/
├── constants/
│   └── GameState.js
├── GameCollections/
│   ├── create_game_folder.js
│   ├── TestList.jsx
│   ├── 01_TapCounter/
│   └── 11_HighLow/
├── GameManager/
│   └── StateProvider.jsx
├── GameScenes/
│   └── TitleScreen.jsx
└── GameStyles/
    └── global.css
```

