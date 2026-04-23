import { initRouter } from "../router";
import { state } from "../state";
import { initCount as cd } from "../comp/countdown";
import { initComp as history} from "../comp/history";

export function initPageC(params : any){
    const arr = state.getState().games;
    const lastResult = arr[arr.length - 1].result;
    state.resetState();
    const contenedor = document.createElement("div");
    contenedor.innerHTML = `
        <style>
            .container{
                height:100%;
                width:300px;
                font-weight: bold;
                font-size: 50px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 20px
            }
            h1{
                text-align: center;
                font-size: 30px;
            }
            button{
                height:70px;
                width:70px;
                border-radius: 50%;
                border: none;
                background-color: red;
                color: white;
                font-size: 18px;
                font-weight: bold;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            button:hover{
                transform: translateY(-20px) scale(1.05);
                box-shadow: 0px 10px 0px black;
            }
            .history{
                position: absolute;
                top: 20px;
                width: 200px;
                height: 150px;
                overflow: auto;
            }
        </style>
        <div class="container">
            <h1>YOU </h1>
            <button>Try Again</button>
            <div class="history"></div>
        </div>
    `
    const historial = contenedor.querySelector(".history") as HTMLDivElement;
    history(historial);
    const boton = contenedor.querySelector("button");
    boton?.addEventListener("click", ()=>{
        params.goTo("/b")
    });
    return contenedor;
}
