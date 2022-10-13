import { useState } from "react";
import { getInterpretations } from "../firebase/services";
import { InterpretationItemBase, InterpretationsData } from "../types/types";

export const useSearch = (interpretationsData:InterpretationItemBase[], table:string) => {

   const [message, setMessage] = useState<string>('');
   const [interpretations, setInterpretations] = useState<InterpretationItemBase[] | undefined>(interpretationsData);

  const search = async (selections: Array<string>):Promise<void> => {
    console.log('creating search');
    setInterpretations([]);
    setMessage('...Loading');
    try {
      const data = await getInterpretations(table, selections) as InterpretationsData;
      setInterpretations(data.interpretations);
      setMessage('');
    }
    catch (reason) {
      setMessage(reason as string);
    }
  };

  return [interpretations, message, search] as const;

}