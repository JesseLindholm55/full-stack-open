import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch({ type: "CHANGE_FILTER", value: event.target.value });
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter: <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
