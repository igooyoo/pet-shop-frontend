import dynamic from 'next/dynamic';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { Options } from 'react-select';

import Text from '../Text';

const ReactSelect = dynamic(
  () => import('react-select').then((mod) => mod.default),
  { ssr: false, loading: () => null }
);

export interface Option {
  value: string | number | string[];
  label: string;
}

type MultiSelectProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  registerName: FieldPath<TFieldValues>;
  options?: Options<Option>;
  placeholder?: string;
  label?: string;
};

const MultiSelect = <TFieldValues extends Record<string, any>>({
  control,
  registerName,
  options,
  label,
  placeholder,
}: MultiSelectProps<TFieldValues>) => {
  const {
    field: { onChange },
  } = useController({ control, name: registerName, rules: { required: true } });

  return (
    <div className="w-full">
      <Text>{label}</Text>
      <ReactSelect
        classNamePrefix="select"
        isMulti
        placeholder={placeholder}
        onChange={(val: any) => onChange(val.map((e: Option) => e?.value))}
        options={options}
        theme={(theme) => ({
          ...theme,
          borderRadius: 2,
          colors: {
            ...theme.colors,
            primary25: 'hotpink',
            primary: 'black',
          },
        })}
        classNames={{
          menuList: () => 'border-0 bg-nav',
          valueContainer(props) {
            return `border-0 bg-primary-2 ${props.hasValue ? 'pl-2' : 'pl-4'}`;
          },
        }}
      />
    </div>
  );
};

export default MultiSelect;
