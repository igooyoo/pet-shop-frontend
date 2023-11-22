import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import Rating from '../Rating';
import Input from './Input';

type RateInputProps<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  errormessage: string;
};

const RateInput = <T extends Record<string, any>>({
  label,
  name,
  control,
  errormessage,
}: RateInputProps<T>) => {
  const rateCount = useWatch<T>({ control, name });

  return (
    <div className="mx-2 flex w-full items-center gap-10">
      <div className="space-y-1">
        <h3 className="text-xs font-light">{label}</h3>
        <Rating value={rateCount ?? 0} />
      </div>
      <Input
        {...control.register(name)}
        type="number"
        min={0}
        max={5}
        errormessage={errormessage}
      />
    </div>
  );
};

export default RateInput;
