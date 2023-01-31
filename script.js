async function buscaEndereco(cep){
    let mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""
    
   try {
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCepConvertida = await consultaCep.json()

        if(consultaCepConvertida.erro){
            throw Error('CEP não existente!')
        }

        let cidade = document.getElementById('cidade')
        let logradouro = document.getElementById('endereco')
        let estado = document.getElementById('estado')
        let bairro = document.getElementById('bairro')

        cidade.value = consultaCepConvertida.localidade
        logradouro.value = consultaCepConvertida.logradouro
        estado.value = consultaCepConvertida.uf
        bairro.value = consultaCepConvertida.bairro

        return consultaCepConvertida

   }catch(erro){
        mensagemErro.classList.add('erro__texto')
        mensagemErro.innerHTML = `<p>Cep Inválido. Tente novamente!</p>`
         console.log(erro)
   }
}

let cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))



// let ceps = ['01001000', '01001001']

// let conjuntoCeps = ceps.map(cep => buscaEndereco(cep))

// Promise.all(conjuntoCeps).then(respostas => console.log(respostas))
