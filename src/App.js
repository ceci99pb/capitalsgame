import React, { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Question = (props) => {

    const images = require.context('./assets', true);
    let image = images('./' + props.item.flag);

    return(
        <form>   
            <div className="form-group card customCard">
                <div className="card-body">
                    <img className="card-img-top img-fluid" src={image} alt="logo"/>
                    <label className="card-text">What is the capital city of {props.item.countryName}?</label>
                    <input autoComplete="off" onChange={props.handleChange} id="answer" type="text" className="form-control" placeholder="Enter answer..."/>
                    <div className="d-flex justify-content-around p-2">                    
                        <button className="btn btn-primary" onClick={props.handleClick}>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

const Continent = (props) =>{
    return (
        <div className="dropdown d-flex justify-content-center p-3">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownContinent" data-toggle="dropdown">
                Select Continent
            </button>
            <div className="dropdown-menu">
                <button onClick={props.onSelect} value="All" className="dropdown-item" type="button">All</button>
                <button onClick={props.onSelect} value="America" className="dropdown-item" type="button">America</button>
                <button onClick={props.onSelect} value="Asia" className="dropdown-item" type="button">Asia</button>
                <button onClick={props.onSelect} value="Africa" className="dropdown-item" type="button">Africa</button>
                <button onClick={props.onSelect} value="Europe" className="dropdown-item" type="button">Europe</button>
                <button onClick={props.onSelect} value="Oceania" className="dropdown-item" type="button">Oceania</button>
            </div>
        </div>
    )
}

const App = () => {
    const [rightAnswer, setRightAnswer] = useState(undefined);
    const [index, setIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [list, setList] = useState([]);
    const [country, setCountry] = useState(undefined);
    const [answer, setAnswer] = useState("");
    const [continent, setContinent] = useState('All');
    const [cryteriaChange, setCryteriaChange] = useState(false);

    const init = () =>{
        if(continent === 'All'){
            Axios.get('http://localhost:55715/api/countries').then((data) => {
                updateState(data);
            }, (err) => {
                console.log(err);
            });
        }
        else{
            Axios.get('http://localhost:55715/api/countries/' + continent).then((data) => {
                updateState(data);
            }, (err) => {
                console.log(err);
            });
        }
    }
    
    init();

    const updateState = (data) =>{
        if(list.length === 0 || cryteriaChange === true){
            setList(data.data);
            setCryteriaChange(false);
        }
        setCountry(list[index]);
        
    }

    const handleSubmit = event =>{
        event.preventDefault();
        if(answer.toLocaleLowerCase() === country.capital.toLocaleLowerCase()){
            setPoints(points + 1);
            setRightAnswer(true);
        }
        else{
            setRightAnswer(false);
            alert('Right answer: '+ country.capital);
        }

        if(index < list.length - 1){
            setIndex(index + 1);
        }

        if(index === list.length - 1){
            document.getElementById('game').style.display = "none";
            document.getElementById('reload').style.display = "block";
            document.getElementById('reload').focus();
            if(points !== list.length){
                document.getElementById('lose').style.display = "block";
            }
            else{
                document.getElementById('win').style.display = "block";
            }
        }

        document.getElementById('answer').value = "";
    }

    const handleChange = () => {
        setAnswer(document.getElementById('answer').value);
    }

    const reload = () => {
        window.location.reload();
    }

    const handleSelection = event => {
        event.preventDefault();
        setContinent(event.target.value);
        setIndex(0);
        setPoints(0);
        setCryteriaChange(true);
        document.getElementById('dropdownContinent').innerHTML = event.target.value;
    }

    const style = {
        display: 'none'
    }

    return(
        <>
        <div className="container" id="game">
        <Continent onSelect={handleSelection}/>
            {country === undefined ? (<p id="loading">loading...</p>) : (
                <Question item={country} handleClick={handleSubmit} handleChange={handleChange} />
            )}
            {rightAnswer === undefined ? (<p></p>) : (<p className="score">{rightAnswer ? "Correct" : "Wrong"}</p>)}
        </div>
        <div className="container">
            <p id="win" className="score" style={style}>
                You Win!
            </p>
            <p id="lose" className="score" style={style}>
                Game Finished
            </p>
            <p className="score">
               Score: {points}/{list.length}
            </p>
            <div className="d-flex justify-content-center">
                <button id="reload" className="btn btn-primary m-2" style={style} onClick={reload}>Restart</button>
            </div>
        </div>
        </>
    )
}

export default App;