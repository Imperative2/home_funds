import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";

import NewsCard from "../../Cards/NewsCard/NewsCard";

const style = {};

class NewsPage extends React.Component {
  state = {
    news: [
      { name: "bling", description: "blingsHouse" },
      { name: "rupert's", description: "ruperts house" },
    ],
  };

  render() {
    const { classes } = this.props;

    const news = this.state.news.map((news) => {
      return (
        <Grid item key={news.name}>
          <NewsCard name={news.name} description={news.description}></NewsCard>
        </Grid>
      );
    });

    return (
      <Container maxWidth="md">
        <Grid container direction="column" spacing={2}>
          <Grid item>News</Grid>
          <Grid item>
            <InputBase defaultValue="Search"></InputBase>
          </Grid>
          <Grid item>tekst</Grid>
        </Grid>
        {news}
      </Container>
    );
  }
}

export default withStyles(style)(NewsPage);
