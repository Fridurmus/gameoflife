import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    }

    render() {
        return(
            <div 
                className={this.props.boxClass} 
                id={this.props.id}
                onClick={this.selectBox}
            />
        );
    }
}

class Grid extends React.Component {
    render() {
        const width = (this.props.cols * 16);
        
        let rowsArray = [];

        let boxClass = "";

        for (let i = 0; i < this.props.rows; i++){
            for (let j = 0; j < this.props.cols; j++){
                let boxId = i + "_" + j;
                boxClass = this.props.gridFull[i][j] ? "box on" : "box off";

                rowsArray.push(
                    <Box
                        boxClass = {boxClass}
                        key = {boxId}
                        boxId = {boxId}
                        row = {i}
                        col = {j}
                        selectBox = {this.props.selectBox}
                    />
                )
            }
        }
        return(
            <div className="grid" style={{width: width}}>
                {rowsArray}
            </div>
        )
    }
}

class Main extends React.Component {

    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
        }
    }

    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({
            gridFull: gridCopy
        })
    }

    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                if (Math.floor(Math.random() * 4) === 1){
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({
            gridFull: gridCopy
        })
    }

    componentDidMount() {
        this.seed();
    }

    render() {
        return (
            <div>
                <h1>Conway's Game of Life</h1>
                <Grid 
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h2>Generation Count: {this.state.generation}</h2>
            </div>
        );
    }
}

function arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));