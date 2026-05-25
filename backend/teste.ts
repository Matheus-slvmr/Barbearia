// backend/teste.ts

async function testarFluxoCompleto() {
  try {
    // PASSO 1: Fazer Login para pegar o crachá
    console.log("1️⃣ Batendo na porta para fazer login...");
    const resLogin = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'chefe@barbearia.com',
        senha: 'senha-segura'
      })
    });

    const dadosLogin = await resLogin.json();
    const meuToken = dadosLogin.token; // Guardamos o crachá aqui!

    if (!meuToken) {
      console.log("❌ Erro no login! Verifique email e senha.");
      return;
    }

    console.log("✅ Crachá em mãos! Vamos mostrar para o segurança e agendar...");

    // O ID do cliente (Maria ou Carlos)
    const idDoCliente = "913d8792-f093-416e-80c5-f40320dc48b3"; 

    // PASSO 2: Fazer o agendamento MOSTRANDO o crachá
    const resAgendamento = await fetch('http://localhost:3000/agendamentos', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${meuToken}` // 👈 AQUI ESTÁ A MÁGICA! Mostrando o crachá!
      },
      body: JSON.stringify({
        data: '2023-12-20',
        hora: '16:00',
        servico: 'Corte Degradê',
        clienteId: idDoCliente,
        barbeiroId: dadosLogin.usuario.id // Usando o ID do chefe que acabou de logar
      })
    });

    const agendamento = await resAgendamento.json();
    
    if (resAgendamento.ok) {
      console.log('🎉 SUCESSO ABSOLUTO! O segurança deixou passar:');
      console.log(agendamento);
    } else {
      console.log('❌ O banco recusou:', agendamento);
    }

  } catch (erro) {
    console.error('❌ Erro no teste:', erro);
  }
}

testarFluxoCompleto();