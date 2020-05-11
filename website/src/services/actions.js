import {kotlinProxy} from "../util";
import game from 'game';

export const ACTION_TYPES = {UPDATE_STATE_TYPE: 'UPDATE_STATE', SELECT_OBJECT: 'SELECT_OBJECT'}

export function updateStateAction(statePath, data) {
    return {
        type: ACTION_TYPES.UPDATE_STATE_TYPE,
        payload: {statePath, data}
    }
}

export function newSudoku(size) {
    const newPartie = sudoku.initPartie(size);
    return updateStateAction('currentSudokuPartie', newPartie)
}
export function resoslveGrid(grid) {
    const newPartie = game.fr.perso.sudoku.initPartie(size);
    return updateStateAction('currentSudokuPartie', newPartie)
}

export function selectObj(obj) {
    return updateStateAction('currentPartie.player.selected', obj)
}
