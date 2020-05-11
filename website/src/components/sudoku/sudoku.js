import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {newSudoku, resoslveGrid, newGridLabObj, newLab, play, selectObj} from "../../services/actions";
import {connect} from "react-redux";
import {kotlinProxy} from "../../util";
import game from 'game'
import map from 'lodash/map';

import styles from "../grid/styles";
import {GridComponent} from "../grid";

const sudokuSize = [{width: 2, height: 2}, {width: 2, height: 3}, {width: 3, height: 3}, {width: 1, height: 4}];
const sudokuDifficulty = {veryEasy: 2, easy: 3, standard: 4, hard: 5}

let sudokuService = kotlinProxy(game.fr.perso.sudoku.service, true, false);

export class SudokuApp extends GridComponent {
    constructor(props) {
        super(props);
        this.state = {selectedSize: 1, selectedDifficulty: "veryEasy"}
    }

    resolveGrid() {
        if (this.state.currentPartie) {
            let resolvedGrid = sudokuService.resolveGrid(this.state.currentPartie);
            this.setState({...this.state, currentPartie: resolvedGrid});
            return resolvedGrid
        }

    };

    newGrid() {
        let newHeight = sudokuSize[this.state.selectedSize].height;
        let newWidth = sudokuSize[this.state.selectedSize].width;
        let remaingingCase = newWidth * newHeight * newWidth * newHeight / sudokuDifficulty[this.state.selectedDifficulty];
        console.log("should have " + remaingingCase + " given case")
        let currentPartie = sudokuService.generateCleanedGrid(newWidth, newHeight, remaingingCase);
        this.setState({currentPartie});
        return currentPartie
    };

    styleCell(cell, x, y) {
        return {
           ...super.styleCell(),
            borderLeftStyle: ((x % this.state.currentPartie.height === 0) ? "solid" : "none"),
            borderTopStyle: ((y % this.state.currentPartie.width === 0) ? "solid" : "none"),
            borderRightStyle: ((x === this.state.currentPartie.height * this.state.currentPartie.width - 1) ? "solid" : "none"),
            borderBottomStyle: ((y === this.state.currentPartie.height * this.state.currentPartie.width - 1) ? "solid" : "none")
        };
    }

    renderCommand() {
        return <div>
            size:<select value={this.state.selectedSize}
                         onChange={(e) => this.setState({...this.state, selectedSize: e.target.value})}
        >{map(sudokuSize, (data, id) => {
            return <option value={id}>{data.width * data.height}({data.width}:{data.height})</option>

        })}</select>
            difficulty:<select value={this.state.selectedDifficulty}
                               onChange={(e) => this.setState({...this.state, selectedDifficulty: e.target.value})}

        >
            {map(sudokuDifficulty, (difficulty, name) => <option value={name}>{name}</option>)}

        </select>
        </div>

    }

    render() {

        return <div key="sudoku"> welcome To the sudoku !
            {super.render()}
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            newPartie: newSudoku,
            resolveGrid,
            selectObj
        }, dispatch)
    }
};

function mapStateToProps(state, ownProps) {
    console.log("mapStateToProps")
    console.log(state)
    return {
        ...ownProps,
        currentPartie: state.currentSudokuPartie
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SudokuApp)

