import { collection, query, where, getDocs, DocumentData, Query } from "firebase/firestore";
import { DropdownData, InterpretationItemBase, UserData } from "../types/types";
import { db } from "./setup";

export const getDropdownsData = async (type: string) => {
  const q = query(collection(db, "dropdowns"), where("type", "==", type));
  const querySnapshot = await getDocs(q);
  let result:DropdownData[] = [];
  querySnapshot.forEach((doc) => {
    result.push(doc.data() as DropdownData);
  });
  return result
}

export const getInterpretations = async (coll: string, selections: string[] | number[]) => {
  let q: Query<DocumentData>;
  let querySnapshot;
  switch (coll) {
    case "planets":
      q = query(collection(db, "planets"), where("planetId", "==", Number(selections[0])));
      querySnapshot = await getDocs(q);
      break;
    case "signs":
      q = query(collection(db, "signs"), where("signId", "==", Number(selections[0])));
      querySnapshot = await getDocs(q);
      break;
    case "houses":
      q = query(collection(db, "houses"), where("houseId", "==", Number(selections[0])));
      querySnapshot = await getDocs(q);
      break;
    case "aspects":
      q = query(collection(db, "aspects"), where("aspectId", "==", Number(selections[0])));
      querySnapshot = await getDocs(q);
      break;
    case "planets-in-signs":
      q = query(collection(db, "planets-in-signs"), where("planetId", "==", Number(selections[0])), where("signId", "==", Number(selections[1])));
      querySnapshot = await getDocs(q);
      break;
    case "houses-in-signs":
      q = query(collection(db, "houses-in-signs"), where("houseId", "==", Number(selections[0])), where("signId", "==", Number(selections[1])));
      querySnapshot = await getDocs(q);
      break;
    case "planets-in-houses":
      q = query(collection(db, "planets-in-houses"), where("planetId", "==", Number(selections[0])), where("houseId", "==", Number(selections[1])));
      querySnapshot = await getDocs(q);
      break;

    case "planets-in-aspects":
      q = query(collection(db, "planets-in-aspects"), where("planetsId", "in", [
        `${selections[0]}-${selections[2]}`,
        `${selections[2]}-${selections[0]}`
      ]), where("aspectId", "==", Number(selections[1])));
      querySnapshot = await getDocs(q);
      break;
  }

  console.log("searching for ", selections, 'in', coll);

  try {

    let interpretations: DocumentData[] = [];
    querySnapshot?.forEach((doc) => {
      interpretations.push({ ...doc.data(), id: doc.id } as InterpretationItemBase);
    });

    const uids: string[] = [];
    if (interpretations?.length === 0) {
      return Promise.reject(
        "No interpretations found for those search criteria"
      );
    }
    interpretations?.forEach(interpretation => {
      uids.push(interpretation.uid);
    });

    return Promise.all(getUsersData(uids)).then(usersData => {
      return Promise.resolve({ interpretations, usersData });
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUsersData = (uids: any[]) => {
  const promises: Promise<DocumentData>[] = [];
  uids.forEach(uid => {
    promises.push(getUserData(uid));
  });

  return promises;
};

export const getUserData = async (uid: string) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let result: UserData[] = [];
    querySnapshot.forEach((doc) => {
      const {
        uid,
        displayName,
        photoURL,
        websiteName,
        websiteURL,
        businessDescription
      } = doc.data();

      result.push(uid,
        displayName,
        photoURL,
        websiteName,
        websiteURL,
        businessDescription);
    });

    return Promise.resolve(result[0]);
  } catch (error) {
    return Promise.reject(error);
  }
};