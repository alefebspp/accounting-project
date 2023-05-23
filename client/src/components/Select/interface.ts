import { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";

export interface ISelectProps {
  id: string;
  name: string;
  control: Control<any>;
  options: any;
  defaultValue?: any;
  menuIsOpen?: boolean;
}

export interface IDateSelectProps {
  setSelectedFilter: Dispatch<SetStateAction<any>>;
  selectedFilter: string | undefined;
  optionsType: string[];
}
