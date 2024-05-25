import React, { useState } from "react";
import ModifyComponent from "../../components/todo/ModifyComponent";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

function ModifyPage() {
  const { tno } = useParams();
  const navigate = useNavigate();

  const moveToRead = () => {
    navigate({ pathname: `/todo/read/${tno}` });
  };

  const moveToList = () => {
    navigate({ pathname: `/todo/list` });
  };

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">Todo Modify Page</div>
      <ModifyComponent tno={tno} />
    </div>
  );
}

export default ModifyPage;
