import {
  useParams,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

function ReadPage(props) {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const { tno } = useParams();

  const page = queryParams.get("page") ? queryParams.get("page") : 1;
  const size = queryParams.get("size") ? queryParams.get("size") : 10;

  const queryStr = createSearchParams({ page: page, size: size }).toString();

  const moveToTno = (tno) => {
    navigate({ pathname: `/todo/modify/${tno}`, search: queryStr });
  };

  const moveToList = () => {
    navigate({ pathname: `/todo/list`, search: queryStr });
  };

  return (
    <div className={"text-3xl"}>
      ReadPage {tno}
      <div>
        <button onClick={() => moveToTno(tno)}>Test Modify</button>
        <button onClick={moveToList}>Test List</button>
      </div>
    </div>
  );
}

export default ReadPage;
