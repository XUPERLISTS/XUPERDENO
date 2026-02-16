Deno.serve(async (req) => {
  const userAgent = req.headers.get("user-agent") || "";
  
  // 1. BLOQUEO DE NAVEGADORES Y EDITORES
  // Si el User-Agent contiene palabras de navegadores o editores, bloqueamos.
  const isBrowser = /Mozilla|Chrome|Safari|Edge|Firefox|Axios|Postman|vscode/i.test(userAgent);
  
  if (isBrowser) {
    return new Response("Acceso denegado: Este contenido solo es accesible desde la App oficial.", { 
      status: 403,
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }

  // 2. TU URL DE GITHUB
  const GITHUB_URL = "https://raw.githubusercontent.com/XUPERLISTS/XUPERLIST-1/main/XUPERLISTS-1.w3u"; 

  try {
    const res = await fetch(GITHUB_URL);
    const texto = await res.text();

    // 3. ENTREGA EL CONTENIDO SOLO A LA APP
    return new Response(texto, {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
      },
    });
  } catch (e) {
    return new Response("Error de conexión", { status: 500 });
  }
});
