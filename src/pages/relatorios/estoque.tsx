import { Container } from "../../components/Container";
import Table from "../../components/Table";

const Estoque = () => {
  return (
    <Container>
      <Table.Container>
        <Table.Head>
          <Table.TitleColumns title="Código" />
          <Table.TitleColumns title="Produto" />
          <Table.TitleColumns title="Quantidade" />
        </Table.Head>
        <Table.Body className="grow">
            <Table.Row>
                <Table.Data>01</Table.Data>
                <Table.Data>Produto 01</Table.Data>
                <Table.Data>100</Table.Data>
            </Table.Row>
        </Table.Body>
        <Table.Footer/>
    
      </Table.Container>
    </Container>
  );
};

export default Estoque;
