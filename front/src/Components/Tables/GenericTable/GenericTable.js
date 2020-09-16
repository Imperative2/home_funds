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

const style = {
  root: {
    margin: "10px",
  },
  container: {
    maxHeight: "85vh",
    maxWidth: 900,
  },
  headCell: {
    backgroundColor: "Orange",
    color: "white",
  },
};

class GenericTable extends React.Component {
  render() {
    const { classes } = this.props;

    let longestColumn = 0;
    this.props.data.forEach((column) => {
      if (column.data.length > longestColumn) {
        longestColumn = column.data.length;
      }
    });

    const tableRows = [...Array(longestColumn).keys()].map((index) => {
      let rowCells = this.props.data.map((column) => {
        let value = null;

        if (column.data.length > index) {
          value = column.data[index];
        }

        return (
          <TableCell className="color: black" align="center" key={column.id}>
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
      <Paper className={classes.container}>
        <TableContainer component={Paper}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {this.props.data.map((entry) => (
                  <TableCell
                    className={classes.headCell}
                    key={entry.id}
                    align="center"
                  >
                    {entry.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}

export default withStyles(style)(GenericTable);
