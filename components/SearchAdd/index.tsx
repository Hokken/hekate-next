import React, { useContext, useState } from "react";
import { useIsomorphicEffect } from "../../hooks/useIsomorphicEffect";
import AuthContext from "../AuthProvider/AuthContext";
import InputArea from "./InputArea";

type Props = {
  data: any[];
  selected: string[];
  doSearch: (val: Array<string>) => void;
  doSelectChange: (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

const SearchAdd = (props: Props) => {
  const [selections, setSelections] = useState<string[]>([]);
  const [mode, setMode] = useState<string>("search");
  const { isAuthenticated } = useContext(AuthContext);
  const isomorphicEffect = useIsomorphicEffect();

  isomorphicEffect(() => {
    for (let i = 0; i < props.selected.length; i++) {
      setSelections((val) => {
        val[i] = props.selected[i] !== "" ? props.selected[i] : val[i];
        return [...val];
      });
    }
  }, [props.selected]);

  const handleChange =
    (index: any) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelections((val) => {
        val[index] = e.target.value;
        return [...val];
      });
      props.doSelectChange(index, e);
    };

  const addInterpretation = () => {
    setMode("add");
  };

  const doSaveInterpretationData = (val: string) => {
    console.log("data to save: ", val);
    setMode("search");
  };

  const doCloseTextArea = () => {
    setMode("search");
  };

  return (
    <div>
      {props.data.map((item: any, index: number) => {
        return (
          <div key={index}>
            <select
              defaultValue={item.label}
              value={selections[index]}
              onChange={handleChange(index)}
            >
              <option disabled value={item.label}>
                {item.label}
              </option>
              {item.data.map((item: any, index: number) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
      <div>
        <button
          onClick={(e) => {
            props.doSearch(selections);
          }}
        >
          Search Interpretations
        </button>
        { isAuthenticated && <div> OR <button onClick={addInterpretation}>Add Interpretation</button></div>
        }
      </div>
      {mode === "add" && (
        <InputArea
          doCloseTextArea={doCloseTextArea}
          doSaveInterpretationData={doSaveInterpretationData}
        />
      )}
    </div>
  );
};

export default SearchAdd;
