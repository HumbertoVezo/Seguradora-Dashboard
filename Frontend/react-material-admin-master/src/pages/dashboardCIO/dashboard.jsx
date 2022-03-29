import React from 'react'
import GraficoHardwares from "./GraficoHardwares";

class DashboardCIO extends React.Component {

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="end" />
              <h3 style={{ color: "#f9812a" }}>Gráficos</h3> <br />
              <div className="col-lg-5">

              </div>{" "}
              <br /> <br />

              {/* Adicionar graficos em baixo */}

              <div className="col-lg-12">
                 <GraficoHardwares />
              </div>

              <div className="col-lg-12">
                {" "}
                <br />
              </div>
              <div className="col-lg-12">
                {" "}
              </div>
              <div className="end" />
              <div className="col-lg-12">
                {" "}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default DashboardCIO;