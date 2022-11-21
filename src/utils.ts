export const makeImagePath = (id: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
};

export const scrollToTop = () => window.scrollTo(0, 0);
