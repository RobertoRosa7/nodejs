* O que são URI's, URL's e URLN's?
    * URI (Uniforme Resources Identifier)
    * URL (Uniforme Resources Locator)
    * URN (Uniforme Resources Name)

URI - identificar qualquer recurso na internet com base em seu identificar ou em seu nome. As
    URI se compo por outros dois componentes, URL e URN, URN são subconjuntos.

URL - informa a localização dos recursos da internet.
URN - representa nomes de recursos.

# modelos de URL e URN

url: http://www.dominio.com:80/nintendo/pokemon/charizard.png
    
    * protocolo,
    * domínio,
    * porta,
    * path

urn: urn:pokemon:charizard

    * URN Resolver: applicação que resolve a URN e aponta para seu endereço,
    * endereço indireto,
    * localização do recurso independente,


# Rest

REST - Representation State Transfer

    * Novo jeito de pensar em HTTP, devido a transferência de estado representacional,
    * Verbo HTTP - GET, POST, PUT, DELETE
    * Integração com URI, permitindo realzar operações do verbo https na mesma URI

Usando anotação comum como XML ou JSON podemos adicionar, consultar, atualizar ou remover,
informações por meio da URI

# status code - request MongoDB
    (POST)
    sucesso: 200 (ok) {status: 1},
    inválidos: 400 (bad request) {status: 2},
    duplicidade: 409 (conflits) {status: 3},
    erro interno: 500 (internal server error) {status: 4}

    (GET)
    sucesso: 200 (ok) {status: 1},
    não localizado: 404 (not found) {status: 2},
    error interno: 500 (internal server error) {status: 3}

# prelight request
    (JavaScript) (Browser)
    xhr.send();
    xhr.onload() ou xhr.onerror()

    (Browser) (API)
    prelight request
    prelight response
    put request
    put response