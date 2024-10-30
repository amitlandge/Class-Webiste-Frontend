import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import feesAmount from "../../utils/feesAmount.js";
import { usePostUpdate } from "../../hooks/usePostUpdate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetData } from "../../hooks/useGetData.js";
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = resolve;
    document.body.appendChild(script);
  });
const Payment = () => {
  const navigate = useNavigate();
  const [data] = useGetData("api/v1/payment/getPaymentData");
  const [getKey] = useGetData("api/v1/payment/sendKey");

  const totalAmount = data?.paymentData?.reduce((accumulator, current) => {
    return accumulator + current.amount;
  }, 0);
  console.log(data);
  const { enrollDetails } = useSelector((state) => state.enroll);
  console.log(enrollDetails?.grade);
  const fees = feesAmount(enrollDetails?.grade);
  console.log(fees);
  const [amount, setAmount] = useState("");
  const [, putPostmethod] = usePostUpdate();
  const handlePayment = async () => {
    await loadRazorpayScript();
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK failed to load. Please try again later.");
      return;
    }
    try {
      const payload = {
        method: "POST",
        url: "api/v1/payment/razorpay",
        payload: {
          studentName: `${enrollDetails?.firstName} ${enrollDetails?.lastName}`,
          className: enrollDetails?.grade,
          amount,
        },
      };
      const response = await putPostmethod(payload);
      const data = response?.data;
      const options = {
        key: getKey?.key_id,
        amount: data.amount * 100,
        currency: "INR",
        name: "Class Fees Payment",
        description: "Pay your class fees securely",
        order_id: data.orderId,
        handler: async (response) => {
          const payload = {
            method: "POST",
            url: "api/v1/payment/create-payment",
            payload: {
              orderId: data.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              studentName: `${enrollDetails?.firstName} ${enrollDetails?.lastName}`,
              className: enrollDetails?.grade,
              amount,
            },
            message: "Payment Successfully",
          };
          const res = await putPostmethod(payload);
          if (res.status === 200) {
            navigate("/profile");
          }
        },
        theme: { color: "#1976d2" },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <Container
      sx={{
        textAlign: "center",
      }}
      style={{ marginTop: "50px" }}
    >
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Pay Your Fees
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {enrollDetails?.firstName} {enrollDetails?.lastName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            type="number"
          />
          <Typography variant="body" align="center" gutterBottom>
            <strong>Total Fees</strong> : {fees} Rs
          </Typography>
          <Typography variant="body" align="center" gutterBottom>
            <strong>Total Paid</strong> : {totalAmount} Rs
          </Typography>
          <Typography variant="body" align="center" gutterBottom>
            <strong>Remaining</strong> : {fees - totalAmount} Rs
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            sx={{ mt: 3 }}
          >
            Pay Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Payment;
