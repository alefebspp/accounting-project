import React, { useRef, useState } from "react";
import { ptBR } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import { DateInputProps } from "./interface";
import { Calendar } from "@phosphor-icons/react";

import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

registerLocale("ptBR", ptBR);

export const DateInput = ({
  label,
  selectedDate,
  setSelectedDate,
  control,
  name,
}: DateInputProps) => {
  const datePickerRef = useRef<any>(null);

  const handleClickDatepickerIcon = () => {
    const datepickerElement = datePickerRef.current;

    if (datepickerElement) {
      datepickerElement.setFocus(true);
    }
  };

  const handleSelectDate = (date: Date) => {
    console.log(date);
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="">{label}</label>
      <div className="flex w-full">
        <div className="w-full">
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                ref={datePickerRef}
                className="border border-gray-400 w-full h-[38px] rounded-l-lg px-2 focus:outline-0"
                selected={selectedDate}
                value={value}
                onChange={(value) => {
                  setSelectedDate(value);
                  onChange(value);
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/aaaa"
                locale="ptBR"
              />
            )}
          />
        </div>
        <div
          onClick={() => handleClickDatepickerIcon()}
          className="bg-blue-400 flex justify-center items-center w-[20%] rounded-r-lg cursor-pointer"
        >
          <Calendar
            size={30}
            weight="regular"
            className="text-white fill-current"
          />
        </div>
      </div>
    </div>
  );
};
