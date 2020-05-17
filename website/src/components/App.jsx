import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {SudokuApp} from './sudoku/sudoku.js'
import {SkyscraperApp} from "./skyscraper";

class App extends Component {
    constructor() {
        super();
        this.state = {
            mowers: null
        };
    }


    componentDidMount() {

    }

    render() {
console.log("process.env.PUBLIC_URL")
console.log(window.location.pathname)

        return (<div> myapp
                <Router>
                    <ul>
                        <li>

                            <Link to="/">Home</Link></li>
                        <li><Link to="./sudoku">sudoku</Link></li>
                        <li><Link to="./skyscraper">skyscraper</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path={`${window.location.pathname}`}
                               render={() => "welcome in the home"}
                        ></Route>
                        <Route exact path={`${window.location.pathname}home`}
                               render={() => "welcome in the home"}
                        ></Route>

                        <Route exact path={`${window.location.pathname}sudoku`}
                               render={() => <SudokuApp key={"rr"}/>}
                        ></Route>

                        <Route exact path={`${window.location.pathname}skyscraper`}
                               render={() => <SkyscraperApp/>}
                        ></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
