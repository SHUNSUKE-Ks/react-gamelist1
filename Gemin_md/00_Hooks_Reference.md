# Hooks リファレンス

このドキュメントは、プロジェクト内で利用可能なカスタムHooksとその使い方をまとめたものです。

## 1. `useGameFlow`

### 機能
ゲームのフェーズ管理（タイトル、チュートリアル、メインゲーム、結果など）と、ゲーム固有のデータの状態管理を共通化するためのHooksです。これにより、各ゲームのマネージャーコンポーネントのコードを簡潔に保ち、再利用性を高めます。

### 使い方

```javascript
import useGameFlow from '../hooks/useGameFlow';
import { GameState } from '../constants/GameState'; // GameStateはプロジェクトの定数

const MyGameManager = () => {
    // initialGameDataはゲーム開始時の初期データ
    const { gameState, gameData, navigateTo, resetGame, setGameData } = useGameFlow({
        score: 0,
        level: 1,
    });

    // ゲームの状態に応じたコンポーネントのレンダリング
    switch (gameState) {
        case GameState.TITLE:
            return <TitleScreen onStart={() => navigateTo(GameState.TUTORIAL)} />;
        case GameState.TUTORIAL:
            return <TutorialScreen onNext={() => navigateTo(GameState.MAIN_GAME)} />;
        case GameState.MAIN_GAME:
            // メインゲームから結果データを渡し、次のフェーズへ遷移
            return <MainGameScreen onFinish={(result) => navigateTo(GameState.RESULT, { finalScore: result.score })} />;
        case GameState.RESULT:
            // 結果画面からゲームをリセット
            return <ResultScreen gameData={gameData} onRetry={() => resetGame()} />;
        default:
            return <div>Unknown State</div>;
    }
};

export default MyGameManager;
```

## 2. `useBGM`

### 機能
BGM（バックグラウンドミュージック）の再生、一時停止、停止、音量調整を管理するためのHooksです。ループ再生にも対応しています。

### 使い方

```javascript
import useBGM from '../hooks/useBGM';
import { useEffect } from 'react';

const MyGameComponent = () => {
    // BGMファイルのパス、ループ設定（true/false）、初期音量（0.0〜1.0）
    const { play, pause, stop, isPlaying, setVolume } = useBGM('/audio/game_bgm.mp3', true, 0.5);

    useEffect(() => {
        // コンポーネントがマウントされたらBGMを再生
        play();
        return () => {
            // アンマウント時にBGMを停止
            stop();
        };
    }, [play, stop]);

    return (
        <div>
            {isPlaying ? (
                <button onClick={pause}>BGMを一時停止</button>
            ) : (
                <button onClick={play}>BGMを再生</button>
            )}
            <button onClick={stop}>BGMを停止</button>
            <input type="range" min="0" max="1" step="0.1" onChange={(e) => setVolume(parseFloat(e.target.value))} />
        </div>
    );
};

export default MyGameComponent;
```

## 3. `useSE`

### 機能
効果音（SE）の再生を管理するためのHooksです。特定のイベント発生時に効果音を再生するのに適しています。

### 使い方

```javascript
import useSE from '../hooks/useSE';

const MyGameComponent = () => {
    // SEファイルのパス、音量（0.0〜1.0）
    const { play: playClickSound } = useSE('/audio/click_sfx.wav', 0.8);
    const { play: playHitSound } = useSE('/audio/hit_sfx.wav', 1.0);

    return (
        <div>
            <button onClick={playClickSound}>クリック音を再生</button>
            <button onClick={playHitSound}>ヒット音を再生</button>
        </div>
    );
};

export default MyGameComponent;
```
