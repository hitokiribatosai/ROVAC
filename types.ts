
import React from 'react';

export type Language = 'EN' | 'FR' | 'AR';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: Record<Language, string>;
  image: string;
}

export interface NavItem {
  label: Record<Language, string>;
  href: string;
}
