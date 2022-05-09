export default class Store{
  constructor(){
    this.cart = {
      total: [],
      items:{}
    }
  }
  init(){
    const items = document.getElementsByClassName('button-primary')
    this.setCart()
    this.setCheckout()
    if(items.length){
      Array.prototype.slice.call(items).forEach(item =>{
        item.addEventListener('click', (event)=> this.addItem(event))
      }) 
    }
  }
  setCart(){
    // TODO setCart based on local store data
    const localState = JSON.parse(localStorage.getItem('crow-cart'))
    this.cart = localState?localState:localStorage.setItem('crow-cart',JSON.stringify(this.cart))
  }
  setCheckout(){
    const itemList = document.getElementById('cart-items')
    const count = document.getElementById('count')
    const total = document.getElementById('total')
    let totalPrice = 0
    let iteamTotal = this.cart.total
    if(itemList && iteamTotal.length){
      totalPrice = this.cart.total.map( id => this.cart.items[id].quantity*this.cart.items[id].price ).reduce((a,b)=> a+b,0.00)
      iteamTotal = iteamTotal.map(id => `<li class='item'><h4>${this.cart.items[id].title}<span>X${this.cart.items[id].quantity}</span></h4><h5>$${this.cart.items[id].price}</h5><li>`)
      itemList.innerHTML = iteamTotal.join('')
      count.innerText = `You have ${iteamTotal.length} items in cart`
      total.innerHTML = `$${totalPrice}`
    }
  }
  updateCart(){
    localStorage.setItem('crow-cart',JSON.stringify(this.cart))
    this.setCheckout()
  }
  hasItem(id){
    // TODO check if item is within the object array
    return this.cart.items[id]? this.cart.items[id]:false
  }
  addItem(event){
    // TODO add item to cart
    const data = event.target.parentNode
    const id = event.target.parentNode.dataset.itemId
    const item =  this.hasItem(id)
    console.log(data.children)
    if(!item){
      this.cart.total.push(id)
      this.cart.items[id] = {
        title: data.children[1].innerText,
        img: data.children[0],
        price: parseFloat(data.children[2].innerText.replace('$','')),
        quantity: 1
      }
    }else{
      this.cart.items[id].quantity = item.quantity+1
    }
    this.updateCart()
  }
}
