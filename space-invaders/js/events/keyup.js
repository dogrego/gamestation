import { state, AllowedKeys, PlayerStates, GameStages } from '../state.js';

export function handleKeyUp(event) {
  if (state.game_stage === GameStages.WAIT_TO_START) {
    return;
  }
  if (!Object.values(AllowedKeys).includes(event.keyCode)) {
    return;
  }
  if (
    (state.playerMove === PlayerStates.MOVE_LEFT &&
      (event.keyCode === AllowedKeys.KEY_CODE_A ||
        event.keyCode === AllowedKeys.KEY_CODE_LEFT)) ||
    (state.playerMove === PlayerStates.MOVE_RIGHT &&
      (event.keyCode === AllowedKeys.KEY_CODE_D ||
        event.keyCode === AllowedKeys.KEY_CODE_RIGHT))
  ) {
    state.playerMove = PlayerStates.IDLE;
  } else if (state.isShooting && event.keyCode === AllowedKeys.KEY_CODE_SPACE) {
    state.isShooting = false;
  }
}
