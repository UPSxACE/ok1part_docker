import Form from './form';
import Control from './control';
import HelperText from './helper-text';
import Input from './input';
import Submit from './submit';
import ColorPicker from './color-picker';
import ImageUploader from './image-uploader';

const { FormGroup, InputLabel, Typography } = require('@mui/material');

const Header = ({ children }) => <>{children}</>;
const Footer = ({ children }) => <>{children}</>;

const Group = ({ children }) => <FormGroup>{children}</FormGroup>;

const Label = ({ field, label, required, children }) => (
  <InputLabel color='info' htmlFor={field}>
    {required ? label + ' *' : label}
  </InputLabel>
);

const Text = ({ label, formDataState, field, children }) => {
  return (
    <Typography variant='body1' component='span' sx={{ mb: 1 }}>
      {children}
    </Typography>
  );
};

const SectionHeader = ({ title, children }) => (
  <Typography
    variant='h4'
    component={'h1'}
    sx={{ mb: 2 }}
    color='text.secondary'
  >
    {title}
  </Typography>
);

const OutlinedForm = {
  Form,
  Control,
  Group,
  Label,
  Input,
  HelperText,
  Submit,
  ColorPicker,
  ImageUploader,
  Header,
  Footer,
  Text,
  SectionHeader,
};

export default OutlinedForm;
