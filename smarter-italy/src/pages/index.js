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
                <h6 className="text-uppercase text-white-80 max-w-40">SMARTER ITALY</h6>
                <h2 className="text-white max-w-40">Placeholder</h2>
              </Col>
            </Row>
          </Container>
        </section>

        <div class="section section-muted py-5">
          <div class="container">
            <div class="col-12">
              <h2></h2>
              l programma Smarter Italy del Ministero dello Sviluppo Economico del Ministero dell'Università e della Ricerca e del MID - Dipartimento per la Trasformazione Digitale della Presidenza del Consiglio dei Ministri, attuato dall'Agenzia per l'Italia Digitale, si pone l’obiettivo di accelerare la crescita del Paese attraverso l’utilizzo degli appalti innovativi.
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
