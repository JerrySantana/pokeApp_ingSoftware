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

    if (numPokePropio > 1000 || numPokePropio < 1) {
        alert('Elige un pokemon entre 1 y 1000!!');
    } else {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokePropio}`).then((res)=> {
            return res.data;
        }).then((res)=>{
            console.log(res);
            if (res.sprites.back_default != null) {
                imgPoke1.src = res.sprites.back_default;
            } else if (res.sprites.back_shiny != null){
                imgPoke1.src = res.sprites.back_shiny;
            } else {
                imgPoke1.src = res.sprites.front_default;
                alert('A tu Pokémon no le gustan las fotos por la espalda.')
            }
            poke1Tipo.innerHTML = res.types[0].type.name;
            namePoke1.innerHTML = res.name;
            poke1Ataque.innerHTML = res.stats[0].base_stat;
        })
    }
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
    const ataqueRival = parseInt(poke2Ataque.textContent);
    const ataquePropio = parseInt(poke1Ataque.textContent);
    const nombreRival = namePoke2.textContent;
    const nombrePropio = namePoke1.textContent;
    if (nombrePropio != '') {
        if (ataquePropio > ataqueRival) {
            alert(`El vencedor es: ${nombrePropio}!!\n${nombreRival} ha quedado incapacitado!`)
        } else {
            alert(`El vencedor es: ${nombreRival}!!\n${nombrePropio} ha quedado incapacitado!`)
        }
    } else {
        alert('Primero, elige un Pokémon!!');
    }
}

window.addEventListener('load', obtenerPokeRival)
btn_poke.addEventListener('click', obtenerPokePropio)
btn_ataque.addEventListener('click', combate)

