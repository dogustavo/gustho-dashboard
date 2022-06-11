import { useEffect, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { useFormContext, Controller } from 'react-hook-form';
import { Typography, FormHelperText, Box } from '@mui/material';

import './styles.css';
import {} from '@mui/system';

const config = {
  readonly: false,
  placeholder: 'Digite a descrição do produto...',
  buttons: ['bold', 'italic', 'underline', 'ul', 'fontsize'],
  showCharsCounter: false,
  toolbarAdaptive: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  disablePlugins: ['enter', 'inline-popup'],
  errorMessage: true,
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

  useEffect(() => {
    const [element] = document.getElementsByClassName('jodit-container');

    if (!!errors[name]) {
      element.classList.toggle('active-error');
      return;
    }

    element.classList.remove('active-error');
  }, [errors[name]]);

  return (
    <Box component="div" sx={{ width: '100%' }}>
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

      {errors[name] && (
        <FormHelperText
          sx={{
            color: '#d32f2f',
            marginLeft: '14px',
          }}
        >
          {errors[name].message}
        </FormHelperText>
      )}
    </Box>
  );
}
