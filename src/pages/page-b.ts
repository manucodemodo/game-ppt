import { Game, Move } from "../state";
import {initComp as resolve } from "../comp/play-resolve";
import {initCount as cd } from "../comp/countdown";
import {initComp as moves } from "../comp/moves";
import {initComp as gamePoints } from "../comp/game-points";
import paperImg from "url:../../public/paper.png"
import sissorsImg from "url:../../public/sissors.png"
import rockImg from "url:../../public/rock.png"
moves();
gamePoints();

export function initPageB(params : any){
    const contenedor = document.createElement("div");
    contenedor.style = `
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        `;
    contenedor.innerHTML = `
        <style>
            .container{
                position: relative;
                height:100%;
                width:450px;
                overflow: hidden;
                display: flex;
                flex-direction: column-reverse;
                justify-content: space-between;
            }
            .result{
                display: flex;
                flex-direction: column;
                text-align: center;
                font-size: 40px;
            }
            .pc-move{
                height: 300px;
                display: flex;
                justify-content: center;
            }
            game-points{
                position: absolute;
                left: 10px;
                top: 10px
            }
        </style>
        <div class="container">
            <game-points></game-points>
            <moves-hover class="moves"></moves-hover>
            <div class="result"></div>
            <div class="pc-move"></div>
        </div>
        
    `;
    const moves = contenedor.querySelector("moves-hover") as any;
    const result = contenedor.querySelector(".result") as any;
    const pcMove = contenedor.querySelector(".pc-move") as any;
    const gp = contenedor.querySelector("game-points") as any;
    
    let locked = false;
    let stop = false;
    let gameResults: Game
    const arrMessage = [
        "I'm too good","Lucky bast@rd!",
        "You cant win if you are sleep!",
        "Stop copying me!"
    ];
    let message: string;
    let move: Move | undefined;
    let handToDrop: string;
    const count = cd(result, 1200, ()=>{
        setTimeout(()=>{handler()},0);
    });


    function resetRound(){
        if(stop)return
        locked = false;
        move = undefined;
        moves.style.pointerEvents = "auto";
        result.innerHTML = "";
        count.start()
    }

    function handler(){
        count.stop()
        
        if(stop)return
        if(locked)return
        locked = true;
        moves.style.pointerEvents = "none";

        gameResults = resolve(move ?? "DP");
        handToDrop = gameResults["pc-move"];

        if(gameResults["player-move"] == "DP"){
            message = arrMessage[2];
        } else if(gameResults.result == "lose"){
            message = arrMessage[0];
        } else if(gameResults.result == "win"){
            message = arrMessage[1];
        } else {
            message = arrMessage[3];
        }

        result.innerHTML = `
            <span>${gameResults.result.toLocaleUpperCase()}</span>
            <span>${message}</span>
        `;

        if(handToDrop == "rock"){
            handToDrop = rockImg;
        } else if(handToDrop == "paper"){
            handToDrop = paperImg;
        } else if(handToDrop == "sissors"){
            handToDrop = sissorsImg;
        }

        pcMove.innerHTML=`
            <style>
                hand{
                    width: 100px;
                    height: 80px;
                }
                img{
                    object-position: center;
                    width: 100%;
                    height: 90%;
                    overflow: visible;
                    object-fit: cover;
                    position: relative;
                    top: -700px;
                    animation: drop 1.9s;
                    filter: drop-shadow(-10px 10px 0px rgba(0, 0, 0, 1));
                }
                @keyframes drop{
                    0%{transform: translateY(0px) rotate(180deg)}
                    20%{transform: translateY(730px) rotate(180deg)}
                    80%{transform: translateY(723px) rotate(180deg)}
                    100%{transform: translateY(0px) rotate(180deg)}
                }
            </style>
            <div class="hand">
                <img src=${handToDrop}/>
            </div>
        `
        
        setTimeout(()=>{resetRound()},2000)
    }

    moves.addEventListener("move-chosen",(e: any)=>{
        move = e.detail.value;
        handler()
    });

    gp.addEventListener("game-over",(e: any)=>{
        stop = true;
        count.stop();
        setTimeout(()=>{
            params.goTo("/c")
        }, 2000)      
    });

    resetRound();

    return contenedor;
};