import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import "./App.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const initialValues = {
    taskName: "",
    date: null,
    time: null,
  };
  const [addValue, setAddValue] = useState(initialValues); //task name value
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState("");

  const [editModal, setEditModal] = useState(false);
  const closeEditModal = () => setEditModal(false);
  const showEditModal = () => setEditModal(true);

  const [datePicker, setDatePicker] = useState(false);
  const closeDatePicker = () => setDatePicker(false);
  const showDatePicker = () => setDatePicker(true);

  const [timePicker, setTimePicker] = useState(false);
  const closeTimePicker = () => setTimePicker(false);
  const showTimePicker = () => setTimePicker(true);

  const showDatePickerModal = () => {
    showDatePicker();
  };
  const showTimePickerModal = () => {
    closeDatePicker();
    showTimePicker();
  };
  const handleChange = (e) => {
    setAddValue({ ...addValue, [e.target.name]: e.target.value });
  };

  const addTableValue = () => {
    closeTimePicker();
    setData([...data, addValue]);
    toast.success("Task Added in the List");
    setAddValue(initialValues);
  };

  const forEdit = (item) => {
    showEditModal();
    setAddValue(item);
  };

  console.log(addValue, "add");

  return (
    <div className="App">
      <Container>
        <div>
          <h1 className="text-center">TODO LIST</h1>

          <div className="search_inputField">
            <input type="text" placeholder="Search..." />
          </div>

          <table className="my-5">
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data &&
              data?.map?.((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.taskName}</td>
                    <td>{item.time}</td>
                    <td>{item.date}</td>
                    <td>
                      <button
                        className="mx-1 btn btn-warning px-3"
                        onClick={() => forEdit(item)}
                      >
                        <AiFillEdit size={20} />
                      </button>

                      <button className="mx-1 btn btn-danger px-3">
                        <AiFillDelete size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>

          <Row className="m-0">
            <Col md={11}>
              <input
                type="text"
                className="w-100 p-2 add_todo_value"
                placeholder="Add ToDo..."
                name="taskName"
                value={addValue.taskName}
                id="taskName"
                onChange={handleChange}
              />
              {/* task Name */}
            </Col>
            <Col md={1}>
              <button
                className="btn btn-primary"
                onClick={() => showDatePickerModal()}
              >
                Add
              </button>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Date Picker  */}
      <Modal show={datePicker} onHide={closeDatePicker}>
        <Modal.Header closeButton>
          <Modal.Title>Select Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="date"
            name="date"
            value={addValue.date}
            id="date"
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDatePicker}>
            Close
          </Button>
          <Button variant="primary" onClick={() => showTimePickerModal()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Date Picker  */}

      {/* Time picker  */}
      <Modal show={timePicker} onHide={closeTimePicker}>
        <Modal.Header closeButton>
          <Modal.Title>Select Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="time"
            name="time"
            id="time"
            value={addValue.time}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeTimePicker}>
            Close
          </Button>
          <Button variant="primary" onClick={() => addTableValue()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Time picker  */}

      {/* edit modal  */}
      <Modal show={editModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <input
              type="text"
              name="editedName"
              id="editedName"
              value={addValue.taskName}
              onChange={(e) => e.target.value}
            />
            <input
              type="date"
              name="editedDate"
              id="editedDate"
              value={addValue.date}
              onChange={(e) => e.target.value}
            />
            <input
              type="time"
              name="editedTime"
              id="editedTime"
              value={addValue.time}
              onChange={(e) => e.target.value}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={closeEditModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* edit modal  */}
      <ToastContainer />
    </div>
  );
};

export default App;
