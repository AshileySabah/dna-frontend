import React from "react";
import { Controller } from "react-hook-form";
import {
  InputBaseComponentProps,
  InputProps as InputPropsMui,
  TextFieldProps,
} from "@mui/material";
import { TextField } from "./styles";
import { IFormProps } from "../@types/form";

interface IInputProps extends IFormProps {
  InputProps?: InputPropsMui;
  inputProps?: InputBaseComponentProps;
  textFieldProps?: TextFieldProps;
  onBlurCustom?: VoidFunction;
  mask?: (value: string | undefined) => string;
}

export const Input: React.FC<IInputProps> = ({
  name,
  control,
  label,
  InputProps,
  inputProps,
  textFieldProps,
  onBlurCustom = () => null,
  mask = (value: string | undefined) => value,
}) => {
  const { maxLength } = inputProps ?? {};

  const {
    startAdornment,
    endAdornment,
    readOnly,
    disabled,
    onKeyDown,
    maxRows,
    rows,
    multiline,
    type,
    inputComponent,
  } = InputProps ?? {};

  const { variant, color } = textFieldProps ?? {};

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && typeof onKeyDown === "function") {
      onKeyDown(event);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, onBlur, ref },
        fieldState: { error },
      }) => (
        <TextField
          {...textFieldProps}
          fullWidth
          autoComplete="off"
          disabled={disabled}
          error={!!error}
          helperText={error ? error.message : ""}
          inputProps={{ ...inputProps, maxLength }}
          inputRef={ref}
          label={label}
          maxRows={maxRows}
          multiline={multiline}
          rows={rows}
          size="small"
          color={color ?? "primary"}
          type={type}
          value={value}
          variant={variant ?? "outlined"}
          InputProps={{
            ...InputProps,
            startAdornment,
            endAdornment,
            onKeyDown: handleOnKeyDown,
            readOnly,
            inputComponent,
          }}
          onChange={(e) => {
            const newEvent = {
              ...e,
              target: {
                value: mask(e.target.value),
              },
            };
            onChange(newEvent);
            textFieldProps?.onChange?.(e);
          }}
          onBlur={() => {
            onBlur();
            onBlurCustom();
          }}
        />
      )}
    />
  );
};
