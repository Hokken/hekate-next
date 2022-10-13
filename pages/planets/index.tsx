import { NextPageContext } from "next";
import React, { useContext, useEffect } from "react";
import Interpretations from "../../components/Interpretations";
import SearchAdd from "../../components/SearchAdd";
import { getDropdownsData, getInterpretations } from "../../firebase/services";
import {
  DropdownData,
  InterpretationItemBase,
  InterpretationsData,
} from "../../types/types";
import { useSearch } from "../../hooks/useSearch";
import { useRouter } from "next/router";

type Props = {
  planetsData: DropdownData;
  selected: string[];
  interpretationsData: InterpretationItemBase[];
};

export async function getServerSideProps(context: NextPageContext) {
  const planetsData = await getDropdownsData("planets");
  const planetId = context.query.planetId || "";

  let data: InterpretationsData = { interpretations: [] };
  if (!!planetId === true) {
    try {
      data = (await getInterpretations("planets", [
        planetId as string,
      ])) as InterpretationsData;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      planetsData: planetsData[0],
      selected: [planetId],
      interpretationsData: data.interpretations,
    },
  };
}

const Planets = (props: Props) => {
  const router = useRouter();
  const [interpretations, message, search] = useSearch(
    props.interpretationsData,
    "planets"
  );

  const doSearch = (selections: Array<string>) => {
    search(selections);
  };

  const doSelectChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    router.replace(
      {
        query: { ...router.query, planetId: e.target.value },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div>
      <h1>Planets interpretations</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <SearchAdd
        selected={props.selected}
        data={[props.planetsData]}
        doSearch={doSearch}
        doSelectChange={doSelectChange}
      />
      <Interpretations message={message} interpretations={interpretations} />
    </div>
  );
};

export default Planets;
