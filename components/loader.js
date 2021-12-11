import { useState } from "react";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top:60%;
  left: 45%;
 
`;

function Loader(props) {
  
  let [color] = useState("#000");

  return (
    <div>
      <SyncLoader color={color} loading={props.loading} css={override} size={20} margin={2}/>
    </div>
  );
}

export default Loader;