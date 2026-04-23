import { state } from "../state";

export function initCount(element: any, sg: number, onFinish: any) {
    let int: any;
    let tiempo = 3;

    const arr = ["SISSORS", "PAPER", "ROCK"];

    function start() {
        tiempo = 3;

        int = setInterval(() => {
            element.innerHTML = `
                <style>
                    .aux{
                        animation: beat 0.6s ease;
                    }
                    @keyframes beat {
                      0%   { transform: scale(1); }
                      50%  { transform: scale(1.3); }
                      100% { transform: scale(1); }
                    }
                </style>
                <div class="aux">${arr[tiempo - 1]}</div>
            `;

            tiempo--;

            if (tiempo < 0) {
                clearInterval(int);
                onFinish && onFinish();
            }
        }, sg);
    }

    function stop() {
        clearInterval(int);
    }
    
    return { start, stop };
}