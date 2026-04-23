import { state } from "../state";

export function initComp(){

    class GamePoints extends HTMLElement {
        shadow = this.attachShadow({mode: "open"});
        initialized = false;
        unsubscribe: any;
        gameEnded = false;
        constructor() {
            super();
        }

        connectedCallback() {
            if (!this.initialized) {
                this.unsubscribe = state.subscribe(() => {
                    this.render();
                });
                console.log("dentro")
                this.initialized = true;
            }
            this.render();
        }

        disconnectedCallback() {
            if (this.unsubscribe) {
                this.unsubscribe();
                console.log("fuera")
            }
        }

        private emitMove(){
            const event = new CustomEvent("game-over", {
                detail: "game-over",
                bubbles: true,
                composed: true
            });

            this.dispatchEvent(event);
        }

        render() {
            let pc: number = 0;
            let pl: number = 0;
            this.shadow.innerHTML = `
            <style>
                div{
                    display: flex;
                }
            </style>
            <div>
                <span class="pl">PL:${pl}</span>
                <span class="pc">PC:${pc}</span>
            </div>
            `;
            const player = this.shadow.querySelector(".pl") as any;
            const computer = this.shadow.querySelector(".pc") as any;
            const arr = state.getState().games;


            arr.forEach((game) => {
                if (game.result == "win"){
                    pl += 1;
                    player.textContent = `PL:${pl}`;
                } else if (game.result == "lose"){
                    pc += 1;
                    computer.textContent = `PC:${pc}`;
                }
            });
            
            if (pc>= 5 || pl>= 5 && !this.gameEnded){
                this.gameEnded = true;
                this.emitMove();
            }
        }
    }
    customElements.define("game-points", GamePoints);
}