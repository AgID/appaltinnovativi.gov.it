import React from "react";

import {
  Container,
  Row,
  Col
} from "design-react-kit";

import Layout from "../components/layout-child";
import SEO from "../components/seo";

import "../components/style.css";

//Sostituire la stringa NomeSitoChild con il nome del sito child, la stringa PlaceHolder con un eventuale placeholder(si può omettere)
//e sostituire la stringa DescrizioneSitoChild con la descrizione del sito child
const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Homepage" description="NomeSitoChild" />
      <main>
        <section className="section bg-radial-blue" id="percorso">
          <Container>
            <Row>
              <Col className="col-12">
                <h6 className="text-uppercase text-white-80 max-w-40">NomeSitoChild</h6>
                <h2 className="text-white max-w-40">PlaceHolder</h2>
              </Col>

              

            </Row>
          </Container>
        </section>

        <div class="section section-muted py-5">
          <div class="container">
            <div class="col-12">
              DescrizioneSitoChild
            </div>
          </div>
        </div>
        <div className="col-12 mt-3 mb-3 text-center">
          <a className="btn btn-primary" href="/il-programma">Vedi altro</a>
        </div>
        
      </main>
    </Layout>
  );
}

export default IndexPage;
