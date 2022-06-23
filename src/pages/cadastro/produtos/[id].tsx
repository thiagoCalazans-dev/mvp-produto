import { useRouter } from "next/router";
import { useGet, useGetById } from "../../../hooks/useFetch";

const ProdutoDetails = () => {

const router = useRouter()
const params = String(router.query.id)

const {data, error, isLoading} = useGetById("produtos", params, params)

    return <>{data}</>
}

export default ProdutoDetails;