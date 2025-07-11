
const input = document.querySelector('input')
const btn = document.querySelector('button')
const card = document.querySelector('.card')

dictionary_api('love')
async function dictionary_api (word) {
    const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(resp => resp.json())
    
    return resp[0]
}

btn.addEventListener('click', add_dictionary_info)

async function add_dictionary_info () {
    const data = await dictionary_api(input.value)
    console.log(data);

    let partOfSpeech_arr = []
    for(let i = 0; i <= data.meanings.length - 1; i++) {
        partOfSpeech_arr.push(data.meanings[i].partOfSpeech)
    }

    card.innerHTML = `
        <div class="single">
            <span>Word:</span>
            <span>${data.word}</span>
        </div>
        <div class="single">
            <span>Phonetic:</span>
            <span>${data.phonetic}</span>
        </div>
        <div class="single">
            <span>Audio:</span>
            <span>
                <audio controls src="${data.phonetics[0].audio}"></audio>
            </span>
        </div>
        <div class="single">
            <span>Definition:</span>
            <span>${data.meanings[0].definitions[0].definition}</span>
        </div>
        <div class="single">
            <span>Example:</span>
            <span>${data.meanings[1].definitions[0].example}</span>
        </div>
        <div class="single">
            <span>Parts Of Speech:</span>
            <span>${partOfSpeech_arr.map(e => e).join(', ')}</span>
        </div>
    `
}
