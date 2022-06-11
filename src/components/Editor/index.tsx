import { useRef } from 'react';
import JoditEditor from 'jodit-react';
import { useFormContext, Controller } from 'react-hook-form';

import './styles.css';

const config = {
  readonly: false,
  placeholder: 'Digite a descrição do produto...',
  buttons: ['bold', 'italic', 'underline', 'ul', 'fontsize'],
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  disablePlugins: ['enter', 'inline-popup'],
};

interface IEditor {
  name: string;
}

export default function MyEditor({ name }: IEditor) {
  const editor = useRef(null);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => {
        return (
          <JoditEditor
            {...field}
            ref={editor}
            value={field.value || ''}
            config={config}
            onBlur={field.onBlur}
          />
        );
      }}
    />
  );
}
