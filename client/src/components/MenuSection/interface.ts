import { Icon } from '@phosphor-icons/react';

export interface MenuSectionProps {
  sectionTitle: string;
  sectionIcon: React.ReactNode;
  children: React.ReactNode;
  navigateTo: string;
  isSectionExtended: boolean;
}
