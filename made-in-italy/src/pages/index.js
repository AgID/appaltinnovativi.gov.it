import React from "react";

import {
  Container,
  Row,
  Col
} from "design-react-kit";

import Layout from "../components/layout-child";
import SEO from "../components/seo";

import "../components/style.css";

const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Homepage" description="Smarter Italy" />
      <main>
        <section className="section bg-radial-blue" id="percorso">
          <Container>
            <Row>
              <Col className="col-12">
                <h6 className="text-uppercase text-white-80 max-w-40">MADE IN ITALY</h6>
                <h2 className="text-white max-w-40">Placeholder</h2>
              </Col>

              

            </Row>
          </Container>
        </section>

        <div class="section section-muted py-5">
          <div class="container">
            <div class="col-12">
              Il programma “Made in Italy” intende realizzare una campagna straordinaria di comunicazione volta a sostenere le esportazioni italiane e l'internazionalizzazione del sistema economico nazionale nel settore agroalimentare e negli altri settori colpiti dall'emergenza derivante dalla diffusione del Covid-19.
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
