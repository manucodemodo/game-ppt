export type Results = "draw" | "win" | "lose";
export type Move = "sissors" | "paper" | "rock" | "DP";
export type Game = {
    "pc-move" : Move,
    "player-move" : Move,
    "result": Results,
};



const state = {
    data: {
        "games": [] as Array<Game>
    },
    sessions: [] as any,
    listeners: [] as Array<() => any>,
    subscribe(callback: () => any) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    },
    getState() {
        return this.data;
    },
    getSessions() {
        return this.sessions;
    },
    setState(newState: any) {
        this.data.games = newState; 
        this.listeners.forEach((cb) => cb());
    },
    resetState() {
        const arr = this.data.games; 
        if (arr.length === 0) return; 
        const lastResult = arr[arr.length - 1].result;
        const session = { 
            "games": [...this.data.games], 
            "whowon": lastResult
        };
        this.sessions.push(session);
        const cs = this.sessions;
        this.data.games = [];
        return cs
    },
}

export {state};