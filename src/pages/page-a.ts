import { initRouter } from "../router";
import { initCount as cd } from "../comp/countdown";

export function initPageA(params : any){
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
                font-size: 20px;
                font-weight: bold;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            button:hover{
                transform: translateY(-20px) scale(1.05);
                box-shadow: 0px 10px 0px black;
            }
        </style>
        <div class="container">
            <h1>¡Piedra, Papel o Tijeras!</h1>
            <button class="button">Jugar</button>
        </div>
    `
    const boton = contenedor.querySelector(".button");
    const container = contenedor.querySelector(".container");
    boton?.addEventListener("click", ()=>{
        const cont = cd(container,1200, () => {
            params.goTo("/b")
        });
        cont.start()
    });
    return contenedor;
}