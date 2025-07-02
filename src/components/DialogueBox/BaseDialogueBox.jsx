export default function BaseDaialogueBox({ speaker, text }) {
  return (
    <div className="dialogue-box">
      <div className="dialoge-speaker">{speaker}</div>
      <div className="dialogue-text">{text}</div>
    </div>
  );
}
