import React from "react";

export default function Atividade(props) {
 
  function prioridadeLabel(param) {
    switch (param) {
      case "1":
        return "Baixa";
      case "2":
        return "Normal";
      case "3":
        return "Alta";
      default:
        return "Não definida";
    }
  }

  function prioridadeStyle(param) {
    switch (param) {
      case "1":
        return "success";
      case "2":
        return "dark";
      case "3":
        return "danger";
      default:
        return "não definido";
    }
  }

  return (
    <div>
      <div
        className={
          "card mb-2 shadow-sm border-" + prioridadeStyle(props.ativ.prioridade)
        }
      >
        <div className="card-body">
          <div className="d-flex justify-content-between ">
            <h5 className="card-title">
              <span className="badge bg-secondary me-1">{props.ativ.id}</span> - {props.ativ.titulo}              
            </h5>

            <h6>Prioridade: {prioridadeLabel(props.ativ.prioridade)}</h6>
          </div>
          <p className="card-text">
            {props.ativ.id} - {props.ativ.descricao}
          </p>
          <div className="d-flex justify-content-end pt-2 m-0 border-top">
            <button
              className="btn btn-outline-primary me-2 "
              onClick={() => props.pegarAtividade(props.ativ.id)}
            >
              <i className="fas fa-pen me-2"></i>
              Editar
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => props.deletarAtividade(props.ativ.id)}
            >
              <i className="fas fa-trash me-2">Deletar</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
