const btnPesquisar = document.querySelector('#temaDaNoticia');
btnPesquisar.addEventListener('click', function(event) {
  event.preventDefault(); // Previne o envio do formulário


  LimparNoticias();
  const inputTema = document.getElementById('tema'); // Seleciona o input pelo ID
  const tema = inputTema.value; // Pega o valor digitado no input
  PesquisaNoticias(tema); // Chama a função passando o valor do input
});

const api_key = "pub_54333f7572aa793c79e410738d7b51b2a96fd";

async function PesquisaNoticias(tema) {
  console.log("chamou")
  const url = `https://newsdata.io/api/1/news?apikey=${api_key}&q=${tema}&country=br&language=pt&category=world`; 

  try {
    const request = await fetch(url);

    if (!request.ok) {
      throw new Error(`Erro HTTP: ${request.status}`);
    }

    const dados = await request.json();
    let contDados = -1;
    // Verifique se o campo é 'status' ou algo semelhante
    if (dados.status === "success") {

      dados.results.forEach(dado => {
        contDados++;
        const card = document.createElement('div');
        
        const descricao = dado.description
        const descricaoCurta = descricao.substring(0, 300) + "...";

        if(contDados % 2 == 0){
          card.classList.add('col-md-8');
          card.innerHTML = `
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <h3 class="mb-0">${dado.title}</h3>
              <div class="mb-1 text-body-secondary">Publicado em: ${dado.pubDate}</div>
              <p class="mb-auto">${descricaoCurta}</p>
              <a href="${dados.image_url}"  target="_blank" class="icon-link gap-1 icon-link-hover stretched-link">
                leia Completo
                <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
              </a>
            </div>
          </div>
        </div>`;
        }
        else {
          card.classList.add('col-md-8', 'ms-auto');
          card.innerHTML = `
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <h3 class="mb-0">${dado.title}</h3>
              <div class="mb-1 text-body-secondary">Publicado em: ${dado.pubDate}</div>
              <p class="mb-auto">${descricaoCurta}</p>
              <a href="${dados.image_url}"  target="_blank" class="icon-link gap-1 icon-link-hover stretched-link">
                leia Completo
                <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
              </a>
            </div>
        </div>`;
        }


        main.appendChild(card);      
      }); 


    } else {
      console.log(dados.status);
      console.log("DEU ERRO NESSA MERDA");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

function LimparNoticias(){

  let secondChild = main.children[1]
  if (secondChild) {
    main.removeChild(secondChild);
  }
}
