import { Container } from "../../components/Container";
import Table from "../../components/Table";
import { Document, Page } from 'react-pdf'
import React, { useState } from 'react';
import { PDFViewer } from "../../reports/EstoqueReport";

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

    return(  

      <PDFViewer/>
    // <Container>
    //   <Table.Container>
    //     <Table.Head>
    //       <Table.TitleColumns title="Código" />
    //       <Table.TitleColumns title="Produto" />
    //       <Table.TitleColumns title="Quantidade" />
    //     </Table.Head>
    //     <Table.Body className="grow">
          
    //          { TableContent.map((item) => (
    //           <Table.Row key={item.id}>
    //           <Table.Data>{item.codigo}</Table.Data>
    //           <Table.Data>{item.produto}</Table.Data>
    //           <Table.Data>{item.quantidade}</Table.Data>
    //           </Table.Row>
    //          )) }
          
    //     </Table.Body>    
    //  </Table.Container>
    // </Container>

  );
};

export default Estoque;



