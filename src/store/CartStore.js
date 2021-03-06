import {makeAutoObservable} from "mobx";

export default class CartStore {
    constructor() {
        this._items = []
        makeAutoObservable(this)
    }

    setItems(items) {
        this._items = items
    }

    get items() {
        return this._items
    }
}
