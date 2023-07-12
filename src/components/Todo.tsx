import { useState, useEffect } from "react";

const axios = require("axios");

function Todo() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // const [status, seStatus] = useState(false);
  let status = false;
  const [list, setList] = useState([]);
  let n = 1;
  const api = `https://e-commerce-backend-20lo.onrender.com/todo`;

  const getData = () => {
    fetch(`${api}`)
      .then((d) => d.json())
      .then((res) => {
        setList(res);
      });
  };
  const postData = () => {
    const data = {
      title,
      date,
      time,
      status,
    };
    if (data.title !== "" && data.date !== "" && data.time !== "") {
      // console.log(data)
      axios({
        method: "post",
        url: api,
        data,
      })
        .then((res: any) => {
          // console.log(res.data)
        })
        .then(getData);
    } else {
      alert("Fill all feilds");
    }
  };

  const removeComplete = (e: any) => {
    if (e.statue == true) {
      axios.delete(api + "/" + e.id);
    }
  };

  const deleteAll = () => {
    setList(list.filter(removeComplete));
    getData();
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <input type="text" name="title" id="title" onChange={handleChange} />
        <br />
        <input
          type="date"
          name="date"
          id="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <br />
        <input
          type="time"
          name="time"
          id="time"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <br />
        <button
          onClick={
            postData
            // console.log(title, date, time, status)
          }>
          Add
        </button>

        <br />
        <button onClick={deleteAll}>Delete all complete Tasks</button>
        {/* <input type="checkbox"  onChange={(e) => seStatus(!status)}/> */}
        {/* <input
    type=checkbox"
    value="check"
    onChange={(e) => this.setState({check: !check.value})}
  />  */}
      </div>
      <div>
        <table id="table">
          <thead>
            <tr>
              <td>Index</td>
              <td>Title</td>
              <td>Time</td>
              <td>Date</td>
              <td>Status</td>
              <td>Actions</td>
              <td>Delete Task</td>
            </tr>
          </thead>
          <tbody>
            {list.map((e: any) => {
              return (
                <tr key={e.id}>
                  <td>{n++}</td>
                  <td>{e.title}</td>
                  <td>{e.time}</td>
                  <td>{e.date}</td>
                  <td>{e.statue ? "Complete" : "Incomplete"}</td>
                  <td>
                    <button
                      onClick={() => {
                        axios
                          .patch(api + "/" + e.id, {
                            statue: !e.statue,
                          })
                          .catch((error: any) => console.log(error))
                          .then(getData);
                      }}>
                      Change
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        axios.delete(api + "/" + e.id).then(getData);
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Todo;
