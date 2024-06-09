import React from "react";
import ReadComponent from "../../components/products/ReadComponent";
import { useParams } from "react-router-dom";

function ReadPage(props) {
  const { pno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">Product Read Page Component</div>
      <ReadComponent pno={pno} />
    </div>
  );
}

export default ReadPage;
