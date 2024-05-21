import { useSearchParams } from "react-router-dom";
import ListComponent from "../../components/todo/ListComponent";

function ListPage(props) {
  const [queryParams] = useSearchParams();

  // 주소창에 있는 정보를 이용해서 list를 부르기 때문에 파라미터를 따로 보낼 필요가 없다.
  // const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  // const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        {/* Todo List Page Component Page --- {page} --- {size} */}
      </div>
      <ListComponent />
    </div>
  );
}

export default ListPage;
