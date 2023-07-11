import Box from '@mui/material/Box';
import MenuCategory, { useMenuCategory } from './menu-category';
import {
  faPenRuler,
  faFileContract,
  faFolderOpen,
  faHome,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthenticationContext } from '@/contexts/authentication-context';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import { useTranslation } from 'next-i18next';

interface IDashboardNavbarMenuProps {
  state: IDashboardNavMenuState;
}

export default function DashboardNavbarMenu({
  state,
}: IDashboardNavbarMenuProps) {
  const { t } = useTranslation();

  const { open, setOpen } = state;
  const {
    qrCodeZoom,
    setQrCodeZoom,
    handleDrawerToggle,
    controlProps,
    itemProps,
  } = useMenuCategory(state);

  const authContext = useContext(AuthenticationContext);

  const formsPermission =
    (authContext?.value?.permissions && authContext.value.permissions & 2) ||
    null;
  const approvationPermission =
    (authContext?.value?.permissions && authContext.value.permissions & 4) ||
    null;
  const managementPermission =
    (authContext?.value?.permissions && authContext.value.permissions & 8) ||
    null;

  return (
    <Box sx={{ position: 'sticky', top: 0, height: '100vh' }}>
      <MenuCategory.Control {...controlProps}>
        <MenuCategory.Group title='Group 1'>
          <MenuCategory.Item
            title={t('common:item_home')}
            route='/'
            faIcon={faHome}
            {...itemProps}
          />
          <MenuCategory.Item
            title={t('common:item_forms')}
            route='/forms'
            faIcon={faFileContract}
            {...itemProps}
          />
          {formsPermission && (
            <MenuCategory.Item
              title={t('common:item_manageforms')}
              route='/manage-forms'
              faIcon={faPenRuler}
              {...itemProps}
            />
          )}

          {(formsPermission ||
            approvationPermission ||
            managementPermission) && (
            <MenuCategory.Item
              title={t('common:item_viewanswer')}
              route='/answers'
              faIcon={faFolderOpen}
              {...itemProps}
            />
          )}
          {managementPermission && (
            <MenuCategory.Item
              title={t('common:item_settings')}
              route='/settings'
              faIcon={faGear}
              {...itemProps}
            />
          )}
        </MenuCategory.Group>
        <Box
          sx={{
            width: '100%',
            marginTop: 'auto',
          }}
        >
          <Box
            sx={{
              maxWidth: 150,
              '& img': { position: 'relative!important', padding: 1 },
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            onClick={() => {
              setQrCodeZoom(true);
            }}
          >
            <div
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              <Image
                src={'/qr-code.png'}
                fill
                style={{
                  objectFit: 'contain',
                }}
                alt='Techwelf Qrcode'
                sizes='(max-width: 600px) 100vw,
            (max-width: 900px) 33vw,
            (max-width: 1200px) 22vw,
            (max-width: 1536px) 17vw,
            (mix-width: 1536px) 14vw,
          100vw'
              />
            </div>
            <Lightbox
              open={qrCodeZoom}
              close={() => {
                setQrCodeZoom(false);
              }}
              slides={[{ src: '/qr-code.png', width: 1000, height: 1000 }]}
              controller={{ closeOnBackdropClick: true }}
              styles={{ container: { backgroundColor: '#000000ba' } }}
            />
          </Box>
        </Box>
      </MenuCategory.Control>
    </Box>
  );
}

export interface IDashboardNavMenuState {
  open: boolean;
  setOpen: React.Dispatch<any>;
}
