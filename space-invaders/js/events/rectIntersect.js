export function rectIntersect(rectLower, rectUpper) {
  return !(
    rectUpper.positionY + rectUpper.height / 2 <
      rectLower.positionY - rectLower.height / 2 ||
    rectUpper.positionY - rectUpper.height / 2 >
      rectLower.positionY + rectLower.height / 2 ||
    rectUpper.positionX + rectUpper.width / 2 <
      rectLower.positionX - rectLower.width / 2 ||
    rectUpper.positionX - rectUpper.width / 2 >
      rectLower.positionX + rectLower.width / 2
  );
}
