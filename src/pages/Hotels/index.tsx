import { Search, Favourites, View } from "widgets";
import { Container } from "shared";
import { Header, Wrapper } from "../components";

function Hotels() {
  return (
    <Container>
      <Header />
      <Wrapper>
        <Search />
        <Favourites />
        <View />
      </Wrapper>
    </Container>
  );
}

export default Hotels;
