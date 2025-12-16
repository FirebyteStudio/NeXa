import { login, signup, logout, getUser } from './auth.js'
// NAVBAR (Liquid Glass)
const nav = new Container({ type: 'pill', tintOpacity: 0.25 })
nav.element.style.display = 'flex'
nav.element.style.alignItems = 'center'


const logo = document.createElement('strong')
logo.textContent = 'NeXa'
logo.style.padding = '0 12px'


const btnFeed = new Button({ text: 'Feed', type: 'pill', size: 14, onClick: showFeed })
const btnLogin = new Button({ text: 'Login', type: 'pill', size: 14, onClick: showLogin })
const btnLogout = new Button({ text: 'Sair', type: 'pill', size: 14, onClick: async () => { await logout(); showLogin(); } })


nav.element.append(logo)
nav.addChild(btnFeed)
nav.addChild(btnLogin)
nav.addChild(btnLogout)


document.getElementById('navbar').appendChild(nav.element)


async function refreshNav() {
const user = await getUser()
btnLogin.element.style.display = user ? 'none' : ''
btnLogout.element.style.display = user ? '' : 'none'
}


// LOGIN VIEW
async function showLogin() {
view.innerHTML = ''
await refreshNav()


const card = new Container({ type: 'rounded', tintOpacity: 0.35 })
const email = document.createElement('input')
email.placeholder = 'Email'
const pass = document.createElement('input')
pass.type = 'password'
pass.placeholder = 'Senha'


const bLogin = new Button({ text: 'Entrar', type: 'pill', onClick: async () => {
try { await login(email.value, pass.value); showFeed() } catch(e){ alert(e.message) }
}})


const bSignup = new Button({ text: 'Criar conta', type: 'pill', onClick: async () => {
try { await signup(email.value, pass.value); showFeed() } catch(e){ alert(e.message) }
}})


card.element.append(email, pass)
card.addChild(bLogin)
card.addChild(bSignup)
view.appendChild(card.element)
}


// FEED VIEW
async function showFeed() {
view.innerHTML = ''
await refreshNav()


const composer = new Container({ type: 'rounded', tintOpacity: 0.3 })
const ta = document.createElement('textarea')
ta.placeholder = 'O que você está pensando?'
const postBtn = new Button({ text: 'Postar', type: 'pill', onClick: async () => {
try { await createPost(ta.value); ta.value=''; await renderPosts() } catch(e){ alert(e.message) }
}})
composer.element.appendChild(ta)
composer.addChild(postBtn)
view.appendChild(composer.element)


const list = document.createElement('div')
list.style.marginTop = '16px'
view.appendChild(list)


async function renderPosts(){ await loadFeed(list) }
renderPosts()
}


// INIT
showLogin()
