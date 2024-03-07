// const {createClient} = require("redis")

 


// client =  createClient({
//     password: 'YeewafjoxTnoGgk77oEPkWuBbLxepMZc',
//     socket: {
//         host: 'redis-13267.c301.ap-south-1-1.ec2.cloud.redislabs.com',
//         port: 13267

//     }
// }).on('error', err => console.log('Redis Client Error', err))
// .connect();

// module.exports ={
//     client
// }

/////////////
// client.on('connect', () => {
//     console.log('Connected to Redis');
// });

// client.on('error', (err) => {
//     console.error(`Error with Redis client: ${err}`);
// });


/* just for setting key pair value */

// client.set('testKey', ', Redidfdfds!', (err) => {
//     if (err) {
//         console.error(`Error setting key: ${err}`);
//     } else {
//         console.log('Key set successfully');

      
//     }
// });

// await client.set('key', 'valufdfe');



/*  this is another way to connect 
 we can take some help of json format here. why the way udere the hood the process is only key-value pair.
*/


const {Client} = require("redis-om")
const {config} = require("dotenv")
config()

const client = new Client();

(async () => {
    await client.open(`redis://default:YeewafjoxTnoGgk77oEPkWuBbLxepMZc@redis-13267.c301.ap-south-1-1.ec2.cloud.redislabs.com:13267`)
    // await client.set('key', 'value');
})();
;

module.exports= {client }





