import { createMiddleware } from "@tanstack/react-start";
import { getResponseHeaders, setResponseHeaders } from "@tanstack/react-start/server";

export const tusMiddleware = createMiddleware().server(({ next }) => {
  const headers = getResponseHeaders();

  headers.set("X-Powered-By", "@swyrin, @shostakt. and Arknights Vietnam Station");
  headers.set(
    "X-Tus-Wives",
    "Angelina, Fartooth, Reed, Mudrock, Emilia, Bagpipe, Archetto, Astesia, Ray, " +
      "Whisperain, Saileach, Ptilopsis, Vendela, Manticore, Vendela, Typhon, Dorothy, " +
      "Viviana, Meteorite, Aurora, Savage, Poncirus,Robin"
  );

  setResponseHeaders(headers);

  return next();
});
