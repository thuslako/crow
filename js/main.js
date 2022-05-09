

import Store from './store.js'
const store = new Store()
let user =  {}
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]+/g, c =>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
const clientInfo = async ()=> {
  const client = await fetch("https://api.allorigins.win/get?url=https://api.db-ip.com/v2/free/self")
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => JSON.parse(data.contents).ipAddress)
  .catch(error =>{
    console.log(error)
  })
  const userLocal = JSON.parse(localStorage.getItem('crow-user'))

  user = (userLocal && userLocal.ip === client)? userLocal : localStorage.setItem('crow-user',JSON.stringify({
    id: uuidv4(),
    ip: client
  }))

  blackCrow()
}
const blackCrow = ()=>{
    const page = {
      site_name: 'BLACKCROW',
      page_id: (window.location.pathname === '/index.html'? 'home': 'other' ),
      site_language: document.documentElement.lang,
      page_url: window.location.href,
      device_info: window.navigator.userAgent,
      visitor_ip_address: user.ip,
      visitor_id: user.id,
      ...(store.cart.total.length? ({cart: store.cart.total.map(item => ({id: item, quantity: store.cart.items[item].quantity, price : store.cart.items[item].price}))}): null)
    }
    fetch('https://api.sandbox.blackcrow.ai/v1/events/view',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(page)
    }).then(data => {
      console.log(data)
    }).catch(error =>{
      console.log(error)
    })
}
const init = ()=>{
  store.init()
  clientInfo()
}

if(document.readyState == 'loading') document.addEventListener('DOMContentLoaded', init)
else init()




