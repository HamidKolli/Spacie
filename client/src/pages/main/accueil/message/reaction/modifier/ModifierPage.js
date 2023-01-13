import React from "react";
import NewMessage from "../../NewMessage";

const ModifierPage = (props) => {
  return (
    <div id="modifier-page">
      <NewMessage
        serveur={props.serveur}
        setPage={props.setPage}
        erreur={props.erreur}
        message={props.message}
      />
    </div>
  );
};

export default ModifierPage;
