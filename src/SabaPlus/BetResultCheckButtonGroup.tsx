import { useDispatch, useSelector } from "react-redux";
import { getBetResultCheckApi } from "../services/betResultCheckApi";
import { updateDataDisplay } from "../store/slices/betResultCheckSlice";
const SabaPlusButtonGroup = () => {
  const dispatch = useDispatch();
  const { betResultTicket } = useSelector((state) => state.betResultCheck);
  const handleOnClick = async (key) => {
    const response = await getBetResultCheckApi({ ticketNo: key });
    console.log(response);
    dispatch(updateDataDisplay({ request: response, response: null }));
  };

  return (
    <div className="button-group ticket-result-check">
      <h4 className="header-text ">Ticket No</h4>
      {betResultTicket.map((key, index) => (
        <div key={index}>
          <button
            className={`betting-btn next`}
            onClick={() => handleOnClick(key)}
          >
            {key}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SabaPlusButtonGroup;
