import { InfoOutlined } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import ImageNext from 'next/image';
import { styled } from '@mui/system';
import { useTranslation } from 'next-i18next';

// Full Height and Width NextJS Image
const LogoImage = styled(ImageNext)((props) => {
  return {
    height: 'auto',
    width: '80%',
  };
});

const ImageUploader = ({
  label,
  formDataState,
  defaultImage,
  field,
  tooltip,
  backgroundSwitcher,
  description,
}) => {
  const [image, setImage] = useState(defaultImage);
  const [file, setFile] = useState(null);
  const { formData, setFormData } = formDataState;
  const { t } = useTranslation();
  const [logoBackground, setLogoBackground] = useState('#ffffff');

  return (
    <>
      {label && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <Typography variant='h6' component='h2' sx={{ mr: 1 }}>
            {label}
          </Typography>
          <Tooltip
            placement='right'
            title={
              <p>
                {label && t(label)}
                {tooltip.tip && (
                  <>
                    <br />
                    <br />
                    {t(tooltip.tip)}
                  </>
                )}
                {tooltip.example && (
                  <>
                    <br />
                    <br />
                    {t('formExample') + ' ' + t(tooltip.example)}
                  </>
                )}
              </p>
            }
          >
            <Typography
              variant='h6'
              component='h2'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <InfoOutlined
                sx={{
                  color: 'primary.components3',
                  cursor: 'pointer',
                }}
              />
            </Typography>
          </Tooltip>
        </Box>
      )}
      {description && description}
      <Box
        sx={{
          display: 'flex',
          border: '1px solid #dadce0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '50%',
            height: 125,
            borderRight: '1px solid #dadce0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <label
            htmlFor='fileInput'
            style={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageNext
              alt='Image upload icon'
              id='icon'
              width={62}
              height={62}
              src={'/cloud_upload-24px.svg'}
              style={{ opacity: 0.4 }}
            />
          </label>
          <input
            style={{ display: 'none' }}
            id='fileInput'
            type='file'
            onChange={(e) => {
              const file = e.target.files[0];
              const img = new Image();
              const url = URL.createObjectURL(file);
              img.onload = function () {
                if (this.width > 500 || this.height > 500) {
                  const obj = { ...formData };
                  obj[field]['error'] = {
                    type: 'image_too_big',
                    message: ['image_too_big', { limitH: 500, limitW: 500 }],
                  };
                  setFormData(obj);
                } else {
                  if (formData[field]['error']) {
                    const obj = { ...formData };
                    delete obj[field]['error'];
                    setFormData(obj);
                  }
                  const obj = { ...formData };
                  obj[field]['value'] = file;
                  setFormData(obj);
                  setFile(file);
                }

                URL.revokeObjectURL(url);
              };
              img.src = url;
            }}
          />
        </Box>
        <Box
          sx={{
            width: '50%',
            height: 125,
            borderLeft: '1px solid #dadce0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: backgroundSwitcher ? 'pointer' : 'default',
            backgroundColor: logoBackground,
          }}
          onClick={() => {
            if (backgroundSwitcher)
              logoBackground !== '#ffffff'
                ? setLogoBackground('#ffffff')
                : setLogoBackground('#444444');
          }}
        >
          <LogoImage
            width={500}
            height='0'
            alt='Your website logo'
            src={file ? URL.createObjectURL(file) : '/logo.png'}
          />
        </Box>
      </Box>
    </>
  );
};

export default ImageUploader;
