const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;

export const MAIN_LAYOUT_DRAWER_WIDTH = 240;
export const MAIN_LAYOUT_HEADER_HEIGHT = isSmallScreen ? 6 : 9;
export const MAIN_LAYOUT_HEIGHT = (isSmallScreen ? 98 : 96) - MAIN_LAYOUT_HEADER_HEIGHT;
export const ROWS_PER_PAGE = [5, 10, 25, 50, 100];
