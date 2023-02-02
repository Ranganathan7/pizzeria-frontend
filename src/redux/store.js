import {legacy_createStore as createStore} from "redux"
import reducer from "./reducer"
import { endpoint } from "../../src/components/ENDPOINT"

const base_url = endpoint + "/pizzeria"
const store = createStore(reducer, {base_url: base_url})

export default store