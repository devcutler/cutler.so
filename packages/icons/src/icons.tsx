import React from 'react';
import { Icon } from './Icon';
import { IconProps } from './types';

import vscodeSvg from '@libs/devicons/icons/vscode/vscode-original.svg';
import dockerSvg from '@libs/devicons/icons/docker/docker-original.svg';
import typescriptSvg from '@libs/devicons/icons/typescript/typescript-original.svg';
import pythonSvg from '@libs/devicons/icons/python/python-original.svg';
import reactSvg from '@libs/devicons/icons/react/react-original.svg';
import viteSvg from '@libs/devicons/icons/vitejs/vitejs-original.svg';
import vikePng from '../../../assets/vike.png';

export const VSCode: React.FC<IconProps> = ({ size = 24, className }) => (
  <Icon src={vscodeSvg} alt="VSCode" size={size} className={className} />
);

export const Docker: React.FC<IconProps> = ({ size = 24, className }) => (
  <Icon src={dockerSvg} alt="Docker" size={size} className={className} />
);

export const TypeScript: React.FC<IconProps> = ({ size = 24, className }) => (
  <Icon src={typescriptSvg} alt="TypeScript" size={size} className={className} />
);

export const Python: React.FC<IconProps> = ({ size = 24, className }) => (
  <Icon src={pythonSvg} alt="Python" size={size} className={className} />
);

export const ReactJS: React.FC<IconProps> = ({ size = 24, className }) => (
  <Icon src={reactSvg} alt="React" size={size} className={className} />
);

export const Vite: React.FC<IconProps> = ({ size = 24, className }) => (
  <Icon src={viteSvg} alt="Vite" size={size} className={className} />
);

export const Vike: React.FC<IconProps> = ({ size = 24, className }) => (
  <Icon src={vikePng} alt="Vike" size={size} className={className} />
);