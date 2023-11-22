import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
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
  label: ReactNode;
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
  placeholder,
  label,
}: MultiSelectProps<TFieldValues>) => {
  const {
    field: { onChange },
  } = useController({ control, name: registerName, rules: { required: true } });

  return (
    <div className="w-full">
      <Text className="pb-2">{label}</Text>
      <ReactSelect
        classNamePrefix="select"
        placeholder={placeholder}
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
          menuList: () => 'border-0 bg-primary-2',
          valueContainer(props) {
            return `border-0 bg-primary-2 ${props.hasValue ? 'pl-2' : 'pl-4'}`;
          },
        }}
        onChange={(val: any) => onChange(val.value)}
        options={options}
      />
    </div>
  );
};

export default MultiSelect;
