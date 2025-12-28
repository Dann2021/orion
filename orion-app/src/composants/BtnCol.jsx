
export default function BtnCol({ classeName, type, onClick }) {
  return (
    <label className={`coulissant  ${classeName}`}>
      <input type="checkbox" />
      <p className={`forme ${type}`} onClick={onClick}></p>
    </label>
  );
}

