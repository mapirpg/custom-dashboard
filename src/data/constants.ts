const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;

export const MAIN_LAYOUT_DRAWER_WIDTH = 240;
export const MAIN_LAYOUT_HEADER_HEIGHT = isSmallScreen ? 6 : 9;
export const MAIN_LAYOUT_HEIGHT = (isSmallScreen ? 98 : 96) - MAIN_LAYOUT_HEADER_HEIGHT;

const RPP = {
  '5': 5,
  '10': 10,
  '25': 25,
  '50': 50,
  '100': 100,
} as const;

export type PerPageVelueProps = (typeof RPP)[keyof typeof RPP];
export const ROWS_PER_PAGE = Object.values(RPP) as readonly number[];
export const ROWS_PER_PAGE_OPTIONS = ROWS_PER_PAGE;
