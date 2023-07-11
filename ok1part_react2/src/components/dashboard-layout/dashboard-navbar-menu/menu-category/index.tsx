import { useState } from 'react';
import { IDashboardNavMenuState } from '..';
import Control, { IControlProps } from './control';
import Group from './group';
import Item from './item';

export function useMenuCategory(state: IDashboardNavMenuState) {
  const { open, setOpen } = state;
  const [qrCodeZoom, setQrCodeZoom] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((open: boolean) => !open);
  };

  const controlProps: IControlProps = {
    state,
    handleDrawerToggle,
  };

  const itemProps = {
    open,
  };

  return {
    qrCodeZoom,
    setQrCodeZoom,
    handleDrawerToggle,
    controlProps,
    itemProps,
  };
}

const MenuCategory = {
  Control,
  Group,
  Item,
};

export default MenuCategory;
