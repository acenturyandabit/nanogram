//client start
/*THE HASH
Must tell if versions are different

EACH datapoint
must have last modified + data
must be ordered

IN CASE OF CONFLICT
take most recent one, always
*/

const dgram = require('dgram');

function _nanogram(id, _options) {
    const server = dgram.createSocket('udp4');
    let options = {
        udpPort: 11233,
        transmitPort: -1,
    }
    Object.assign(options, _options);
    if (options.transmitPort < -1) options.transmitPort = options.udpPort + Date.now() % (65534 - udpPort);
    //add an event api
    this.events = {};
    this.fire = (e, args) => {
        let _e = e.split(",");
        _e.push("*"); // a wildcard event listener
        _e.forEach((i) => {
            if (!this.events[i]) return;
            if (this.events[i].events) {
                this.events[i].events.forEach((f) => {
                    try {
                        f(args)
                    } catch (er) {
                        console.log(er);
                    }

                });
            }
        })
    };
    this.on = (e, f) => {
        let _e = e.split(',');
        _e.forEach((i) => {
            if (!this.events[i]) this.events[i] = {};
            if (!this.events[i].events) this.events[i].events = [];
            this.events[i].events.push(f);
        })
    };

    let message;
    function encodeList(data) {
        //hash the list.
        let asString = JSON.stringify(data);
        let charbox = [];
        let place = 0;
        for (let i = 0; i < asString.length; i++) {
            if (charbox.length < place + 1) charbox.push(0);
            charbox[place] += asString.charCodeAt(i);
            charbox[place] %= 49;
            place++;
            place %= 64;
        }
        charbox = charbox.map((i) => String.fromCharCode(i + 48));
        return charbox.join("");
    }


    let nanogramReady = false;
    server.bind(options.udpPort, undefined, () => {
        server.setBroadcast(true);
        nanogramReady = true;
    })

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });

    server.on('message', (msg, rinfo) => {
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        if (message!=msg && message.split("|")[1]==msg.split("|")[1]){
            //fire me at their tcp
        }
    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
        let message = "hello world!";
    });

    let previousBroadcastTimer = undefined;
    this.on('newData',()=>{
        if (nanogramReady) {
            //start broadcasting
            if (previousBroadcastTimer != undefined) {
                clearInterval(previousBroadcastTimer);
            }
            message = encodeList(data);// data e.g. ASFWEVIASERNASFDLASGJAWEO
            message += "|";
            message += id//id of the document. IDK.
            previousBroadcastTimer = setInterval(() => {
                server.send(message, 0, message.length, options.udpPort, "255.255.255.255");
            }, 1000);
        }
    })

    //now for TCP connections
    //create new tcp listener
    //when tcp listener receives data, merge it.



}




///////////////usage
/*
nanogram.on('update',(newdata)=>{
    //the new data, for you to do as you will.
})

nanogram.fire('newData',data);
//push data to nanogram.

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
//data MUST be a javascript object. if you just need an array, make it like {0: item0, 1: item1} etc.
// for consistency's sake.

*/






// Prints: server listening 0.0.0.0:41234



//occasionally, broadcast on UDP to others
//document name, revision hash, port i can listen on

// listen for udp broadcasts
// if hear one, compare to current hash. 

//if different, say hi by trying to establish TCP connection

//listen for connections. When connection made, temporarily pause broadcast

//send over all hashes

//compare hashes, tell which ones are different

//For different ones, which is earlier?