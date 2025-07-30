import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
const RECAPTCHA_SECRET_KEY = Deno.env.get("RECAPTCHA_SECRET_KEY");
if (!RECAPTCHA_SECRET_KEY) {
  throw new Error("Missing environment variables");
}
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS", // Specify allowed HTTP methods for CORS
};
serve(async (req) => {
  // Handle CORS preflight requests (OPTIONS method).
  // Browsers send an OPTIONS request before the actual POST request to check CORS policies.
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }
    const body = await req.json();
    const { recaptchaToken } = body;
    // Validate that all required fields (email, password, reCAPTCHA token) are present.
    if (!recaptchaToken) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    // Verify the reCAPTCHA. This helps prevent automated bots from creating accounts.
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return new Response(
        JSON.stringify({
          error: "reCAPTCHA verification failed",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "reCAPTCHA verification successful.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});
