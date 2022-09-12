import { Container, Text, Title } from "@mantine/core";
import useStyles from "./Jumbotron.styles";
import { Dots } from "./Dots";

export function Jumbotron() {
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Let the{" "}
          <Text component="span" className={classes.highlight} inherit>
            World
          </Text>{" "}
          Know What Are You Doing
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            or maybe not but it&#39;s okay if you feel that way. My idea is that
            I can periodically updating and showing my interest on Twitter.
          </Text>
        </Container>
      </div>
    </Container>
  );
}
