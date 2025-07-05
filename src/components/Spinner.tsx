import { RotatingLines } from "react-loader-spinner";

const Spinner = ({
  width = "60",
  color = "#AD46FF",
}: {
  width?: string;
  color?: string;
}) => {
  return (
    <RotatingLines
      visible={true}
      width={width}
      strokeColor={color}
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export default Spinner;
