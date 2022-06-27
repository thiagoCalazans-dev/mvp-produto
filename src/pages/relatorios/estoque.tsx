import { useRouter } from "next/router";
import { useState } from "react";
import { Container } from "../../components/Container";
import Table from "../../components/Table";
import { useModal } from "../../hooks/useModal";

interface Estoque {
  id: number;
    codigo: number;
    produto: string;
    quantidade: string;
}

const TableContent = [
  {
    id: 1,
    codigo: 1,
    produto: "produto 1",
    quantidade: "100",  
  },
  {
    id: 2,
    codigo: 2,
    produto: "produto 2",
    quantidade: "200",  
  },
  {
    id: 10,
    codigo: 10,
    produto: "produto 10",
    quantidade: "1000",  
  },
  {
    id: 3,
    codigo: 3,
    produto: "produto 3",
    quantidade: "300",  
  },
  {
    id: 4,
    codigo: 4,
    produto: "produto 4",
    quantidade: "400",  
  },
  {
    id: 5,
    codigo: 5,
    produto: "produto 5",
    quantidade: "500",  
  },
  {
    id: 6,
    codigo: 6,
    produto: "produto 6",
    quantidade: "600",  
  },
  {
    id: 7,
    codigo: 7,
    produto: "produto 7",
    quantidade: "700",  
  },
  {
    id: 8,
    codigo: 8,
    produto: "produto 8",
    quantidade: "800",  
  },
  {
    id: 9,
    codigo: 9,
    produto: "produto 9",
    quantidade: "900",  
  },
]

const Estoque = () => {
  const {Modal, setModal} = useModal() 
  const [estoque, setEstoque] = useState<Estoque>({} as Estoque)
  const router = useRouter();

  const handleOptionsClick = (item: Estoque) => {
    setEstoque(item),
    router.push(`/relatorios/estoque/?id=${item.id}`, undefined, { shallow: true })
    setModal(true)
  }

    return(  

   <Container>
      <Table.Container>
        <Table.Head>
          <Table.TitleColumns className="w-20" title="Código" />
          <Table.TitleColumns className="grow text-left" title="Produto" />
          <Table.TitleColumns className="w-32 text-center" title="Quantidade" />
          <Table.TitleColumns className="w-32 text-center" title="Options" />
        </Table.Head>
        <Table.Body className="grow">          
             { TableContent.map((item) => (
              <Table.Row key={item.id} >
              <Table.Data className="w-20 text-center border-r-base">{item.codigo}</Table.Data>
              <Table.Data className="grow border-r-base">{item.produto}</Table.Data>
              <Table.Data className="w-32 text-center">{item.quantidade}</Table.Data>
              <Table.Data className="w-32 text-center"><button className="hover:bg-brand-secondary" onClick={() => handleOptionsClick(item)}>Open Modal</button></Table.Data>
              </Table.Row>
             )) }                      
        </Table.Body>    
     </Table.Container>
    
     <Modal onCloseModal={() => console.log ("modal")}><ul>
      <li>{estoque.codigo}</li>
      <li>{estoque.produto}</li>
      <li>{estoque.quantidade}</li>
      </ul></Modal>
    </Container>

  );
};

export default Estoque;



