import {Container} from "react-bootstrap"

import Header from "./_partials/header"
import Index from "./index/index"
import Footer from "./_partials/footer"

import Notification from "./_partials/notification/notifications"

function App() {
  return (
    <Container fluid className="p-0">
      <Notification/>
      <Header/>
      <Index/>
      <Footer/>
    </Container>
  );
}

export default App;
