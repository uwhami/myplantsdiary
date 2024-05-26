import React, { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: "",
  complete: false,
};

function ModifyComponent({ tno }) {
  const [todo, setTodo] = useState(initState);
  const [result, setResult] = useState(null);
  const { moveToRead, moveToList } = useCustomMove();

  useEffect(() => {
    getOne(tno).then((data) => {
      setTodo(data);
    });
  }, [tno]);

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  const handleChangeTodoComplete = (e) => {
    todo.complete = e.target.value === "Y";
    setTodo({ ...todo });
  };

  const handleClickModify = () => {
    putOne(todo).then((data) => {
      console.log("modify result " + data);
      setResult(data.RESULT === "SUCCESS" ? "Modified" : null);
    });
  };

  const handleClickDelete = () => {
    deleteOne(tno).then((data) => {
      console.log("delete result", data);
      setResult(data.RESULT === "SUCCESS" ? "Deleted" : null);
    });
  };

  const closeModal = () => {
    if (result === "Deleted") {
      moveToList();
    } else if (result === "Modified") {
      moveToRead(tno);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="border-2 order-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TNO</div>
          <input
            className="w-4/5 p-6 rounded-r border border-neutral-200 shadow-md bg-gray-100 opacity-70"
            name="tno"
            type={`text`}
            value={todo.tno}
            readOnly={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <input
            className="w-4/5 p-6 rounded-r border border-neutral-200 shadow-md bg-gray-100 opacity-70"
            name="writer"
            type={`text`}
            value={todo.writer}
            readOnly={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-200 shadow-md"
            name="title"
            type={`text`}
            value={todo.title}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DUE DATE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-200 shadow-md"
            name="dueDate"
            type={`date`}
            value={todo.dueDate}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
          <select
            name="status"
            className="border-solid border-neutral-200 border-2 rounded m-1 p-2"
            onChange={handleChangeTodoComplete}
            value={todo.complete ? "Y" : "N"}
          >
            <option value="Y">Completed</option>
            <option value="N">Not Yet</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify}
        >
          Modify
        </button>
      </div>

      {result ? (
        <ResultModal
          title="처리 결과"
          content={`${result} ${tno} Completed`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ModifyComponent;
