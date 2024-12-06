let tarefasConcluidas = 0;

// Seleciona elementos do DOM
const form = document.getElementById('create-board-form');
const todoList = document.getElementById('todo-list');

// Função para salvar tarefas no localStorage
// Função para atualizar o contador de tarefas concluídas
function atualizarContador() {
    contador.textContent = `Tarefas concluídas: ${tarefasConcluidas}`;
}

// Função para salvar tarefas no localStorage
function salvarTarefas() {
    const tarefas = [];
    const tarefaItens = todoList.querySelectorAll('.tarefa');

    tarefaItens.forEach((tarefaItem) => {
        const descricao = tarefaItem.querySelector('.task-content span').textContent;
        const etiqueta = tarefaItem.querySelector('.etiqueta').textContent;
        const data = tarefaItem.querySelector('.task-date').textContent;
        const isCompleted = tarefaItem.querySelector('.botao-concluir').classList.contains('completed');

        tarefas.push({
            descricao,
            etiqueta,
            data,
            isCompleted
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
// Função para carregar tarefas do localStorage
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefasConcluidas = 0; // Reinicia o contador antes de carregar
    tarefas.forEach((tarefa) => {
        if (tarefa.isCompleted) tarefasConcluidas++; // Incrementa tarefas concluídas
        adicionarTarefa(tarefa.descricao, tarefa.etiqueta, tarefa.data, tarefa.isCompleted);
    });
    atualizarContador(); // Atualiza o contador após carregar
}

// Adiciona uma tarefa à lista
function adicionarTarefa(descricao, etiquetaTexto, dataTexto, isCompleted = false) {
    const newTask = document.createElement('li');
    const taskContent = document.createElement('div'); // Novo div para agrupar o conteúdo
    const taskText = document.createElement('span');
    const etiqueta = document.createElement('span');
    const taskDate = document.createElement('span');
    const divBotao = document.createElement('div');
    const botaoConcluir = document.createElement('button');

    newTask.classList.add('tarefa');
    taskContent.classList.add('task-content'); // Classe para o grupo de conteúdo
    taskText.textContent = descricao;
    etiqueta.textContent = etiquetaTexto || '';
    etiqueta.classList.add('etiqueta');
    taskDate.textContent = dataTexto || `Criada em: ${new Date().toLocaleString('pt-BR')}`;
    taskDate.classList.add('task-date');
    botaoConcluir.textContent = 'Concluir';
    botaoConcluir.classList.add('botao-concluir');
    botaoConcluir.type = 'button';
    divBotao.classList.add('divisao-concluir');

    // Adicionando estilo de tarefa concluída, se necessário
    if (isCompleted) {
        botaoConcluir.innerHTML = `<img src="./assets/icons/check-icon.png" alt="Concluído" class="check-icon">`;
        botaoConcluir.classList.add('completed');
        botaoConcluir.style.background = 'none';
        botaoConcluir.style.border = 'none';
        taskText.style.textDecoration = 'line-through';
        taskText.style.color = '#888';
    }

    // Evento de clique no botão Concluir
    botaoConcluir.addEventListener('click', function () {
        const isCompleted = botaoConcluir.classList.contains('completed');
        if (isCompleted) {
            botaoConcluir.innerHTML = 'Concluir';
            botaoConcluir.classList.remove('completed');
            botaoConcluir.style.background = '';
            botaoConcluir.style.border = '';
            taskText.style.textDecoration = 'none';
            taskText.style.color = '';
            tarefasConcluidas--; // Decrementa o contador
        } else {
            botaoConcluir.innerHTML = `<img src="./assets/icons/check-icon.png" alt="Concluído" class="check-icon">`;
            botaoConcluir.classList.add('completed');
            botaoConcluir.style.background = 'none';
            botaoConcluir.style.border = 'none';
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = '#888';
            tarefasConcluidas++; // Incrementa o contador
        }
        atualizarContador(); // Atualiza o contador visual
        salvarTarefas(); // Salva o estado atualizado
    });

    // Adicionando elementos ao DOM
    taskContent.appendChild(taskText);
    taskContent.appendChild(etiqueta);
    taskContent.appendChild(taskDate);
    divBotao.appendChild(botaoConcluir);
    newTask.appendChild(taskContent);
    newTask.appendChild(divBotao);
    todoList.appendChild(newTask);

    salvarTarefas(); // Salva a nova tarefa
}


// Adiciona evento de envio ao formulário
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskDescription = document.querySelector('#description').value.trim();
    const taskEtiqueta = document.querySelector('.input-etiqueta').value.trim();

    if (!taskDescription) {
        alert('Por favor, insira uma tarefa válida!');
       
    }
    if(!taskEtiqueta) {
        alert('Por favor, insira uma etiqueta válida!');
        return
    }

    adicionarTarefa(taskDescription, taskEtiqueta);
    form.reset();
});

// Cria o contador no canto da tela
const contador = document.createElement('div');
contador.id = 'contador-tarefas';
contador.style.position = 'fixed';
contador.style.bottom = '20px';
contador.style.right = '20px';
contador.style.padding = '10px 20px';
contador.style.backgroundColor = '#333';
contador.style.color = '#fff';
contador.style.borderRadius = '5px';
contador.style.fontSize = '16px';
contador.textContent = `Tarefas concluídas: ${tarefasConcluidas}`;
document.body.appendChild(contador);

// Carrega as tarefas salvas ao iniciar
carregarTarefas();
