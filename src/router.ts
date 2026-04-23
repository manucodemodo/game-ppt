import { initPageA } from "./pages/page-a.ts";
import { initPageB } from "./pages/page-b.ts";
import { initPageC } from "./pages/page-c.ts";

const routes = [
    {
        path: /\/a/,
        component : initPageA,
    },
    {
        path: /\/b/,
        component : initPageB,
    },
    {
        path: /\/c/,
        component : initPageC,
    }
];
// recive root
export function initRouter(contenedor: Element) {
    
    function goTo(path: string) {
        history.pushState({}, "", path);
        handleRouter(path);
    }
    
    function handleRouter(ubi: string) {
        for (const r of routes) {
            if (r.path.test(ubi)) {
                const el = r.component({ goTo : goTo });
                if (contenedor?.firstChild) {
                    contenedor.firstChild.remove();
                }
                contenedor?.appendChild(el!);
            }
        }
    }

    handleRouter(location.pathname);
};