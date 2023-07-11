import { Box } from '@mui/material';
import ColoredBox from '../colored-box';
import appConfig from '@/app-config';
import Image from 'next/image';
import MenuCategory from './menu-category';
import { Home } from '@mui/icons-material';
import {
  faGear,
  faHouse,
  faReceipt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import useClientSide from '@/hooks/client-side';

export default function DashboardNavbarMenu({ state }) {
  const { open, setOpen } = state;
  const [qrCodeZoom, setQrCodeZoom] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen((open) => !open);
  };

  const { serverIsDone } = useClientSide();

  return (
    <Box>
      <MenuCategory.Control
        state={{ open, setOpen }}
        handleDrawerToggle={handleDrawerToggle}
      >
        {serverIsDone && (
          <MenuCategory.Group title='Group Example'>
            <MenuCategory.Item
              faIcon={faHouse}
              route='/dashboard'
              title='Home'
              permissionNeeded={32}
            />
            <MenuCategory.Item
              faIcon={faUsers}
              route='/dashboard/users'
              title='Users'
              permissionNeeded={32}
            />
            <MenuCategory.Item
              faIcon={faReceipt}
              route='/dashboard/invoicing'
              title='Invoicing'
              permissionNeeded={32}
            />
            <MenuCategory.Item
              faIcon={faGear}
              route='/dashboard/settings'
              title='Settings'
              permissionNeeded={32}
            />
          </MenuCategory.Group>
        )}
        {/*
        <MenuCategory.Group title='Group Example'>
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
        </MenuCategory.Group>
        <MenuCategory.Group title='Group Example'>
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
          <MenuCategory.Item faIcon={faHouse} title='Item Example' />
        </MenuCategory.Group>*/}
        <MenuCategory.Footer
          style={{
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
        </MenuCategory.Footer>
      </MenuCategory.Control>
    </Box>
  );
}
