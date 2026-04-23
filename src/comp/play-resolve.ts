import { Move, Results, Game, state } from "../state";
export function initComp(input: Move){    
    const moves: Move[] = ["sissors", "paper", "rock"];
    const randomIndex = Math.floor(Math.random() * moves.length);
    const pcMove = moves[randomIndex];

    let result: Results
    if (input == pcMove){
        result = "draw"
    } else if (input == "sissors"&& pcMove == "paper"){
        result = "win"
    } else if (input == "rock" && pcMove == "sissors"){
        result = "win"
    } else if (input == "paper" && pcMove == "rock"){
        result = "win"
    } else if (input == "DP"){
        result = "lose"
    } else {
        result = "lose"
    }
    
    const cg: Game = {
        "pc-move": pcMove,
        "player-move": input,
        "result": result
    }

    const cs = state.getState().games;
    const ns = [
        ...cs,
        cg
    ];
    state.setState(ns);
    console.log(ns)

    return cg;
};