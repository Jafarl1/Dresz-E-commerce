function FormInput({ type, label, placeholder, onchange, classname, step }) {
  return (
    <label htmlFor={label} className={classname}>
      <span> {label} </span>
      <input
        id={label}
        type={type}
        step={step}
        placeholder={placeholder}
        className="announcementFormInput"
        onChange={(e) => onchange(e.target.value)}
      />
    </label>
  );
}

export default FormInput;
