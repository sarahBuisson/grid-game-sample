import React, {Component} from "react";
import CellComponent from "./cell";
import {kotlinProxy} from "../../util";
import PropTypes from 'prop-types';
import map from 'lodash/map';

import styles from "./styles";

export class GridComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {currentPartie: undefined}
        if (this.newGrid == undefined)
            throw "newGrid should be implemented"
        if (this.resolveGrid == undefined)
            throw "resolveGrid should be implemented"
        this.state = {}
    }


    renderPartie(currentPartie) {
        console.log(currentPartie)
        let partieJs = kotlinProxy(currentPartie);

        return map(partieJs.gridArray, (row, y) => {
            return <div>{this.renderRow(row, y)}</div>
        });
    }


    render() {

        return <div>
            {this.renderCommand ? this.renderCommand() : ""}
            <button onClick={() => this.newGrid()}>newGrid</button>
            {this.state.currentPartie ?
                <button onClick={() => this.resolveGrid()}>resolve</button> : ""}
            <div style={styles.gridContainer}>
                {this.state.currentPartie ? this.renderPartie(this.state.currentPartie) : "no partie"}
            </div>
        </div>

    }

    styleCell(cell, x, y) {
        return {...styles.gridCase,}
    }

    renderCell(cell, x, y) {
        console.log("cell")
        console.log(cell)
        console.log(cell.possiblesArray)
        return <div style={this.styleCell(cell, x, y)} key={"cell" + x + "-" + y}>
            <CellComponent value={cell.value} initialValue={cell.value} possibilites={cell.possiblesArray}/></div>
    }


    renderInstructionCell(value, x, y) {
        return <div style={this.styleCell({}, x, y)} key={"Instructioncell" + x + "-" + y}>
            <CellComponent initialValue={value}/></div>
    }

    toCellComponents(row, y) {
        console.log("toCellComponents")
        console.log(row)
        return map(row, (cell, x) => {
            return this.renderCell(cell, x, y)
        });
    }

    renderRow(row, y) {
        return <div
            style={styles.gridRowContainer}>
            {this.toCellComponents(row, y)}
        </div>
    }
}
