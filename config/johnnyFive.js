const { Board, Led } = require("johnny-five");
module.exports = function (johnnyFive) {
    const board = new Board();
    console.log(board)
    board.on("ready", () => {
        
        // Create a standard `led` component instance
        const led = new Led(6);
        console.log(led)
    
        // "blink" the led in 500ms
        // on-off phase periods
        led.on(500);
        led.off(500);

    });
}