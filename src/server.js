import "dotenv/config"
import app from "./app.js";
import connect_db from "./config/db_connect.js";


const port = process.env.PORT || 4000

const connect_server = async () => {
    try {
        await connect_db();
        app.listen(port, () => {
            console.log("server is running on port ", port)
        })

    } catch (error) {
        console.log("server not started ", error.message)
    }
}

connect_server();


