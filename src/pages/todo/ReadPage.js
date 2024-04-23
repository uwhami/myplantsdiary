import {
  useParams,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { useCallback } from "react";
import ReadComponent from "../../components/todo/ReadComponent";

function ReadPage(props) {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const { tno } = useParams();

  const page = queryParams.get("page") ? queryParams.get("page") : 1;
  const size = queryParams.get("size") ? queryParams.get("size") : 10;

  const queryStr = createSearchParams({ page: page, size: size }).toString();

  // const moveToTno = (tno) => {
  //   navigate({ pathname: `/todo/modify/${tno}`, search: queryStr });
  // };

  const moveToList = () => {
    navigate({ pathname: `/todo/list`, search: queryStr });
  };

  const moveToModify = useCallback((tno) => {
    navigate({ pathname: `/todo/modify/${tno}`, search: queryStr });
  }, [tno, page, size]);

  return (
    <div className="font-extrabold w-full bg-white mt-6">
      <div className="text-2xl">
        Todo Read Page Component {tno}
      </div>

      <ReadComponent tno={tno} />
    </div>
  );
}

export default ReadPage;
