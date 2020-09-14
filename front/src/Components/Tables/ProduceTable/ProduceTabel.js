import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

import ViewProductDialog from "../../Dialog/ViewProductDialog/ViewProductDialog";

const style = {
  root: {
    margin: "10px",
  },
  container: {
    maxHeight: "85vh",
  },
  headCell: {
    backgroundColor: "OrangeRed",
    color: "white",
    border: "1px solid black",
  },
  cellColor: {
    backgroundColor: "red",
  },
  ho: {
    "&:hover": {
      background: "red !important",
    },
  },
};

class ProduceTable extends React.Component {
  state = {
    open: false,
  };

  handleOnClick = () => {
    this.setState({ ...this.state, open: true });
  };

  handleClose = () => {
    console.log("closing");
    this.setState({ ...this.state, open: false });
  };

  render() {
    const { classes } = this.props;

    let longestColumn = 0;

    this.props.householdProducts.forEach((householdProduct) => {
      if (householdProduct.userHouseholdProductList.length > longestColumn) {
        longestColumn = householdProduct.userHouseholdProductList.length;
      }
    });

    let key = 0;

    const tableRows = [...Array(longestColumn).keys()].map((index) => {
      let rowCells = this.props.householdProducts.map((householdProduct) => {
        let user = null;
        if (householdProduct.userHouseholdProductList.length > index) {
          let userId =
            householdProduct.userHouseholdProductList[index].user.userId;
          this.props.householdUsers.forEach((householdUser) => {
            if (householdUser.user.userId === userId) {
              user = householdUser.user;
            }
          });
        }

        if (user != null) {
          return (
            <ViewProductDialog
              key={key++}
              householdProduct={householdProduct}
              user={user}
              userHouseholdProduct={
                householdProduct.userHouseholdProductList[index]
              }
            ></ViewProductDialog>
          );
        } else {
          return (
            <TableCell
              style={{ backgroundColor: "white", color: "white" }}
              align="center"
              key={key++}
            >
              {null}
            </TableCell>
          );
        }
      });

      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
          {rowCells}
        </TableRow>
      );
    });

    // const tableRows = [...Array(longestColumn).keys()].map((index) => {
    //   let rowCells = this.state.products.map((product) => {
    //     let value = null;

    //     if (product.data.length > index) {
    //       value = product.data[index];
    //     }

    //     return (
    //       <TableCell className="color: black" align="center" key={product.id}>
    //         {value}
    //       </TableCell>
    //     );
    //   });

    //   return (
    //     <TableRow hover role="checkbox" tabIndex={-1} key={index}>
    //       {rowCells}
    //     </TableRow>
    //   );
    //});

    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {this.props.householdProducts.map((householdProduct) => (
                  <TableCell
                    className={classes.headCell}
                    key={householdProduct.productId}
                    align="center"
                  >
                    {householdProduct.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </Paper>
    );
  }
}

export default withStyles(style)(ProduceTable);

// function StickyHeadTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
// }
