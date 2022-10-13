import React from 'react'
import { InterpretationItemBase } from '../../types/types'

type Props = {
    interpretations:InterpretationItemBase[] | undefined;
    usersData?:any[],
    message: string;
}

function Interpretations({ interpretations, message }: Props) {
  return (
    <div>{
        interpretations && interpretations.length ? interpretations.map((item:InterpretationItemBase, index:number) => {    
            return (
                <div key={index}>
                    <h3>{item.text} liked {item.likes}</h3>
                </div>
            )
        }
    ) : <div>{message}</div>}
    </div>
  )
}

export default Interpretations