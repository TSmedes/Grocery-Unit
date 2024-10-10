import { supabase } from '../../utils/supabase'

export default async function getItems() {
    const {data, error} = await supabase.auth.getSession()
    if (error) {
        console.error(error)
        alert(error.message)
        return error
    } else {
        const resp = await supabase
            .from('item')
            .select('*')
            .eq('user', data.session.user.id)
        if (resp.error) {
            console.error(resp.error)
            alert(resp.error.message)
            return resp.error
        } else {
            return resp.data
        }
    }
}

export async function getItem(itemId) {
    const {data, error} = await supabase
        .from('item')
        .select('*')
        .eq('id', itemId)
    if (error) {
        console.error(error)
        alert(error.message)
        return error
    } else {
        return data
    }
}

export async function getPrice(priceId) {
    const {data, error} = await supabase
        .from('item_entry')
        .select('*')
        .eq('id', priceId)
    if (error) {
        console.error(error)
        alert(error.message)
        return error
    } else {
        return data
    }
}