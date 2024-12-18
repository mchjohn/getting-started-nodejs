
# Primeiros passos com NodeJs

Criado em 2009 por Ryan Dahl, NodeJs é uma plataforma/runtime construída sobre o interpretador V8 do Google Chrome. Permite executar código JavaScript no lado do servidor.

## Características

Modelo Assíncrono e Não Bloqueante:
- Projetado para ser assíncrono, ele não bloqueia a execução de tarefas enquanto espera uma operação I/O ser concluída. Ótimo para aplicações que necessitam de muitas conexões simultâneas.

Event Loop
- Utiliza um loop de eventos, para realizar operações de maneira eficiente e leve sem criar novas threads. Ideal para aplicações em tempo real.

NPM
- Dá acesso ao NPM, maior repositório de pacotes de código aberto do mundo. Facilita a instalação e gerenciamento de bibliotecas e dependências.


## Call Stack

Estrutura de dados usada em diversas linguagens de programação, incluindo JavaScript, ela gerencia a execução de funções. Segue o princípio LIFO (Last In, First Out).

A Call Stack mantém o controle de quais funções estão sendo executadas no momento e em que ponto da execução o programa se encontra. Cada vez que uma função é chamada, ela é adicionada ao topo da pilha. Quando essa função termina, ela é removida da pilha e o controle retorna para a função anterior.

### Curiosidade

Se uma função continuar chamando outras funções indefinidamente (por exemplo, em um loop de recursão infinita), a Call Stack pode ficar cheia. Quando isso acontece, ocorre um "Stack Overflow".

Isso vai lançar um erro:

```bash
RangeError: Maximum call stack size exceeded
```

## Single-Thread

Em uma aplicação Single-Thread, todas as operações são executadas em uma única thread. Não há múltiplas threads processando diferentes partes do código simultaneamente. Cada função ou tarefa precisa esperar a anterior terminar para poder ser executada.

NodeJs por tanto só tem uma Call Stack.

### Por que Node.js não trava mesmo sendo Single-Thread?

Porque utiliza um modelo assíncrono e não-bloqueante para lidar com operações demoradas, como I/O (leitura de arquivos, consultas a bancos de dados ou chamadas HTTP). Essas operações não interrompem o fluxo de execução principal, são delegadas para outros mecanismos.

### Elementos Chave

1. Event Loop (libuv)
- Função: O Event Loop é o núcleo que coordena a execução do código, callbacks e tarefas assíncronas.
- Como funciona: Ele monitora a Call Stack e a fila de eventos (Callback Queue). Se a Call Stack estiver vazia, ele pega a próxima tarefa da fila e a executa.
- Resultado: Permite que operações demoradas (como timers e I/O) sejam tratadas de forma não-bloqueante, evitando que a aplicação pare enquanto espera.

2. Thread Pool (libuv)
- Função: Algumas operações mais pesadas (como leitura de arquivos, criptografia e compressão) são delegadas para o Thread Pool, que roda em segundo plano.
- Biblioteca: Node.js usa o libuv, que cria esse pool de threads (normalmente 4 threads por padrão) para gerenciar essas tarefas.
- Resultado: Mesmo sendo single-thread, essas operações não travam o Event Loop, porque são executadas paralelamente em outras threads.

2. Callback Queue
- Função: Armazena os callbacks prontos para serem executados depois que o Event Loop estiver disponível.
- Como funciona: Assim que a thread principal estiver livre (Call Stack vazia), o Event Loop pega uma tarefa da Callback Queue e a executa.
- Resultado: Isso garante que tarefas demoradas possam ser concluídas sem interromper o fluxo, mas ainda na ordem correta.

