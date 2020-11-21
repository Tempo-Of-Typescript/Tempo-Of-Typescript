//import { db } from './database/index'
import { app } from './app'
import { green } from 'chalk'

const PORT = process.env.port || 3000

app.listen(PORT, ()=> console.log(green('listening on port', PORT)))

//once db is setup we can use this
// db.sync()
//     .then(() =>{
//         app.listen(PORT, ()=> console.log(green('listening on port', PORT)))
//     })