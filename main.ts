Deno.serve(async (req) => {
  // PEGA AQUÍ TU URL DE GITHUB (la que termina en .w3u)
  const URL_GITHUB = "https://raw.githubusercontent.com/XUPERLISTS/XUPERLIST-1/main/XUPERLISTS-1.w3u";

  try {
    const res = await fetch(URL_GITHUB);
    const texto = await res.text();

    return new Response(texto, {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*", // Esto es para que Wiseplay no falle
      },
    });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
});
