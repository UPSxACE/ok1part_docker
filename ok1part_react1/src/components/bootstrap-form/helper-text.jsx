import { useEffect } from 'react';
import { FormHelperText } from '@mui/material';
import { useTranslation } from 'next-i18next';

const HelperText = ({ field, formDataState, children }) => {
  const { formData, setFormData } = formDataState;
  const { t } = useTranslation();

  if (formData[field])
    if (formData[field]['error']) {
      return (
        <FormHelperText sx={{ mx: 0 }} id={'helper-' + field}>
          {Object.prototype.toString.call(
            formData[field]['error']['message']
          ) === '[object Array]'
            ? t(
                formData[field]['error']['message'][0],
                formData[field]['error']['message'][1]
              )
            : t(formData[field]['error']['message'])}
        </FormHelperText>
      );
    }
};

export default HelperText;
