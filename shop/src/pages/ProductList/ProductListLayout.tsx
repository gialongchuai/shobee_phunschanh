import { useQuery } from "@tanstack/react-query";
import useQueryParams from "../../hooks/useQueryParams";
import { productApi } from "../../apis/product";

export default function ProductList() {
  const queryParams = useQueryParams();
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return productApi.getProducts(queryParams);
    },
  });
  console.log(data);

  return <div>ProductList</div>;
}
