const protocol = require('./musician-protocol');
const dgram = require('dgram');
const uuidv1= require('uuid/v1');

var s =dgram.createSocket('udp4');


function Musician(instrument){

    this.uuid=uuidv1();
    this.instrument=instrument;
    this.creationTime=Date.now();
    this.sound=instruments.get(instrument);



Musician.prototype.update=function(){
    var info={
        uuid: this.uuid,
        instrument: this.instrument,
        sound: this.sound,
        creationTime: this.creationTime,
        timestamp: Date.now()
        
    };

    var payload = JSON.stringify(info);

    message = new Buffer(payload);
		s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
			console.log("Sending payload: " + payload + " via port " + s.address().port);
        });
        
    }

    /**
     * As long as it is running, every second it will emit a sound
     */
    setInterval(this.update.bind(this),1000);
}

    var instruments = new Map();
    instruments.set("piano", "ti-ta-ti");
    instruments.set("trumpet", "pouet");
    instruments.set("flute", "trulu");
    instruments.set("violin", "gzi-gzi");
    instruments.set("drum", "boum-boum");

    var instrument=process.argv[2];

    var musico= new Musician(instrument);








