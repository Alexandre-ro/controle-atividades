import "./App.css";
import { useState, useEffect} from "react";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from './components/AtividadeLista';

function App() {
  const [atividades, setAtividades] = useState([]);
  const[atividade, setAtividade] = useState({id:0});
  const[index, setIndex] = useState(0);

  useEffect(() => {
    atividades.length <= 0
      ? setIndex(1)
      : setIndex(Math.max.apply(Math,atividades.map((item) => item.id)) + 1);
  }, [atividades]);
  
  function addAtividade(atividade) {
    setAtividades([...atividades, {...atividade, id: index}]);
  }

  function deletarAtividade(id) {
    const atividadesFiltradas = atividades.filter(
      (atividade) => atividade.id !== id
    );

    setAtividades([...atividadesFiltradas]);
  }

  function pegarAtividade(id){
    const atividade = atividades.filter((atividade) => atividade.id === id);

    setAtividade(atividade[0]);
  }

  function cancelarAtividade(){
    setAtividade({id: 0});
  }


  function atualizarAtividade(atividade){
    setAtividades(atividades.map(item => item.id === atividade.id ? atividade : item));
    setAtividade({id:0});
  }

  return (
    <>
      <AtividadeForm 
        addAtividade = {addAtividade}
        cancelarAtividade = {cancelarAtividade}
        atividadeSelecionada = {atividade}
        atualizarAtividade = {atualizarAtividade}
        atividades = {atividades}
      />

      <AtividadeLista 
        atividades = {atividades} 
        deletarAtividade = {deletarAtividade}      
        pegarAtividade = {pegarAtividade} 
      />
    </>
  );
}

export default App;
