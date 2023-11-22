import React, { forwardRef } from 'react';

import Text from '../Text/Text';

type FileInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  },
  HTMLInputElement
>;

const FileUpload = forwardRef<HTMLInputElement, FileInputProps>(
  (props, ref) => {
    return (
      <div className="my-4 w-full">
        <Text>{props.label}</Text>
        <input ref={ref} type="file" {...props} />
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
