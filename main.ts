Deno.serve(async (req) => {
  const userAgent = req.headers.get("user-agent") || "";
  const secFetchMode = req.headers.get("sec-fetch-mode") || "";

  // FILTRO: Bloqueamos si alguien intenta entrar escribiendo la URL en el navegador (navegación directa)
  // Pero permitimos si es una petición de datos (cors/no-cors) que es lo que hacen las Apps.
  if (secFetchMode === "navigate" && (userAgent.includes("Mozilla") || userAgent.includes("Chrome"))) {
    return new Response("Acceso Protegido: Solo disponible desde la App.", { 
      status: 403 
    });
  }

  const GITHUB_URL = "https://raw.githubusercontent.com/XUPERLISTS/XUPERLIST-1/main/XUPERLISTS-1.w3u"; 

  try {
    const res = await fetch(GITHUB_URL);
    const texto = await res.text();

    return new Response(texto, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET",
      },
    });
  } catch (e) {
    return new Response("Error de red", { status: 500 });
  }
});
