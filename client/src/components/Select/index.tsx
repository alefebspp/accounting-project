import Select, { components, IndicatorsContainerProps } from 'react-select';
import { Controller } from 'react-hook-form';
import { customStyles } from './styles';
import { ISelectProps } from './interface';
import { useRef } from 'react';
import StateManagedSelect from 'react-select';

const SelectComponent = ({
  name,
  control,
  options,
  id,
  defaultValue,
  menuIsOpen
}: ISelectProps) => {
  const IndicatorsContainer = (props: IndicatorsContainerProps) => {
    return (
      <div className="bg-blue-400">
        <components.IndicatorsContainer {...props} />
      </div>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <Select
          id={id}
          styles={customStyles}
          blurInputOnSelect={false}
          defaultValue={defaultValue}
          defaultMenuIsOpen={menuIsOpen}
          components={{ IndicatorsContainer }}
          options={options}
          onBlur={onBlur}
          onChange={value => onChange(value.value)}
          value={value?.label}
          name={name}
          ref={ref}
        />
      )}
      rules={{ required: true }}
    />
  );
};

export { SelectComponent };
