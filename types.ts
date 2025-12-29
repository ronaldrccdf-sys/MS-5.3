import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface PracticeArea {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TeamMember {
  name: string;
  role: string;
  oab: string;
  specialties: string[];
  image: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
}