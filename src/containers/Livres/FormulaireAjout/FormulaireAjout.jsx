import { Component } from "react";
import Bouton from "../../../components/Bouton/Bouton";
import { withFormik } from "formik";
import * as Yup from "yup";

class FormulaireAjout extends Component {
  render() {
    return (
      <>
        <h2
          className="text-center text-primary"
          style={{ fontFamily: "Sigmar One" }}
        >
          Affichage du formulaire d'ajout
        </h2>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="titre" className="form-label">
              Titre du livre
            </label>
            <input
              type="text"
              className="form-control"
              id="titre"
              name="titre"
              value={this.props.values.titre}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.touched.auteur && this.props.errors.titre && (
              <span style={{ color: "red" }}>{this.props.errors.titre}</span>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="auteur" className="form-label">
              Auteur du livre
            </label>
            <input
              type="text"
              className="form-control"
              id="auteur"
              name="auteur"
              value={this.props.values.auteur}
              onChange={this.props.handleChange}
              onBlur={this.props.handleBlur}
            />
            {this.props.touched.auteur && this.props.errors.auteur && (
              <span style={{ color: "red" }}>{this.props.errors.auteur}</span>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="nbPages" className="form-label">
              Nombre de pages
            </label>
            <input
              type="number"
              className="form-control"
              id="nbPages"
              name="nbPages"
              value={this.props.values.nbPages}
              onChange={(event) =>
                this.props.setFieldValue("nbPages", +event.currentTarget.value)
              }
              onBlur={this.props.handleBlur}
            />
            {this.props.touched.nbPages && this.props.errors.nbPages && (
              <span style={{ color: "red" }}>{this.props.errors.nbPages}</span>
            )}
          </div>
          <Bouton typeBtn="btn-primary" clic={this.props.handleSubmit}>
            Valider
          </Bouton>
        </form>
      </>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    titre: "",
    auteur: "",
    nbPages: "",
  }),
  // validate: (values) => {
  //   // const errors = {};
  //   // if (values.titre.length < 3) {
  //   //   errors.titre = "Le titre doit avoir plus de 3 caractères";
  //   // }
  //   // if (values.titre.length > 15) {
  //   //   errors.titre = "Le titre doit avoir au moins 15 caractères";
  //   // }
  //   // if (!values.auteur) {
  //   //   errors.auteur = "Le champs auteur est obligatoire";
  //   // }
  //   // return errors;
  // },
  validationSchema: Yup.object().shape({
    titre: Yup.string()
      .min(3, "Le titre doit avoir plus de 3 caractères")
      .max(15, "Le titre doit avoir au moins 15 caractères")
      .required("Le titre est obligatoire"),
    auteur: Yup.string()
      .min(3, "L'auteur doit avoir plus de 3 caractères")
      .required("L'auteur est obligatoire"),
    nbPages: Yup.number()
      .lessThan(1000, "Nombre de page < à 1000")
      .moreThan(50, "Nombre de page > à 50")
      .required("Le nombre de page est obligatoire"),
  }),
  handleSubmit: (values, { props }) => {
    props.validation(values.titre, values.auteur, values.nbPages);
  },
})(FormulaireAjout);
