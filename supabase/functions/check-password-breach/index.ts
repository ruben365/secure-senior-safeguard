import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0'
import { corsHeaders } from '../_shared/cors.ts'

interface CheckPasswordRequest {
  password: string;
}

interface CheckPasswordResponse {
  isBreached: boolean;
  breachCount?: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { password }: CheckPasswordRequest = await req.json()

    if (!password || password.length < 8) {
      return new Response(
        JSON.stringify({ 
          isBreached: false, 
          error: 'Password must be at least 8 characters' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 400 
        }
      )
    }

    // Hash password using SHA-1 for Have I Been Pwned API
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-1', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()

    // Use k-Anonymity model - send only first 5 chars of hash
    const prefix = hashHex.slice(0, 5)
    const suffix = hashHex.slice(5)

    // Query Have I Been Pwned API
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'User-Agent': 'InVision-Network-App'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to check password breach database')
    }

    const hashes = await response.text()
    const lines = hashes.split('\n')
    
    // Check if our password hash suffix appears in the results
    for (const line of lines) {
      const [hashSuffix, count] = line.split(':')
      if (hashSuffix === suffix) {
        return new Response(
          JSON.stringify({ 
            isBreached: true, 
            breachCount: parseInt(count.trim()) 
          } as CheckPasswordResponse),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
            status: 200 
          }
        )
      }
    }

    // Password not found in breach database
    return new Response(
      JSON.stringify({ 
        isBreached: false 
      } as CheckPasswordResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error checking password breach:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        isBreached: false // Fail open - allow sign-up even if check fails
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
})
