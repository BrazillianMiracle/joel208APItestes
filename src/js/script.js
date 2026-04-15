const searchBtn = document.getElementById('searchBtn');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonCard = document.getElementById('pokemonCard');

async function getPokemon() {
    const pokemonName = pokemonInput.value.toLowerCase().trim();
    
    if (!pokemonName) return alert("Digite um nome!");

    pokemonCard.innerHTML = "<p>Carregando...</p>";

    try {
        // 1. Faz a requisição para a API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        // 2. Verifica se o Pokémon existe
        if (!response.ok) throw new Error("Pokémon não encontrado");

        // 3. Converte a resposta para JSON (objeto JS)
        const data = await response.json();

        // 4. Monta o HTML com os dados da API
        pokemonCard.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Tipo:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>Peso:</strong> ${data.weight / 10}kg</p>
        `;

    } catch (error) {
        pokemonCard.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

searchBtn.addEventListener('click', getPokemon);