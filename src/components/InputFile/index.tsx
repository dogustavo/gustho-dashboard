import React, { InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { IconButton, ImageList, ImageListItem, Alert } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

import { getBase64 } from '@/utils';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export default function Input({ name, label }: IInput) {
  const [previewImages, setPreviewImages] = useState<string[]>();
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const handleShowSelectedImages = async (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = evt.target.files;
    let converted: string[] = [];

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        converted.push((await getBase64(fileList[i])) as string);
      }
    }

    setValue(name, converted);
    setPreviewImages(converted);
  };

  return (
    <div>
      <p>{label}</p>
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
      </label>

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
    </div>
  );
}
