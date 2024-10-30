import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const Table = (prop) => {
  const { rows = [], columns = [], heading } = prop;

  return (
    <Container
      sx={{
        height: "auto",
        ".table-heading": {
          color: "white",
          background: "gray",
        },
      }}
    >
      <Paper
        sx={{
          padding: "1rem 2rem",
          width: "100%",
        }}
      >
        <Typography variant="h5" padding={"1rem"}>
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
           
            maxWidth: "90vw",
            maxHeight: "80vh",
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              padding: "8px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          checkboxSelection={false}
        />
      </Paper>
    </Container>
  );
};

export default Table;
