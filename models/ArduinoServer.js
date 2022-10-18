var { Board, Led} = require("johnny-five");

class ArduinoServer {
  constructor() {
    this.board = new Board();
    this.board.on("ready", function () {
      this.led1  = new Led(1);
      this.led2  = new Led(2);
      this.led3  = new Led(3);
      this.led4  = new Led(4);
      this.led5  = new Led(5);
      this.led6  = new Led(6);
      this.led7  = new Led(7);
      this.led8  = new Led(8);
      this.led9  = new Led(9);
      this.led10 = new Led(10);
      this.led11 = new Led(11);
      this.led12 = new Led(12);
      this.led13 = new Led(13);
    });
  }

  toggleLed(port) {
    switch (port) {
      case '1':
        this.board.led1.toggle();
        break;
      case '1':
        this.board.led2.toggle();
        break;
      case '3':
        this.board.led3.toggle();
        break;
      case '4':
        this.board.led4.toggle();
        break;
      case '5':
        this.board.led5.toggle();
        break;
      case '6':
        this.board.led6.toggle();
        break;
      case '7':
        this.board.led7.toggle();
        break;
      case '8':
        this.board.led8.toggle();
        break;
      case '9':
        this.board.led9.toggle();
        break;
      case '10':
        this.board.led10.toggle();
        break;
      case '11':
        this.board.led11.toggle();
        break;
      case '12':
        this.board.led12.toggle();
        break;
      case '13':
        this.board.led13.toggle();
        break;
    
      default:
        console.log('whattt?')
        break;
    }
  }

}
module.exports = new ArduinoServer();