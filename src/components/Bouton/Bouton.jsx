const bouton = (props) => {
  const btnCSS = `btn ${props.typeBtn} ${props.css}`;
  return (
    <button className={btnCSS} onClick={props.clic}>
      {props.children}
    </button>
  );
};

export default bouton;
