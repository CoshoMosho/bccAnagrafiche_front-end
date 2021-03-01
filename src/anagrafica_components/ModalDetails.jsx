import React, { Component } from "react";
import Modal from "react-modal";
import Checkbox from "@material-ui/core/Checkbox";
import "../custom.css";

class ModalDetails extends Component {
  state = {
    modalData: {},
    postData: {
      email: false,
      firma: false,
      id: 0,
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
      telefono: false,
    },
    flagConferma: false,
  };

  async setFlagIn() {
    const postData = { ...this.state.postData };
    postData["id"] = this.props.modalData.id;
    await this.setState({ postData });
    await this.setState({ flagConferma: false });
    this.props.setPostData(this.state.postData);
  }

  handleCheckboxClick(key) {
    const postData = { ...this.state.postData };
    postData[key] = !postData[key];
    this.setState({ postData });
  }

  render() {
    const {
      filiali,
      id,
      cab,
      codice,
      lastModify,
      confermato,
      p7,
      ...elements
    } = this.props.modalData;
    const postData = this.state.postData;
    return (
      <Modal
        isOpen={this.props.modalFlag}
        onRequestClose={() => this.props.setFlag()}
        shouldCloseOnOverlay={false}
        //check  ariaHideApp={false}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "grey",
          },
          content: { color: "grey" },
        }}
      >
        {this.state.flagConferma === false && confermato === true && (
          <div style={{ textAlign: "center" }}>
            <p>confermato con codice univoco {codice}</p>
            <button
              onClick={() => this.props.setFlag()}
              className="btn btn-secondary"
            >
              chiudi
            </button>
          </div>
        )}
        {this.state.flagConferma === false && confermato === false && (
          <div style={{ textAlign: "center" }}>
            <h4>Dettagli anagrafica</h4>
            <table className="table-borderless">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(elements).map((key) => {
                  return (
                    <tr key={key}>
                      <td>{`${key}`}</td>
                      <td>
                        {(elements[key] === true && (elements[key] = "sì")) ||
                          (elements[key] === false && (elements[key] = "no")) ||
                          `${elements[key]}`}
                      </td>
                      <td>
                        {key in postData && (
                          <Checkbox
                            id={key}
                            defaultChecked={false}
                            color="default"
                            inputProps={{
                              "aria-label": "checkbox with default color",
                            }}
                            onClick={() => {
                              this.handleCheckboxClick(key);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>
                    <button
                      onClick={() => this.setState({ flagConferma: true })}
                      className="btn btn-secondary"
                    >
                      conferma
                    </button>
                  </td>
                  <td></td>
                  <td>
                    <button
                      onClick={() => this.props.setFlag()}
                      className="btn btn-secondary"
                    >
                      annulla
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {this.state.flagConferma === true && (
          <React.Fragment>
            <p>
              i campi contrassegnati con "sì" sono da modificare. Sei sicuro?
            </p>

            <table
              className="table table-borderless"
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(postData).map((key) => {
                  return (
                    key !== "id" && (
                      <tr key={key}>
                        <td>{`${key}`}</td>
                        <td>
                          {(postData[key] === true && "sì") ||
                            (postData[key] === false && "no") ||
                            `${postData[key]}`}
                        </td>
                      </tr>
                    )
                  );
                })}
                <tr>
                  <td>
                    <button
                      onClick={() => this.setFlagIn()}
                      className="btn btn-secondary"
                    >
                      conferma
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => this.props.setFlag()}
                      className="btn btn-secondary"
                    >
                      annulla
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

export default ModalDetails;
