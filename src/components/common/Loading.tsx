import ClipLoader from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "rgb(124 58 237)",
};

const Loading = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("");
  return (
    <div className="sweet-loading">
      <input value={color} onChange={(input) => setColor(input.target.value)} />

      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={250}
      />
    </div>
  );
};

export default Loading;
