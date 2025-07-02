import { useGame } from "@/GameManager/StateProvider";

export default function TitleScreen({ title }) {
  const { state } = useGame();
  if (state.gameState !== "TITLE") return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
}
