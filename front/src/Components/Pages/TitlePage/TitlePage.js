import React, { Component } from "react";
import ProduceTabel from "../../Tables/ProduceTable/ProduceTabel";
import Grid from "@material-ui/core/Grid";

class TitlePage extends Component {
  render() {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} md={11}>
            <ProduceTabel></ProduceTabel>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default TitlePage;
