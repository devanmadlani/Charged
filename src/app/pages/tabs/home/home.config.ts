import { Brain02Icon, SquareLock02Icon } from '@hugeicons/core-free-icons';
import { ScanCardListItemData } from '@shared';

export interface ComingSoonItem {
  title: string;
  description: string;
  icon: any;
  lockIcon: any;
}

export const HOME_SCAN_CARDS: ScanCardListItemData[] = [
  {
    progress: 79,
    title: 'HOME_PAGE.SCAN_CARDS.SELF_SCAN.TITLE',
    description: 'HOME_PAGE.SCAN_CARDS.SELF_SCAN.DESCRIPTION',
    date: '12 June 2025',
    dateLabel: 'HOME_PAGE.SCAN_CARDS.SELF_SCAN.DATE_LABEL',
    icon: Brain02Icon,
    url: '/self-scan',
  },
  {
    progress: 64,
    title: 'HOME_PAGE.SCAN_CARDS.HEALTH_SCAN.TITLE',
    description: 'HOME_PAGE.SCAN_CARDS.HEALTH_SCAN.DESCRIPTION',
    date: '12 June 2025',
    dateLabel: 'HOME_PAGE.SCAN_CARDS.HEALTH_SCAN.DATE_LABEL',
    icon: Brain02Icon,
    url: '/health-scan',
    disabled: false,
  },
];

export const COMING_SOON_ITEMS: ComingSoonItem[] = [
  {
    title: 'HOME_PAGE.COMING_SOON.BLOOD.TITLE',
    description: 'HOME_PAGE.COMING_SOON.BLOOD.DESCRIPTION',
    icon: Brain02Icon,
    lockIcon: SquareLock02Icon,
  },
  {
    title: 'HOME_PAGE.COMING_SOON.DNA.TITLE',
    description: 'HOME_PAGE.COMING_SOON.DNA.DESCRIPTION',
    icon: Brain02Icon,
    lockIcon: SquareLock02Icon,
  },
  {
    title: 'HOME_PAGE.COMING_SOON.SLEEP.TITLE',
    description: 'HOME_PAGE.COMING_SOON.SLEEP.DESCRIPTION',
    icon: Brain02Icon,
    lockIcon: SquareLock02Icon,
  },
];
