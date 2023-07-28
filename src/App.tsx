import "./styles.css";
import Start from "./Start";
import Finish from "./Finish";
import { useState } from "react";

export default function App(): JSX.Element {
  const [show, setShow] = useState(true);
  return (
    <div className="center">
      <h2>Show Start or Finish</h2>
      <label className="switch">
        <input checked={show} onChange={() => setShow(!show)} type="checkbox" />
        <span className="slider round"></span>
      </label>
      {show ? <Start /> : <Finish />}
    </div>
  );
}
