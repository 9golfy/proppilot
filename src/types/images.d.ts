declare module '*.png' {
  const src: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };

  export default src;
}

declare module '*.gif' {
  const src: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };

  export default src;
}
