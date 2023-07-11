import Form from './form';
import Control from './control';
import HelperText from './helper-text';
import Input from './input';
import Submit from './submit';
import ColorPicker from './color-picker';
import ImageUploader from './image-uploader';
import { Box, FormGroup, InputLabel, Typography } from '@mui/material';
import TwoHalfs from './two-halfs';
import BootstrapFillInput from './bootstrap-fill-input';
import Select from './select';
import CheckboxList from './checkbox-list';
import Autocomplete from './autocomplete';
import AutocompleteCheckbox from './autocompletecheckbox';

const Header = ({ children }) => <>{children}</>;
const Footer = ({ children }) => <>{children}</>;

const Group = ({ children }) => <FormGroup>{children}</FormGroup>;

const Label = ({ field, label, required, children }) => (
  <InputLabel
    shrink
    color='info'
    htmlFor={field}
    sx={{
      '&': {
        position: 'initial',
        transform: 'none',
      },
    }}
  >
    {required ? label + ' *' : label}
  </InputLabel>
);

const Text = ({ label, formDataState, field, containerStyle, children }) => {
  return (
    <Box sx={{ ...containerStyle }}>
      <Typography variant='body1' component='span' sx={{ mb: 1 }}>
        {children}
      </Typography>
    </Box>
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

const BootstrapForm = {
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
  TwoHalfs,
  BootstrapFillInput,
  Select,
  CheckboxList,
  Autocomplete,
  AutocompleteCheckbox,
};

export default BootstrapForm;
