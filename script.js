// let request = new XMLHttpRequest();
// let url = "https://pokeapi.co/api/v2/pokemon";

// let pokemonCounter = 0;

// request.open("GET", url, true);
// request.onload = function() {
// let data = JSON.parse(this.response);
// let row = null; 

// if (request.status >= 200 && request.status < 400){
// data.results.forEach(pokemon => {
// if (pokemonCounter % 4 == 0) {
//         		row = document.createElement('div');
//        		row.className = "row";
//         		$("#pokelist").append(row);
//       			}
// let card = document.createElement('div'); card.className = "col-3";

//       let p = document.createElement('p');
//       p.textContent = pokemon.name;
//       card.appendChild(p);
//       row.appendChild(card);
//       pokemonCounter++;

// });
// }
// };
// request.send();
let request = new XMLHttpRequest();
let url = "https://pokeapi.co/api/v2/pokemon?limit=100";
request.open("GET", url, true);

//Resuest
request.onload = function() {
  let data = JSON.parse(this.response);
  let row = null;
  let counter = 0; 
  if(request.status >= 200 && request.status < 400){
    data.results.forEach(pokemon =>{
      console.log(pokemon.name);
      if(counter % 4 == 0){
        row=document.createElement('div');
        row.className='row';
        $('#pokelist').append(row);
      }
      let card =document.createElement('div');
      card.className = 'col-md-3 pokemon';
      
      let pokemonRequest = new XMLHttpRequest();
      let pokemonUrl = pokemon.url;//Each pokemon will have its own url

      pokemonRequest.open('GET', pokemonUrl, true);

      pokemonRequest.onload = function(){
        let pokemonData = JSON.parse(this.response);
        console.log(pokemonData);
        //p name of pokemon
        let p = document.createElement('p')
        p.textContent = pokemon.name;

        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemonData.sprites.front_default;

        let moves = document.createElement('p');
        moves.src = pokemonData.moves[0].move.name;
        card.onclick = function(){
            pokemonImage.src = pokemonData.sprites.front_shiny;
        }             
            
            card.appendChild(pokemonImage);
			card.appendChild(p);
            card.appendChild(moves);

            row.appendChild(card);
        };
          
        pokemonRequest.send();
        
        counter++;
      })
  }
};

request.send();
