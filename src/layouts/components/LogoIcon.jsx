import LOGO from "../../assets/icons/dresz-logo.png";

function LogoIcon({ width, className }) {
  return (
    <img
      src={LOGO}
      alt="LOGO"
      width={width}
      className={className}
      style={{ margin: "5px 2px 5px 10px" }}
    />
  );
}

export default LogoIcon;
