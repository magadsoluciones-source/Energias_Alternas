import { supabase } from '../supabaseClient'

export async function getProducts(categoria) {
  let query = supabase.from('productos').select('*')
  if (categoria) query = query.eq('categoria', categoria)

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function updateDisponibilidad(id, disponible) {
  const { error } = await supabase
    .from('productos')
    .update({ disponible })
    .eq('id', id)

  if (error) throw error
}