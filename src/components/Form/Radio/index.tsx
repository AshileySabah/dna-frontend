import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControlLabel,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Radio as RadioMui,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";
import { FormControl } from "./styles";
import { IFormProps } from "../@types/form";

export type IOption = {
  label: string;
  value: string | number | boolean;
};

interface IRadioProps extends IFormProps {
  options: Array<IOption>;
  formControlProps?: FormControlProps;
  radioGroupProps?: RadioGroupProps;
  radioProps?: RadioProps;
}

export const Radio: React.FC<IRadioProps> = ({
  control,
  name,
  label,
  options,
  formControlProps,
  radioGroupProps,
  radioProps,
}) => {
  const { row } = radioGroupProps ?? {};
  const { disabled } = formControlProps ?? {};

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <FormControl {...formControlProps} error={!!error}>
          <FormLabel error={!!error}>{label}</FormLabel>
          <RadioGroup
            row={row}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            {options?.map((item) => (
              <FormControlLabel
                key={item?.label}
                disabled={disabled}
                inputRef={ref}
                value={item?.value}
                control={<RadioMui color="primary" {...radioProps} />}
                label={item?.label}
              />
            ))}
          </RadioGroup>
          {!!error && (
            <FormHelperText error={!!error}>
              {error ? error.message : ""}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
