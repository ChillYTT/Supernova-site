// Array of games for homepage to scroll over
const games = [ "Moto X3M", "Vex 3", "Vex 4", "Vex 5", "Paper.io", "Subway Surfers", "Retrobowl",  "Slope", "Slope 2" ];
// When homepage game scroll is done, it sets to "Play over 20+ games"
const max_games_num = 100;

// Can use in an async function (await sleep())
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Handles games scroll on homepage (Play _____)
async function home_scroll_games() {
    let game = document.getElementById("home-game-scroll-item");
    // Text that $game is set to at the end of scroll
    let end = `Over ${max_games_num}+ Games`;
    // Makes sure the bottom border only is big enough to contain the longest text that will appear on it
    game.style.width = Math.max(...[
        games
            .map(value => value.length)
            .reduce((prev, curr) => curr > prev ? curr : prev),
        end.length,
    ]) + "ex";
    // Defines the equation for the scroll time, default is just y=600
    // y = time spent on each item in ms, x = index of item
    const home_scroll_curve = (x) => 600;
    for (let i=0; i<games.length; ++i) {
        game.innerHTML = games[i];
        await wait(home_scroll_curve(i));
    }
    game.innerText = end;
}

home_scroll_games();
