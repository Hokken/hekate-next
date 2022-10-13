import React from "react";

type Props = {
    doCloseTextArea: () => void;
    doSaveInterpretationData: (val: string) => void;
};

function InputArea(props: Props) {
    const [value, setValue] = React.useState<string>("");
  return (
    <div>
      <textarea
        id="interpretation_area"
        name="add_interpretation_area"
        rows={6}
        cols={60}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <div>
        <button onClick={(e) => { props.doSaveInterpretationData(value)} } id="add_interpretation_button">Save</button>
        <button onClick={(e) => {props.doCloseTextArea()} } id="close_interpretation_button">Close</button>
      </div>
    </div>
  );
}

export default InputArea;
