import { state } from "../state";

export function initComp(el: HTMLElement){
    const arr = state.getSessions();
    const totalHTML = arr.map((item: any) => {
        return `
            <div class="game-session">
                <div class="winner-title">${item.whowon}</div>
                <div class="moves-container">
                    ${item.games.map((g: any) => `
                        <div class="move-pair">
                            <span>PC: ${g["pc-move"]}</span>
                            <span>PL: ${g["player-move"]}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }).join("");

    el.innerHTML = `
    <style>
        .game-session,
        .winner-title,
        .moves-container,
        .move-pair{
        font-size:20px;
        display:flex;
        flex-direction: column;
        }
        .game-session{background-color: white}
        .moves-container{background-color: grey;gap: 10px}
    </style>
    ${totalHTML}`;
    return el
}