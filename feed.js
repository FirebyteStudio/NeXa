import { supabase } from './supabase.js'
import { getUser } from './auth.js'


window.createPost = async function () {
  const content = document.getElementById('post-content').value

  if (!content) return alert('Write something')

  const { data: user } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('posts')
    .insert({
      content,
      user_id: user.user.id
    })

  if (error) {
    alert(error.message)
  } else {
    document.getElementById('post-content').value = ''
    loadFeed()
  }
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
