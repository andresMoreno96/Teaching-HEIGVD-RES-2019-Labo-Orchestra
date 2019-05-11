const protocol = require('./musician-protocol');
const dgram = require('dgram');
var HashMap = require('hashmap');
var moment = require('moment');
const net = require('net');

var musicians = new HashMap();

var simpleServerTCP =net.createServer(function (socket){
    console.log("server connected");
    musicians.forEach(element=>{
        console.log(Date.now()-element.timestamp);
        /*check if the musician has emmited a sound the last second or is inactive */
        if(Date.now()-element.timestamp >1000){
            musicians.remove(element.uuid);

        }
    });

    console.log("sending info from auditor");
    socket.write(JSON.stringify(musicians.values(),['uuid','instrument','activeSince'],3)+'\r\n');
    socket.destroy();

}).listen(2205);

const s = dgram.createSocket('udp4');

s.bind(protocol.PROTOCOL_PORT, function() {
  console.log("Joining multicast group");
  s.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

s.on('message', function(msg, source) {
    console.log("Data has arrived: " + msg + ". Source port: " + source.port);
    var info= JSON.parse(msg);

    var musician={
        uuid : info.uuid,
        instrument : info.instrument,
        activeSince : moment(info.creationTime),
        timestamp: info.timestamp
    };

    musicians.set(musician.uuid, musician);

});
