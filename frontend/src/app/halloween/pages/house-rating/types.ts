export type RatingRange = 0 | 1 | 2 | 3 | 4;

export type HouseRatingEntry = {
  address: string;
  qualityRating: RatingRange;
  quantityRating: RatingRange;
  hasAmbiance: boolean;
  hasFullSizeCandy: boolean;
};
