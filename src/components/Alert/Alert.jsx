const alert = (props) => {
  const alertCSS = `alert ${props.typeAlert}`;
  return (
    <div className={alertCSS} role="alert">
      {props.children}
    </div>
  );
};

export default alert;
