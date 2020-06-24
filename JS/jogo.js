/*--- Variaveis ---*/
var scores,roundScore,jogadorAtivo,jogoRolando;

/*--- Funções ---*/

function proximoJogador(){
    if(jogadorAtivo === 0){
        jogadorAtivo = 1;
    }else{
        jogadorAtivo = 0;
    }
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function novoJogo(){
    scores = [0,0];// Pontuação de cada jogador
    roundScore = 0;// Pontuação de cada round
    jogadorAtivo = 0;// 0 === jogador 1 / 1 === jogador 2
    jogoRolando = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Jogador 1';
    document.querySelector('#name-1').textContent = 'Jogador 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

/*--- Main ---*/

novoJogo();
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(jogoRolando){
        var dado = Math.floor(Math.random() * 6) + 1;// Gera um número aleatório entre 1 e 6
        var dadoDOM = document.querySelector('.dice');
        dadoDOM.style.display = 'block';
        dadoDOM.style.opacity = 1;
        dadoDOM.src = 'Resources/dice-' + dado + '.png';
        if(dado !== 1){
            roundScore += dado;
            document.querySelector('#current-' + jogadorAtivo).textContent = roundScore;
        }else{
            roundScore = 0;
            document.querySelector('#current-' + jogadorAtivo).textContent = roundScore;
            dadoDOM.style.opacity = 0.5;
            proximoJogador();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(jogoRolando){
        document.querySelector('.dice').style.display = 'none';
        scores[jogadorAtivo] += roundScore;
        if(scores[jogadorAtivo] >= 100){
            document.querySelector('#name-' + jogadorAtivo).textContent = 'Vencedor!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + jogadorAtivo + '-panel').classList.toggle('winner');
            document.querySelector('.player-' + jogadorAtivo + '-panel').classList.remove('active');
            document.querySelector('#score-' + jogadorAtivo).textContent = scores[jogadorAtivo];
            roundScore = 0;
            document.querySelector('#current-' + jogadorAtivo).textContent = roundScore;
            jogoRolando = false;
        }else{
            document.querySelector('#score-' + jogadorAtivo).textContent = scores[jogadorAtivo];
            roundScore = 0;
            document.querySelector('#current-' + jogadorAtivo).textContent = roundScore;
            proximoJogador();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click',novoJogo);