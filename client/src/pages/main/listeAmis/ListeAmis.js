import React from "react";
import Ami from "./Ami";

const ListeAmis = (props) => {
  return (
    <div>
      {props.users.map((user, index) => (
        <Ami
          key={index}
          user={user}
          setPage={props.setPage}
          refresh={props.refresh}
        />
      ))}
    </div>
  );
};

export default ListeAmis;
