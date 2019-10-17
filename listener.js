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
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(11123);

// Prints: server listening 0.0.0.0:41234



//occasionally, broadcast on UDP to others
//broadcast IP, document name, revision hash, port i can listen on

// listen for udp broadcasts
// if hear one, compare to current hash. 

//if different, say hi by trying to establish TCP connection

//listen for connections. When connection made, temporarily pause broadcast

//send over all hashes

//compare hashes, tell which ones are different

//For different ones, which is earlier?