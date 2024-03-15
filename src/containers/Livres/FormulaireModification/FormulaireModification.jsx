import { Component } from "react";
import Bouton from "../../../components/Bouton/Bouton";
import { withFormik } from "formik";
import * as Yup from "yup";

class FormulaireModification extends Component {
  // state = {
  //   titreSaisi: "",
  //   auteurSaisi: "",
  //   nbPagesSaisi: "",
  // };
  /* handleValidation = () => {
    this.props.validationModification(
      this.props.id,
      this.state.titreSaisi,
      this.state.auteurSaisi,
      this.state.nbPagesSaisi
    );
  }; */

  render() {
    return (
      <>
        <td>
          <input
            type="text"
            className="form-control"
            name="titre"
            value={this.props.values.titre}
            onChange={this.props.handleChange}
            onBlur={this.props.handleBlur}
          />
          {this.props.touched.titre && this.props.errors.titre && (
            <span style={{ color: "red" }}>{this.props.errors.titre}</span>
          )}
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            name="auteur"
            value={this.props.values.auteur}
            onChange={this.props.handleChange}
            onBlur={this.props.handleBlur}
          />
          {this.props.touched.auteur && this.props.errors.auteur && (
            <span style={{ color: "red" }}>{this.props.errors.auteur}</span>
          )}
        </td>
        <td>
          <input
            type="number"
            className="form-control"
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
        </td>
        <td>
          <Bouton typeBtn="btn-primary" clic={this.props.handleSubmit}>
            Valider
          </Bouton>
        </td>
      </>
    );
  }
}

export default withFormik({
  mapPropsToValues: (props) => ({
    titre: props.titre,
    auteur: props.auteur,
    nbPages: props.nbPages,
  }),
  validationSchema: Yup.object().shape({
    titre: Yup.string()
      .min(3, "Le titre doit avoir plus de 3 caractères")
      .max(15, "Le titre doit avoir au moins 15 caractères"),
    auteur: Yup.string().min(3, "L'auteur doit avoir plus de 3 caractères"),
    nbPages: Yup.number()
      .lessThan(1000, "Nombre de page < à 1000")
      .moreThan(50, "Nombre de page > à 50"),
  }),
  handleSubmit: (values, { props }) => {
    props.validationModification(
      props.id,
      values.titre,
      values.auteur,
      values.nbPages
    );
  },
})(FormulaireModification);
