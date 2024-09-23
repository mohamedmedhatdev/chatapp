import { useController } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
import { styles } from "../message/message.style";

interface ITextFieldProps extends TextInputProps {
  name: string;
  control: any;
}
export const TextField = (props: ITextFieldProps) => {
  const { field } = useController({
    control: props.control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <TextInput {...props} value={field.value} onChangeText={field.onChange} />
  );
};
