import {
  InfoCircledIcon,
  DesktopIcon,
  GearIcon,
  BackpackIcon,
} from '@radix-ui/react-icons';

export const ProfileTabsList = [
  {
    link: '/profile/settings-profile/general-information',
    name: 'GeneralInformationTab.titleTab',
    icon: InfoCircledIcon,
  },
  {
    link: '/profile/settings-profile/devices',
    name: 'DevicesTab.titleTab',
    icon: DesktopIcon,
  },
  {
    link: '/profile/settings-profile/account-management',
    name: 'AccountManagementTab.titleTab',
    icon: GearIcon,
  },
  {
    link: '/profile/settings-profile/my-payments',
    name: 'MyPaymentsTab.titleTab',
    icon: BackpackIcon,
  },
];
