const imgPoke1 = document.querySelector('#poke1');
const namePoke1 = document.querySelector('#nombrePoke-propio');
const poke1Tipo = document.querySelector('#tipoPropio');
const poke1Ataque = document.querySelector('#ataquePropio');

const imgPoke2 = document.querySelector('#poke2');
const namePoke2 = document.querySelector('#nombrePoke-rival');
const poke2Tipo = document.querySelector('#tipoRival');
const poke2Ataque = document.querySelector('#ataqueRival');

const input = document.querySelector('#input');
const btn_poke = document.querySelector('#btn-poke');
const btn_ataque = document.querySelector('#combate');


const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);

    return Math.floor(Math.random() * (max - min) + min);
  }

const obtenerPokePropio = ()=>{
    const numPokePropio = input.value;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokePropio}`).then((res)=> {
        return res.data;
    }).then((res)=>{
        console.log(res);
        imgPoke1.src = res.sprites.back_default;
        poke1Tipo.innerHTML = res.types[0].type.name;
        namePoke1.innerHTML = res.name;
        poke1Ataque.innerHTML = res.stats[0].base_stat;
    })
}

const obtenerPokeRival = () =>{

    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res)=>{

        return res.data
    }).then((res)=>{
        console.log(res);
        imgPoke2.src = res.sprites.front_default;
        poke2Tipo.innerHTML = res.types[0].type.name;
        namePoke2.innerHTML = res.name;
        poke2Ataque.innerHTML = res.stats[0].base_stat;
    })
}

const combate = ()=>{

}

window.addEventListener('load', obtenerPokeRival)
btn_poke.addEventListener('click', obtenerPokePropio)
btn_ataque.addEventListener('click', combate)

