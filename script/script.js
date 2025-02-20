class Aluno {
    constructor(nome, curso, quantidadeModulos, valorPorModulo) {
        this.nome = nome 
        this.curso = curso 
        this.quantidadeModulos = parseInt(quantidadeModulos) 
        this.valorPorModulo = parseFloat(valorPorModulo) 
        this.dataInscricao = new Date().toLocaleString() // Data e hora atuais
    }

    //  calcula o valor total com base na quantidade de módulos e valor por módulo
    get valorTotal() {
        return this.quantidadeModulos * this.valorPorModulo
    }
}

// Classe que gerencia a lista de alunos
class GerenciadorAlunos {
    constructor() {
        this.alunos = [] 
        this.listagemTabela = document.getElementById("listarItens") 
    }

    //  adicionar um novo aluno 
    adicionar(aluno) {
        this.alunos.push(aluno) 
        console.log(`${aluno.nome} - adicionado na lista de alunos.`) 
    }
    // lista os alunos no console
    listarAlunos() {
        console.log("Alunos inscritos:") 
        console.log("------------------------")
        this.alunos.forEach((aluno, index) => {
            console.log(`${index + 1}° aluno - ${aluno.nome} - R$${aluno.valorPorModulo.toFixed(2)}`) 
        })
    }

    //  atualiza a tabela de listagem de alunos na interface
    atualizaListagem() {
        this.listagemTabela.innerHTML = "" // Limpa a tabela antes de atualizar
        this.alunos.forEach((aluno, index) => {

            // Adiciona cada aluno à tabela
            this.listagemTabela.innerHTML += `
                <tr>
                    <td>${aluno.nome}</td>
                    <td>${aluno.curso}</td>
                    <td>${aluno.quantidadeModulos}</td>
                    <td>R$${aluno.valorPorModulo.toFixed(2)}</td>
                    <td>R$${aluno.valorTotal.toFixed(2)}</td>
                    <td>${aluno.dataInscricao}</td>
                    <td>
                        <button class='btn btn-warning' onclick='editarAluno(${index})'>Editar</button>
                        <button class='btn btn-danger' onclick='removerAluno(${index})'>Excluir</button>
                    </td>
                </tr>
            `
        })
    }
}

// Instância do gerenciador de alunos
let gerenciador = new GerenciadorAlunos()
gerenciador.listarAlunos()

// Captura os elementos do formulário
const form = document.getElementById("form-cadastrar") 
const form_index = document.getElementById("index-id") 
const form_nome = document.getElementById("nome") 
const form_curso = document.getElementById("cursos") 
const form_quantidade = document.getElementById("quantidade") 
const form_valor = document.getElementById("valor") 

// Adiciona evento de submissão ao formulário
form.addEventListener("submit", function(event) {
    event.preventDefault() 
    const id = form_index.value.trim() 
    const nome = form_nome.value.trim() 
    const curso = form_curso.value.trim() 
    const quantidade = form_quantidade.value.trim() 
    const valor = form_valor.value.trim() 

    // Cria um novo objeto Aluno
    let aluno = new Aluno(nome, curso, quantidade, valor)

    if (id === "") { // verifica o id do aluno se não foi definido
        gerenciador.adicionar(aluno) 
    } else {
        gerenciador.alunos[id] = aluno 
    }

    gerenciador.atualizaListagem() // Atualiza a tabela de listagem

    // Limpa os campos do formulário
    form_index.value = ""
    form_nome.value = ""
    form_curso.value = ""
    form_quantidade.value = ""
    form_valor.value = ""
})

// Função para remover alunos
function removerAluno(index) {
    gerenciador.alunos.splice(index, 1) 
    gerenciador.atualizaListagem() 
}

// Função para editar alunos
function editarAluno(index) {
    const aluno = gerenciador.alunos[index] 
    form_nome.value = aluno.nome
    form_curso.value = aluno.curso
    form_quantidade.value = aluno.quantidadeModulos
    form_valor.value = aluno.valorPorModulo
    form_index.value = index 
}