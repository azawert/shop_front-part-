import {makeAutoObservable} from "mobx";

export default class CartStore {
    constructor() {
        this._cartItems = []
        makeAutoObservable(this)
    }

    setCartItems(item) {
        this._cartItems.push(item)
    }

    setDeleteItem(id) {
        this._cartItems = this._cartItems.filter(cartItem => cartItem.id !== id)
    }

    setClearCart() {
        this._cartItems = []
    }

    setAddQuantity(id) {
        this._cartItems.map((item, i) => {
                return item.id === id ? item.quantity += 1 : item

            }
        )
    }

    setRemoveQuantity(id) {
        this._cartItems.map((item, i) => {


                if (item.id === id && item.quantity === 1) this.cartItems.splice(i)
                if (item.id === id) {
                    item.quantity -= 1
                }
                return item

            }
        )
    }

    get cartItems() {
        return this._cartItems
    }
}