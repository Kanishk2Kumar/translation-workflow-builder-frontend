'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const supabase = createClient()

  // Extract data from the form
  const first_name = formData.get('first_name') as string
  const last_name = formData.get('last_name') as string
  const email = formData.get('email') as string
  const organization_name = formData.get('organization_name') as string
  const role = formData.get('role') as string
  const password = formData.get('password') as string

  // 1. Create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  // 2. Insert the extra details into your custom `users` table
  const { error: dbError } = await supabase
    .from('users')
    .insert([
      {
        first_name,
        last_name,
        email,
        organization_name,
        role,
      }
    ])

  if (dbError) {
    return { error: dbError.message }
  }

  // Redirect on success (change this to your actual success page)
  redirect('/dashboard')
}

export async function logIn(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function logOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  // Redirect to the sign-in or home page after successfully logging out
  redirect('/sign-in')
}