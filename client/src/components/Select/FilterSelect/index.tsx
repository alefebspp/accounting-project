import Select, { components, IndicatorsContainerProps } from "react-select";
import { customStyles } from "../styles";
import { IDateSelectProps } from "../interface";
import { dateSelectOptions, paymentOptions } from "./options";
import { getFirstAndLastDaysFromDate } from "../../../util/transformDate";
import queryString from "query-string";

const FilterSelect = ({
  setSelectedFilter,
  selectedFilter,
  optionsType,
}: IDateSelectProps) => {
  const IndicatorsContainer = (props: IndicatorsContainerProps) => {
    return (
      <div className="bg-blue-400">
        <components.IndicatorsContainer {...props} />
      </div>
    );
  };

  const removeParamsFromFilter = (
    filterString: string | undefined,
    paramsToRemove: string[]
  ) => {
    let newFilter = queryString.parse(filterString!);

    paramsToRemove.forEach((param) => {
      delete newFilter[param];
    });

    const newFilterString = queryString.stringify(newFilter, { encode: false });

    if (newFilterString) {
      return `?${newFilterString}`;
    } else {
      return "";
    }
  };

  const handleChange = (selectedOption: any) => {
    if (selectedOption.value === "reset") {
      const paramsToRemove = optionsType; // Adicione aqui os parâmetros que deseja remover

      const newFilter = removeParamsFromFilter(selectedFilter, paramsToRemove);

      setSelectedFilter(newFilter);
      return;
    }

    let newFilter = queryString.parse(selectedFilter!);

    if (optionsType.includes("start_date")) {
      const newDate = getFirstAndLastDaysFromDate(
        new Date(selectedOption.value)
      );
      const { firstDay, lastDay } = newDate;

      newFilter = {
        ...newFilter,
        start_date: firstDay,
        end_date: lastDay,
      };
    } else {
      newFilter = {
        ...newFilter,
        payment_type: selectedOption.value,
      };
    }

    const filteredParams = queryString.stringify(newFilter, { encode: false });

    setSelectedFilter(filteredParams ? `?${filteredParams}` : "");
  };

  return (
    <Select
      styles={customStyles}
      blurInputOnSelect={false}
      components={{ IndicatorsContainer }}
      options={
        optionsType.includes("start_date") ? dateSelectOptions : paymentOptions
      }
      onChange={handleChange}
      placeholder="Selecione um mês"
    />
  );
};

export { FilterSelect };
