import React from "react";

export function MessageDialog(props) {
    //return (
    //  <Modal {...props} show={props.message} centered>
    //    <Modal.Body>{props.message}</Modal.Body>
    //    <Modal.Footer>
    //      <Button onClick={props.onHide}>Close</Button>
    //    </Modal.Footer>
    //  </Modal>
    //);
    return (
        <dialog open={!props.message == null}>
            <article>
                <header>
                    <button
                        aria-label="Close"
                        rel="prev"
                        onClick={props.onHide}
                    ></button>
                    <p>
                        <strong>{props.header}</strong>
                    </p>
                </header>
                <p>{props.message}</p>
            </article>
        </dialog>
    );
}
