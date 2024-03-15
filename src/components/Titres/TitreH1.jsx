import classes from "./TitreH1.module.css";

const titreH1 = (props) => {
  const titreCSS = `${classes.policeTitre} border border-dark p-2 mt-2 text-white text-center bg-primary rounded`;
  return <h1 className={titreCSS}>{props.children}</h1>;
};

export default titreH1;
