import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";

function UserData() {
  const [data, setData] = useState([]);
  const [pagecount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pagedata, SetPageData] = useState([]);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    const limit = 5;
    const skip = limit * page;
    const dataskip = data.slice(skip - limit, skip);
    setPageCount(Math.ceil(data.length / limit));
    SetPageData(dataskip);
  }, [data]);

  async function getData() {
    const response = await axios.get("https://dummyjson.com/products");
    console.log(response.data.products);
    setData(response.data.products);
  }

  function handleprev() {
    if (page === 1) return page;
    setPage(page - 1);
  }

  function handlenext() {
    if (page === pagecount) return page;
    setPage(page + 1);
  }

  return (
    <div>
      <h1>products</h1>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITTLE</th>
            <th>DESCRIPTON</th>
            <th>PRICE</th>
            <th>IMAGE</th>
          </tr>
        </thead>
        <tbody>
          {pagedata.length > 0 ? (
            pagedata.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    {" "}
                    <img
                      src={item.thumbnail}
                      alt=""
                      style={{ width: "60px" }}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={handleprev} disabled={page === 1} />

        {Array(pagecount)
          .fill(null)
          .map((element,index) => {
            return (
              <>
                <Pagination.Item active={page==index+1?true:false} onClick={()=>setPage(index+1)}> {index + 1}</Pagination.Item>
              </>
            );
          })}

        <Pagination.Next onClick={handlenext} disabled={page === pagecount} />
      </Pagination>
    </div>
  );
}

export default UserData;
