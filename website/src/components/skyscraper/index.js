import React, {Component} from "react";


import game from 'game'
import {kotlinProxy} from "../../util";
import {GridComponent} from "../grid";

import map from 'lodash/map';
import styles from "../grid/styles";

export class SkyscraperApp extends GridComponent {


    constructor() {
        super();
        this.props = {}
        this.state = {}
        this.state.currentPartie = kotlinProxy(game.fr.perso.skyscraper).generateEmptyGrid(4)

    }

    resolveGrid() {
        if (this.state.currentPartie)
            this.setState({currentPartie: kotlinProxy(game.fr.perso.skyscraper).resolveGrid(this.state.currentPartie)})

    };

    newGrid() {
        this.setState({currentPartie: kotlinProxy(game.fr.perso.skyscraper).generateEmptyGrid(5)})

    };

    renderPartie(currentPartie) {
        return <div>
            <div
                style={styles.gridRowContainer}>

                {super.renderInstructionCell("X", -1, -1)}
                {map(currentPartie.column1Array, (c) => super.renderInstructionCell(c.view))}
                {super.renderInstructionCell("X", -1, -1)}
            </div>

            {map(currentPartie.gridArray, (row, y) => this.renderRow(row, y))}
            <div
                style={styles.gridRowContainer}>
                {super.renderInstructionCell("X", -1, -1)}
                {map(currentPartie.column2Array, (c) => super.renderInstructionCell(c.view))}
                {super.renderInstructionCell("X", -1, -1)}
            </div>
        </div>;
    }

    renderRow(row, y) {
        return <div
            style={styles.gridRowContainer}>
            {super.renderInstructionCell(this.state.currentPartie.row1Array[y].view)}
            {super.toCellComponents(row, y)}
            {super.renderInstructionCell(this.state.currentPartie.row2Array[y].view)}
        </div>;
    }

    render() {

        return <div key="sudoku"> welcome To the skyscraper !
            {super.render()}
        </div>
    }
}
