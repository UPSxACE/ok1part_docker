import ButtonDashboard from '../button-dashboard';
import { useTranslation } from 'next-i18next';

export default function Submit({
  sx = {},
  formId,
  disabled = false,
  title,
}: {
  sx?: any;
  formId?: string;
  disabled?: boolean;
  title?: string;
}) {
  const { t } = useTranslation();

  return (
    <ButtonDashboard
      sx={{ width: 'min-content', marginTop: 1.5, ...sx }}
      variant='contained'
      type='submit'
      form={formId || 'ok1part-form'}
      disabled={disabled}
    >
      {title ? title : t('common:generic_submit_button')}
    </ButtonDashboard>
  );
}
