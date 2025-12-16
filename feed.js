import { supabase } from './supabase.js'
import { getUser } from './auth.js'


export async function createPost(text) {
const user = await getUser()
if (!user) throw new Error('Não autenticado')


await supabase.from('posts').insert({
content: text,
user_email: user.email
})
}


export async function loadFeed(containerEl) {
containerEl.innerHTML = ''


const { data } = await supabase
.from('posts')
.select('*')
.order('created_at', { ascending: false })


data?.forEach(p => {
const card = new Container({ type: 'rounded', tintOpacity: 0.25 })
const inner = document.createElement('div')
inner.style.padding = '16px'
inner.innerHTML = `<strong>@${p.user_email}</strong><p>${p.content}</p>`
card.element.appendChild(inner)
containerEl.appendChild(card.element)
})
}
