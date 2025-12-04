/// <reference types="react-scripts" />

declare module 'aelf-sdk';
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default ReactComponent;
}

declare module '*.png' {
  const content: React.FunctionComponent<React.ImgHTMLAttributes>;

  export default content;
}
