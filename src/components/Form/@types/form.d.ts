import { Control } from "react-hook-form";

interface IFormProps {
  label?: string;
  name: string;
  control: Control<any>;
  setValue?: any;
}
