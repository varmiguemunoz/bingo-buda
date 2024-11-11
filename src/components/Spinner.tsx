import { ImSpinner10 } from "react-icons/im";
import { FC } from "react";

type SpinnerProps = {
  hideText?: boolean;
  color?: string;
  size?: number;
  text?: string;
};

const Spinner: FC<SpinnerProps> = ({
  hideText = true,
  color = "#9747FF",
  size = 32,
  text = "Cargando...",
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <ImSpinner10 className="animate-spin" size={size} color={color} />
      {!hideText && <p className="text-sm text-center">{text}</p>}
    </div>
  );
};

export default Spinner;
