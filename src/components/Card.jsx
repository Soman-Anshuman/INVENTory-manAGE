import React, { memo, useState } from "react";

function Card({ props, handleDelete, handleModify, logged }) {
  const [modiPanel, setModiPanel] = useState(false);

  return (
    <>
      {!modiPanel && (
        <div className="flex flex-col justify-between max-w-[280px] rounded-xl p-3 bg-yellow-400/50 shadow-lg shadow-gray-400">
          <div className="bg-gray-400 h-64 w-64">
            <img src={props.thumbnail} alt="No image available" />
          </div>
          <h2 className="font-bold">{props.title}</h2>
          <i>
            Price: <span className="text-green-500">$</span>
            {props.price}
          </i>
          <p>Quantity left: {props.stock}</p>
          {logged && (
            <div className="self-center space-x-1">
              <button
                onClick={() => setModiPanel(true)}
                className="py-1 px-3 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-700"
              >
                Modify Card
              </button>
              <button
                onClick={() => handleDelete(props.id)}
                className="py-1 px-3 rounded-lg bg-red-400 text-white cursor-pointer hover:bg-red-700"
              >
                Delete Card
              </button>
            </div>
          )}
        </div>
      )}

      {/* Card modifying panel */}
      {modiPanel && logged && (
        <form
          onSubmit={handleModify}
          className="flex flex-col justify-between gap-1 max-w-[280px] rounded-xl p-3 bg-yellow-400/50 shadow-lg shadow-gray-400"
        >
          <div className="bg-gray-400 h-64 w-64">
            <img src={props.thumbnail} alt="No image available" />
          </div>
          <input type="text" name="id" defaultValue={props.id} className="hidden"/>
          {/* doing this to include 'id' in formData too */}
          <input
            type="text"
            name="title"
            defaultValue={props.title}
            className="rounded-md border bg-white text-black"
          />
          <i>
            Price: <span className="text-green-500">$</span>
            <input
              type="text"
              name="price"
              defaultValue={props.price}
              className="rounded-md border bg-white text-black"
            />
          </i>
          <p>
            Quantity left:
            <input
              type="text"
              name="stock"
              defaultValue={props.stock}
              className="rounded-md border bg-white text-black"
            />
          </p>
          <div className="self-center space-x-1.5">
            <button
              type="submit"
              className="py-1 px-3 rounded-lg bg-red-400 text-white cursor-pointer hover:bg-red-700"
            >
              Done
            </button>
            <button
              onClick={() => setModiPanel(false)}
              className="py-1 px-3 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default memo(Card);
