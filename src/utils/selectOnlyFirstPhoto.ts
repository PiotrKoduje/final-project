import { WineSummary } from "src/wines/dtos/wine-summary.interface";

export const selectOnlyFirstPhoto = (wines: WineSummary[]): WineSummary[] => {
  const winesWithOnePhoto = wines.map(wine => ({
    ...wine,
    photos: wine.photos.split(',')[0].trim(),
  }));

  return winesWithOnePhoto
}