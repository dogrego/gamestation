import { state, AllowedKeys, PlayerStates, GameStages } from '../state.js';

export function handleKeyDown(event) {
  if (state.game_stage === GameStages.WAIT_TO_START) {
    return;
  }
  console.log(state.game_stage);
  if (!Object.values(AllowedKeys).includes(event.keyCode)) {
    return;
  }
  if (
    event.keyCode === AllowedKeys.KEY_CODE_A ||
    event.keyCode === AllowedKeys.KEY_CODE_LEFT
  ) {
    state.playerMove = PlayerStates.MOVE_LEFT;
  } else if (
    event.keyCode === AllowedKeys.KEY_CODE_D ||
    event.keyCode === AllowedKeys.KEY_CODE_RIGHT
  ) {
    state.playerMove = PlayerStates.MOVE_RIGHT;
  } else if (event.keyCode === AllowedKeys.KEY_CODE_SPACE) {
    state.isShooting = true;
  }
}
