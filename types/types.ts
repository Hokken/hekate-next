import { DocumentData } from "firebase/firestore";

export type Item = {
  id: number;
  name: string;
};

export type DropdownData = DocumentData & {
  items: Item[];
  label: string;
  type: string;
};

export type InterpretationItemBase = {
  created: number;
  id: string;
  likes: number;
  text: string;
  uid: string;
  validated: boolean
  planetId?: number;
  aspect?: number;
  signId?: number;
  houseId?: number;
  retrograde?: boolean;
}

export type UserData = {
  uid: string; 
  displayName: string; 
  photoURL: string; 
  websiteName: string; 
  websiteURL: string; 
  businessDescription: string;
}

export type InterpretationsData = {
  interpretations?: InterpretationItemBase[];
  usersData?: any[];
};



