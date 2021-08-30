import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

function Model(props) {
  const [modalShow, setModalShow] = React.useState(true);

  function close() {
    setModalShow((pre) => !pre);
    props.fn(false);
  }
  return (
    <Modal
      show={modalShow}
      onHide={close}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Card>
        <Card.Img src={props.modelimg} className='model-img' />
      </Card>
    </Modal>
  );
}

//   render(<App />);

export default Model;
