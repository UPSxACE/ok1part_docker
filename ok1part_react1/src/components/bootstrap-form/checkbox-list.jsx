import objectGetter from '@/utils/object-getter';
import { InfoOutlined } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import LoaderPrimary from '../loader-primary';

const CheckboxList = ({
  JOIValidator,
  field,
  label,
  formDataState,
  tooltip = {},
  inputProps,
  required = false,
  readOnly = false,
  options = [],
  nestedProperty,
  initialized = true,
  orderData = false,
  title,
}) => {
  const { formData, setFormData } = formDataState;
  const { t } = useTranslation();
  const [checkboxValues, setCheckboxValues] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const getOptions = useMemo(() => {
    let options_array = options;
    if (nestedProperty) {
      const propertyArray = nestedProperty.split('.');
      options_array = options.map((option, index) => {
        const optionName = objectGetter(option, ...propertyArray);
        return optionName;
      });
    }

    if (orderData) {
      options_array.sort();
    }

    const result = options_array.map((option, index) => {
      if (option !== null && option !== undefined) return option;
    });

    return result;
  }, [options, nestedProperty, orderData]);

  useEffect(() => {
    if (formData[field] && formData[field]['matches']) {
    }
    if (formData[field] && formData[field]['matchesPassword']) {
      if (!formData[field]['error']) {
        // If formData was updated, and it didn't have an error, re-check it
        if (
          !(
            formData[field]['value'] ===
            formData[formData[field].matchesPassword]['value']
          )
        ) {
          const obj = { ...formData };
          obj[field].error = {
            type: 'does_not_match_password',
            message: 'does_not_match_password',
            context: {
              field1: field,
              field2: obj[field].matchesPassword,
            },
          };
          setFormData(obj);
        }
      } else {
        if (
          formData[field]['value'] ===
            formData[formData[field].matchesPassword]['value'] &&
          formData[field]['error']['type'] === 'does_not_match_password'
        ) {
          const obj = { ...formData };
          delete obj[field]['error'];
          setFormData(obj);
        }
      }
    }
  }, [formData]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
        }}
      >
        <List>
          <ListItem sx={{ bgcolor: '#f0f0f0' }} disablePadding>
            <ListItemButton
              disableRipple
              sx={{
                borderBottom: '1px solid #0000001f',
                cursor: 'default',
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant='body1'
                      component={'h2'}
                      sx={{ fontSize: '1.1rem' }}
                    >
                      {t(title)}
                    </Typography>
                    <Tooltip
                      placement='right'
                      title={
                        <p>
                          {title && t(title)}
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
                      <InfoOutlined
                        sx={{
                          color: 'primary.components3',
                          cursor: 'pointer',
                          ml: 1,
                        }}
                      />
                    </Tooltip>
                  </Box>
                }
              />

              <ListItemIcon
                sx={{
                  minWidth: '0',
                }}
              >
                <Checkbox
                  disabled={options === null}
                  checked={selectAll}
                  onChange={(event) => {
                    const newValue = event.target.checked;
                    const newFormData = { ...formData };
                    if (newValue) {
                      getOptions.forEach((option) => {
                        if (
                          Object.prototype.toString.call(
                            newFormData[field].value !== '[object Object]'
                          )
                        ) {
                          newFormData[field].value = {};
                        }
                        newFormData[field].value[option] = true;
                      });

                      setFormData(newFormData);
                      setSelectAll(true);
                    } else {
                      newFormData[field].value = {};
                      setFormData(newFormData);
                      setSelectAll(false);
                    }
                  }}
                />
                {/* 
              <AddCircleOutline
                sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                color='success'
                onClick={() => {
                  handleOpen();
                }}
              />*/}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {options === null && (
            <ListItem
              sx={{ display: 'flex', justifyContent: 'center' }}
              disablePadding
            >
              <ListItemButton
                sx={{
                  borderBottom: '1px solid #0000001f',
                  cursor: 'default',
                  display: 'flex',
                  justifyContent: 'center',
                  paddingY: 1,
                }}
              >
                <LoaderPrimary size={30} />
              </ListItemButton>
            </ListItem>
          )}
          {options !== null &&
            getOptions.map((permission, index) => {
              return (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    minWidth: '0',
                    cursor: 'default!important',
                  }}
                >
                  <ListItemButton
                    //disableGutters
                    disableTouchRipple
                    disableRipple
                    sx={{
                      borderBottom: '1px solid #0000001f',
                      cursor: 'default!important',
                      '& .MuiListItemIcon-root': {
                        minWidth: 0,
                      },
                    }}
                  >
                    <ListItemText
                      sx={{
                        '& .MuiButtonBase-root': { padding: 0 },
                        '& .MuiTouchRipple-root': {
                          display: 'none',
                        },
                        '& .MuiButtonBase-root:hover': {
                          backgroundColor: 'transparent',
                          cursor: 'default!important',
                        },
                      }}
                      primary={t(permission)}
                    />
                    <ListItemIcon>
                      <Checkbox
                        checked={formData[field].value?.[permission] || false}
                        onChange={(event) => {
                          const newValue = event.target.checked;
                          if (newValue) {
                            const newFormData = { ...formData };
                            newFormData[field].value = newFormData[field].value
                              ? {
                                  ...formData[field].value,
                                  [permission]: newValue,
                                }
                              : { [permission]: newValue };

                            setFormData({
                              ...formData,
                              ...newFormData,
                            });
                          } else {
                            const newFormData = { ...formData };

                            if (newFormData[field].value?.[permission]) {
                              delete newFormData[field].value[permission];
                              setCheckboxValues(newFormData);
                            }
                            setSelectAll(false);
                          }
                        }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </Box>
    </Box>
  );
};

export default CheckboxList;
