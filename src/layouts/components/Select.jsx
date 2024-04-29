function Select({ label, data, selected, classname }) {
  return (
    <label htmlFor={label} className={classname}>
      <span>{label}</span>
      <select
        name={label}
        id={label}
        onChange={(e) => {
          selected(e.target.value);
        }}
      >
        <option value=""> Select {label} </option>
        {data &&
          data.map((item) => (
            <option
              key={item.name || item}
              value={item._id || item.name || item}
            >
              {item.name || item}
            </option>
          ))}
      </select>
    </label>
  );
}

export default Select;
