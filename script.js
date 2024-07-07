const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaPlay = document.querySelector('#alternar-musica')
const iniciarPausarBt = document.querySelector('#start-pause span')
const tempoTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3') 
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')


musica.loop = true

let tempoDeCorridoEmSegundos = 1500
let intervalo = null

musicaPlay.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    }
    else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 1500
    AlterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 300
    AlterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})

longoBt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 900
    AlterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function AlterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML= `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML= `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`
                break;
        case 'descanso-longo':
            titulo.innerHTML= `Volte a superfície<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                break;
        default:
            break;
    }
    
}

const contagemRegressiva = () => {
    if (tempoDeCorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDeCorridoEmSegundos -= 1
    mostrarTempo()

}

startPauseBt.addEventListener('click', iniciarPausar)

function iniciarPausar() {
    if (intervalo) {
        audioPausa.play();
        zerar()
        return
    }
    audioPlay.play();
    intervalo = setInterval(contagemRegressiva, 1000)
    iniciarPausarBt.textContent = 'Pausar'
}

function zerar() {
    iniciarPausarBt.textContent = 'Começar'
    clearInterval(intervalo)
    intervalo = null
    
}

function mostrarTempo() {
    const tempo = new Date(tempoDeCorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
    
}
mostrarTempo()