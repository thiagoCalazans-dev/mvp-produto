import { FormProduto } from "../../components/forms/Produto/FormProduto";

const Produto = () => {
    return (
            <div className="flex flex-col">
            <section className="p-5"><FormProduto/></section>
            <section className="">List</section>
            </div>
    )
}

export default Produto;