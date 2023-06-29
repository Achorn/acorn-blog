import { ReactComponent as AcornSvg } from "../../assets/icons/acorn.svg";
import "./AcornLoader.css";

const AcornLoader = ({ size = 40 }) => {
  return <AcornSvg className="Acorn-logo" height={size} />;
};

export default AcornLoader;
