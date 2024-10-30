import { Container } from "@mui/material";
import { useGetData } from "../../hooks/useGetData";
import { useEffect } from "react";
import Table from "../Table/Table";

const PaymentsDetails = () => {
  const [data, getInitialData] = useGetData("api/v1/payment/getPaymentData");
  useEffect(() => {
    getInitialData();
  }, []);
  const column = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "table-heading",
      width: "200",
    },

    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-heading",
      width: "150",
    },
    {
      field: "paymentId",
      headerName: "Payment ID",
      headerClassName: "table-heading",
      width: "200",
    },
    {
      field: "orderId",
      headerName: "Order ID",
      headerClassName: "table-heading",
      width: "150",
    },
    {
      field: "amount",
      headerName: "Amount (Rs)",
      headerClassName: "table-heading",
      width: "150",
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "table-heading",
      width: "150",
    },
  ];
  const filterArray = data?.paymentData?.map((payment) => ({
    ...payment,
    id: payment._id,
  }));
  return (
    <Container>
      <Table columns={column} heading={"All Payment"} rows={filterArray} />
    </Container>
  );
};

export default PaymentsDetails;
