import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.4";
// Ensure the correct environment variables are being used
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
// Throw an error if a critical variable is missing
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables");
}
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};
serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders
      });
    }
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return new Response(JSON.stringify({
        error: "Missing required fields"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    // Initialize the Supabase client with the SERVICE ROLE KEY
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    // Use signInWithPassword to verify credentials
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      console.error("Login attempt failed:", error.message);
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid credentials"
      }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Password is correct"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return new Response(JSON.stringify({
      error: "Internal server error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
});
