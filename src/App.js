import "./App.css";
import { useState, useEffect } from "react";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";
import api from "./api/atividade";

function App() {
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });

  const pegaTodasAtividades = async () => {
    const response = await api.get("atividade");

    return response.data;
  };

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();

      if (todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, []);

  const addAtividade = async (atividade) => {
    const response = await api.post("atividade", atividade);
    setAtividades([...atividades, response.data]);
  };

  const atualizarAtividade = async (atividade) => {
    const response = await api.put(`atividade/${atividade.id}`, atividade);
    const { id } = response.data;

    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item))
    );

    setAtividade({ id: 0 });
  };

  const deletarAtividade = async (id) => {
    if (await api.delete(`atividade/${id}`)) {
      const atividadeFiltrada = atividades.filter(
        (atividade) => atividade.id !== id
      );

      setAtividades([...atividadeFiltrada]);
    }

    const atividadesFiltradas = await atividades.filter(
      (atividade) => atividade.id !== id
    );
    setAtividades([...atividadesFiltradas]);
  };  

  function pegarAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);

    setAtividade(atividade[0]);
  }

  function cancelarAtividade() {
    setAtividade({ id: 0 });
  }

  return (
    <>
      <AtividadeForm
        addAtividade={addAtividade}
        cancelarAtividade={cancelarAtividade}
        atividadeSelecionada={atividade}
        atualizarAtividade={atualizarAtividade}
        atividades={atividades}
      />

      <AtividadeLista
        atividades={atividades}
        deletarAtividade={deletarAtividade}
        pegarAtividade={pegarAtividade}
      />
    </>
  );
}

export default App;
