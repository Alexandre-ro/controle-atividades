import { React, useState, useEffect } from "react";

const atividadeInicial = {
  id: 0,
  titulo: "",
  prioridade: 0,
  descricao: "",
};

export default function AtividadeForm(props) {
  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if (props.atividadeSelecionada.id !== 0) {
      setAtividade(props.atividadeSelecionada);
    }
  }, [props.atividadeSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setAtividade({ ...atividade, [name]: value });
  };

  function atividadeAtual() {
    if (props.atividadeSelecionada.id !== 0) {
      return props.atividadeSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  function handleCancelar(e) {
    e.preventDefault();
    props.cancelarAtividade();
    setAtividade(atividadeInicial);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (props.atividadeSelecionada.id !== 0) {
      props.atualizarAtividade(atividade);
    } else {
      props.addAtividade(atividade);
    }

    setAtividade(atividadeInicial);
  }

  return (
    <>
      <h1>Atividades {atividade.id !== 0 ? atividade.id : ""}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">
            Título:
          </label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            className="form-control"
            placeholder="Título"
            onChange={inputTextHandler}
            value={atividade.titulo}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label"> Prioridade: </label>
          <select
            id="prioridade"
            name="prioridade"
            className="form-select"
            onChange={inputTextHandler}
            value={atividade.prioridade}
            required
          >
            <option value="0">               
              Selecione
            </option>
            <option value="1">Baixa</option>
            <option value="2">Normal</option>
            <option value="3">Alta</option>
          </select>
        </div>

        <div className="col-md-12">
          <label className="form-label">
            Descrição:
          </label>
          <textarea
            id="descricao"
            name="descricao"
            className="form-control"
            placeholder="Descrição"
            onChange={inputTextHandler}
            value={atividade.descricao}
            required
          />
            <hr />
        </div>     

        <div className="col-12">
          {atividade.id === 0 ? (
            <button className="btn btn-outline-secondary" type="submit">
              + Atividade
            </button>
          ) : (
            <>
              <button className="btn btn-outline-success me-2" type="submit">
                Salvar
              </button>

              <button
                className="btn btn-outline-warning"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
