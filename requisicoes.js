const url = "https://web-api-csharp-backend.onrender.com";

export const getUsuarios = async () => {
  try {
    const usuariosReq = await fetch(`${url}/person`);

    if (!usuariosReq.ok) {
      throw new Error("Erro na requisição!");
    }

    return await usuariosReq.json();
  } catch (error) {
    console.error("Erro (GET): ", error);
    return null;
  } finally {
    console.log("Requisição GET dos usuários finalizada...");
  }
};

export const postUsuarios = async (nome) => {
  try {
    const usuariosReq = await fetch(`${url}/person`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nome }),
    });

    if (!usuariosReq.ok) {
      throw new Error("Erro na requisição!");
    }

    return await usuariosReq.json();
  } catch (error) {
    console.error("Erro (POST): ", error);
    return null;
  } finally {
    console.log("Processo POST do usuário finalizada...");
  }
};

export const putUsuarios = async (id, nome) => {
  try {
    const respostaPutUsuario = await fetch(`${url}/person/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nome }),
    });

    if (!respostaPutUsuario.ok) {
      throw new Error(`Houve algum erro ao atualizar o usuário ${id}`);
    }

    return await respostaPutUsuario.json();
  } catch (error) {
    console.error("Erro (PUT): ", error);
    return null;
  } finally {
    console.log("Processo PUT encerrado...");
  }
};

export const deleteUsuarios = async (id) => {
  try {
    const respostaDeleteUsuario = await fetch(`${url}/person/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!respostaDeleteUsuario.ok) {
      throw new Error("Houve algum erro ao deletar o usuário...");
    }

    return await respostaDeleteUsuario.json();
  } catch (error) {
    console.error("Erro (DELETE): ", error);
  } finally {
    console.log("Processo DELETE encerrado...");
  }
};
