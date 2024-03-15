import Bouton from "../../../components/Bouton/Bouton";

const livre = (props) => (
  <>
    <td>{props.titre}</td>
    <td>{props.auteur}</td>
    <td>{props.nbPages}</td>
    <td>
      <Bouton typeBtn="btn-warning" clic={() => props.modification()}>
        Modifier
      </Bouton>
    </td>
    <td>
      <Bouton typeBtn="btn-danger" clic={props.remove}>
        Supprimer
      </Bouton>
    </td>
  </>
);

export default livre;
