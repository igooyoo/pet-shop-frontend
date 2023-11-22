import React, { forwardRef } from 'react';

import Text from '../Text';

type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    errormessage?: string;
    label?: string;
  },
  HTMLTextAreaElement
>;

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => (
    <div className="w-full">
      <Text>{props.label}</Text>
      <textarea
        ref={ref}
        className="h-48 w-full rounded-md border border-accent-2 bg-accent-0 p-2 outline-none"
        {...props}
        maxLength={500}
      />
      <Text className="text-rose-600">{props.errormessage}</Text>
    </div>
  )
);

Textarea.displayName = 'Textarea';

export default Textarea;
