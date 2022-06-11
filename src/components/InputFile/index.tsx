import React, { InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { IconButton, ImageList, ImageListItem, Alert } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

import { getBase64 } from '@/utils';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default function Input({ name, required }: IInput) {
  const [previewImages, setPreviewImages] = useState<string[]>();
  const {
    setValue,
    setError,
    register,
    formState: { errors },
  } = useFormContext();

  const handleShowSelectedImages = async (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = evt.target.files;
    let converted: string[] = [];

    if (fileList) {
      if (fileList.length > 3) {
        // setError(true);
        setError(name, {
          type: 'custom',
          message: 'Suporte máximo para 3 imagens',
        });
        return;
      }

      for (let i = 0; i < fileList.length; i++) {
        converted.push((await getBase64(fileList[i])) as string);
      }
    }

    setValue(name, converted);
    setPreviewImages(converted);
  };

  return (
    <div>
      <p>Imagens do produto</p>
      {errors[name] && <Alert severity="error">{errors[name].message}</Alert>}
      <label htmlFor="images">
        <input
          {...register(name)}
          defaultValue={[]}
          accept=".jpg, .jpeg, .png"
          onChange={handleShowSelectedImages}
          type="file"
          name="images"
          id="images"
          multiple
          hidden
        />

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>

        {previewImages && (
          <ImageList
            sx={{ maxWidth: 500, height: 'auto' }}
            cols={3}
            rowHeight={164}
          >
            {previewImages.map((item: string) => (
              <ImageListItem key={item}>
                <img src={item} alt={item} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </label>
    </div>
  );
}
