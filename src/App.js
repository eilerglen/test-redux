import logo from "./logo.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncIncrementCreator,
  asyncDecrementCreator,
} from "../src/services/countReducer";
import { fetchUsers } from "../src/services/userReducer";
import style from "./style.css";

function App() {
  const count = useSelector((state) => state.countReducer.count);
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();

  return (
    <div className="app">
      <div className="count">{count}</div>
      <div className="btns">
        <button
          className="btn"
          onClick={() => dispatch(asyncIncrementCreator())}
        >
          ИНКРЕМЕНТ++
        </button>
        <button
          className="btn"
          onClick={() => dispatch(asyncDecrementCreator())}
        >
          ДЕКРЕМЕНТ--
        </button>
        <button className="btn" onClick={() => dispatch(fetchUsers())}>
          ПОЛУЧИТЬ ЮЗЕРОВ--
        </button>
      </div>
      <ul className="users">
        {users.map((user) => (
          <li key = {user.id} className="user">{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
