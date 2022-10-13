import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import Interpretations from "../../components/Interpretations";
import SearchAdd from "../../components/SearchAdd";
import { getDropdownsData, getInterpretations } from "../../firebase/services";
import { useSearch } from "../../hooks/useSearch";
import { DropdownData, InterpretationItemBase, InterpretationsData } from "../../types/types";

type Props = {
  planetsData: DropdownData;
  signsData: DropdownData;
  selected: string[];
  interpretationsData: InterpretationItemBase[];
};

export async function getServerSideProps(context: NextPageContext) {
  
  const planetsData = await getDropdownsData("planets");
  const planetId = context.query.planetId || "";

  const signsData = await getDropdownsData("signs");
  const signId = context.query.signId || "";

  let data: InterpretationsData = { interpretations: [] };
  if (!!planetId === true && !!signId === true) {
    try {
      data = (await getInterpretations("planets-in-signs", [
        planetId as string,
        signId as string,
      ])) as InterpretationsData;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      planetsData: planetsData[0],
      signsData: signsData[0],
      selected: [planetId, signId],
      interpretationsData: data.interpretations,
    },
  };
}

const PlanetsInSigns = (props: Props) => {
  const router = useRouter();
  const [ interpretations, message, search] = useSearch(props.interpretationsData, "planets-in-signs");

  const doSearch = (selections: Array<string>) => {
    search(selections);
  };

  const doSelectChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    switch (index) {
      case 0:
        router.replace(
          {
            query: { ...router.query, planetId: e.target.value },
          },
          undefined,
          { shallow: true }
        );
        break;
      case 1:
        router.replace(
          {
            query: { ...router.query, signId: e.target.value },
          },
          undefined,
          { shallow: true }
        );
        break;
    }
  };

  return (
    <div>
      <h1>Planets in Signs interpretations</h1>
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
        data={[props.planetsData, props.signsData]}
        doSearch={doSearch}
        doSelectChange={doSelectChange}
      />
       <Interpretations message={message} interpretations={interpretations} />
    </div>
  );
};

export default PlanetsInSigns;
