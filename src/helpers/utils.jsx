// Returns an array of stars based on the given rating value
export const getRatingArray = (rating) => {
  return Array(Math.ceil(rating)).fill(0);
};
