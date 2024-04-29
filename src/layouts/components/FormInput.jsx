import { useTheme } from "../../hooks/customHooks";

function FormInput({ type, label, placeholder, onchange, classname, step }) {
  const { dark } = useTheme();
  return (
    <label htmlFor={label} className={classname}>
      <span className={`${dark && "text-zinc-300"}`}> {label} </span>
      <input
        id={label}
        type={type}
        step={step}
        placeholder={placeholder}
        className="announcementFormInput"
        style={{
          border: dark && "1px solid #d4d4d8",
          backgroundColor: dark && "#27272a",
          color: dark && "#d4d4d8",
        }}
        onChange={(e) => onchange(e.target.value)}
      />
    </label>
  );
}

export default FormInput;
