import { Container } from "@mui/material";
import { useGetData } from "../../hooks/useGetData";
import { useEffect } from "react";
import Table from "../Table/Table";
import MainButton from "../../UI/MainButton";
import moment from "moment/moment";

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
      field: "course",
      headerName: "Course",
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
    {
      field: "date",
      headerName: "Date",
      headerClassName: "table-heading",
      width: "150",
    },
  ];
  const filterArray = data?.paymentData?.map((payment) => ({
    ...payment,
    id: payment._id,
    name: payment.studentName,
    date: moment(payment?.createdAt).format("YYYY-MM-DD"),
  }));
  console.log(filterArray);
  return (
    <Container
      sx={{
        margin: "4% auto",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <Table columns={column} heading={"All Payment"} rows={filterArray} />
      <MainButton title={"Go Back"} url={"/profile"} />
    </Container>
  );
};

export default PaymentsDetails;
