import { Component } from "react";
import Livre from "./Livre/Livre";
import FormulaireAjout from "./FormulaireAjout/FormulaireAjout";
import FormulaireModification from "./FormulaireModification/FormulaireModification";
import Alert from "../../components/Alert/Alert";

class Livres extends Component {
  state = {
    livres: [
      {
        id: 1,
        titre: "L'algorithmique selon H2PROG",
        auteur: "Mathieu GASTON",
        nbPages: 200,
      },
      {
        id: 3,
        titre: "La france du 19ème",
        auteur: "Albert PATRICK",
        nbPages: 500,
      },
      {
        id: 5,
        titre: "Le monde des animaux",
        auteur: "Marc Merlin",
        nbPages: 250,
      },
      {
        id: 8,
        titre: "Le virus d'Asie",
        auteur: "Tya Milo",
        nbPages: 120,
      },
    ],
    lastIdLivre: 8,
    idLivreModifier: 0,
    alertMessage: null,
  };

  handleSuppressionLivre = (id) => {
    const livreIndexTab = this.state.livres.findIndex(
      (livre) => livre.id === id
    );
    const newLivres = [...this.state.livres];
    newLivres.splice(livreIndexTab, 1);

    this.setState({
      livres: newLivres,
      alertMessage: {
        message: "Suppréssion effectuée",
        type: "alert-danger",
      },
    });
  };

  handleAjoutLivre = (titre, auteur, nbPages) => {
    const newLivre = {
      id: this.state.lastIdLivre + 1,
      titre: titre,
      auteur: auteur,
      nbPages: Number(nbPages),
    };

    const newLivres = [...this.state.livres];
    newLivres.push(newLivre);

    this.setState((oldState) => {
      return {
        livres: newLivres,
        lastIdLivre: oldState.lastIdLivre + 1,
        alertMessage: {
          message: "Ajout effectuée",
          type: "alert-success",
        },
      };
    });

    this.props.fermerAjoutLivre();
  };

  handleModificationLivre = (id, titre, auteur, nbPages) => {
    const caseLivre = this.state.livres.findIndex((livre) => livre.id === id);
    const newLivre = { id, titre, auteur, nbPages };
    const newLivres = [...this.state.livres];
    newLivres[caseLivre] = newLivre;

    this.setState({
      livres: newLivres,
      idLivreModifier: 0,
      alertMessage: {
        message: "Modification effectuée",
        type: "alert-warning",
      },
    });
  };

  render() {
    return (
      <>
        {this.state.alertMessage && (
          <Alert typeAlert={this.state.alertMessage.type}>
            {this.state.alertMessage.message}
          </Alert>
        )}
        <table className="table text-center">
          <thead>
            <tr className="table-dark">
              <th>Titre</th>
              <th>Auteur</th>
              <th>Nombre de pages</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.livres.map((livre) => {
              if (livre.id !== this.state.idLivreModifier) {
                return (
                  <tr key={livre.id}>
                    <Livre
                      {...livre}
                      remove={() => this.handleSuppressionLivre(livre.id)}
                      modification={() =>
                        this.setState({ idLivreModifier: livre.id })
                      }
                    />
                  </tr>
                );
              } else {
                return (
                  <tr key={livre.id}>
                    <FormulaireModification
                      {...livre}
                      validationModification={this.handleModificationLivre}
                    />
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        {this.props.ajoutLivre && (
          <FormulaireAjout validation={this.handleAjoutLivre} />
        )}
      </>
    );
  }
}

export default Livres;
