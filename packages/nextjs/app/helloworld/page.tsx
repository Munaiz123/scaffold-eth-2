"use client";

import { useEffect, useState } from "react";

export default function HelloWorld() {
  const [newText, setText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/helloworld")
      .then(res => res.json())
      .then(data => {
        console.log("data from backend === ", data);
        setData(data.result);
        setLoading(false);
      });
  }, []);

  const setNewText = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/helloworld?newText=${newText}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      console.log("response from backend ===", res);
      setData(res.result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">{Loading ? "Loading..." : data}</h2>
        <div className="form-control w-full max-w-xs my-4">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={newText}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <button className="btn btn-active btn-neutral" onClick={setNewText}>
          {" "}
          Set New Text{" "}
        </button>
      </div>
    </div>
  );
}
