import { supabase } from './supabase.js'


export async function login(email, password) {
const { error } = await supabase.auth.signInWithPassword({ email, password })
if (error) throw error
}


export async function signup(email, password) {
const { error } = await supabase.auth.signUp({ email, password })
if (error) throw error
}


export async function logout() {
await supabase.auth.signOut()
}


export async function getUser() {
const { data } = await supabase.auth.getUser()
return data.user
}
