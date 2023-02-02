import {legacy_createStore as createStore} from "redux"
import reducer from "./reducer"
const PORT = require("../api/server_port")

const base_url = "http://localhost:" + PORT + "/pizzeria"
const store = createStore(reducer, {base_url: base_url})

export default store