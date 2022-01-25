// as an enum - pow od 2 - like bits
export const FieldState = {
  REVEALED: 1,
  UNREVEALED: 2,
  FLAGGED: 4
}

export class Field {
  inMine = false;
  isBlownUp = false;
  state = FieldState.UNREVEALED;
  neighborCount = 0;
}