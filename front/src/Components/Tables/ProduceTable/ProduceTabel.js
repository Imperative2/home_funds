import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

const style = {
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 640,
  },
  headCell: {
    backgroundColor: "OrangeRed",
    color: "white",
  },
};

class ProduceTable extends React.Component {
  state = {
    products: [
      {
        id: "srajtasma",
        name: "srajtasma",
        data: ["janusz", "karol", "pazur", "miki", "zuku", "prezes"],
      },
      {
        id: "reczniki",
        name: "ręczniki papierow",
        data: ["karol", "pazur", "miki", "zuku", "prezes"],
      },
      {
        id: "plyn",
        name: "płyn do naczyn",
        data: ["karol", "pazur", "miki", "zuku", "prezes"],
      },
      {
        id: "worasy",
        name: "worasy",
        data: ["karol", "pazur", "miki", "zuku", "prezes"],
      },
      {
        id: "olejek",
        name: "olejek",
        data: ["karol", "pazur", "miki", "zuku", "prezes"],
      },
      {
        id: "mydelko",
        name: "mydełko",
        data: ["karol", "pazur", "miki", "zuku", "prezes"],
      },
      {
        id: "zmywaki",
        name: "zmywaki",
        data: ["karol", "pazur", "miki", "zuku", "prezes"],
      },
      {
        id: "kibel",
        name: "kibel",
        data: ["karol", "pazur", "miki", "zuku", "prezes"],
      },
      {
        id: "smieci",
        name: "śmieci",
        data: ["karol", "pazur", "miki", "zuku", "prezes"],
      },
    ],
  };

  render() {
    const { classes } = this.props;

    let longestColumn = 0;
    this.state.products.forEach((product) => {
      if (product.data.length > longestColumn) {
        longestColumn = product.data.length;
      }
    });

    const tableRows = [...Array(longestColumn).keys()].map((index) => {
      let rowCells = this.state.products.map((product) => {
        let value = null;

        if (product.data.length > index) {
          value = product.data[index];
        }

        return (
          <TableCell className="color: black" align="center" key={product.id}>
            {value}
          </TableCell>
        );
      });

      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
          {rowCells}
        </TableRow>
      );
    });

    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {this.state.products.map((product) => (
                  <TableCell className={classes.headCell} key={product.id}>
                    {product.name}
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
