import { Move } from "../state";
import paperImg from "url:../../public/paper.png"
import sissorsImg from "url:../../public/sissors.png"
import rockImg from "url:../../public/rock.png"

export function initComp(){
    class Moves extends HTMLElement{
        shadow = this.attachShadow({mode: "open"});
        constructor(){
            super();
            this.render();
        }

        private emitMove(move: Move){
            const event = new CustomEvent("move-chosen", {
                detail: { value: move },
                bubbles: true,
                composed: true
            });

            this.dispatchEvent(event);
        }

        render(){
            this.shadow.innerHTML = `
                <style>
                    .cont{
                        display: flex;
                        width: 100%;
                        justify-content: space-around;
                    }
                    .move{
                        width: 100px;
                        height: 250px;
                        background: none;
                        border: none;
                        padding: 0;
                        cursor: pointer;
                        outline: none;
                        border: none;
                        transition: transform 0.2s ease, filter 0.2s ease;
                    }
                    .move:hover{
                        transform: translateY(-120px) scale(1.25);
                        filter: drop-shadow(10px 10px 0px rgba(0, 0, 0, 1));
                    }
                    .rock{cursor: grabbing;}
                    .paper{cursor: grab;}
                    .sissors{cursor: pointer;}
                    img{
                        position: relative;
                        object-position: center;
                        bottom: -90px;
                        animation: rise;
                        width: 100%;
                        height: 100%;
                        overflow: visible;
                        object-fit: cover;
                    }          
                </style>
                <div class= "cont">
                    <button class="move rock">
                        <img src=${rockImg}/>
                    </button>
                    <button class="move paper">
                        <img src=${paperImg}/>
                    </button>
                    <button class="move sissors">
                        <img src=${sissorsImg}/>
                    </button>
                </div>
            `;
            
            const rock = this.shadow.querySelector(".rock") as HTMLButtonElement;
            rock.addEventListener("click", () => {
                this.emitMove("rock");
            });
            
            const paper = this.shadow.querySelector(".paper") as HTMLButtonElement;
            paper.addEventListener("click", () => {
                this.emitMove("paper");
            });
            
            const sissors = this.shadow.querySelector(".sissors") as HTMLButtonElement;
            sissors.addEventListener("click", () => {
                this.emitMove("sissors");
            });
        }
    }
    customElements.define("moves-hover", Moves);
}