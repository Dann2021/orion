export default function Selecteur({ children, label, onChange, name, className, style, value }) {
  return (
    <div className={`selecteur ${className}`} style={style}>
      <label htmlFor={name} className="monLabel">
        {label}
      </label>
      <select value={value} name={name} className="selectElement" onChange={onChange}>
        {children}
      </select>
    </div>
  );
}
