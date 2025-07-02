import BaseDaialogueBox from "./BaseDialogueBox";
import "./dialogueStyle.css";

export default function DialogueBoxModule() {
  const speaker = "ミリナ";
  const text = "こんちちわ";

  return <BaseDaialogueBox speaker={speaker} text={text} />;
}
