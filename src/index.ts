import { state } from "./state"
import { initRouter } from "./router";

(function(){
    const root = document.querySelector(".root") as HTMLElement;
    root!.style = `
        display: flex;
        justify-content: center;
        height: 100vh;
        background-color: rgb(0,0,0,0.2);
    `;
    if(location.pathname == "/"){
        location.pathname = "/a";
    }
    initRouter(root!);
})();