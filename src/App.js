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
  const [edit, setEdit] = useState(initialValues);

  const [editModal, setEditModal] = useState(false);
  const closeEditModal = () => setEditModal(false);
  const showEditModal = () => setEditModal(true);

  const [deleteModal, setDeleteModal] = useState(false);
  const closeDeleteModal = () => setDeleteModal(false);
  const showDeleteModal = () => setDeleteModal(true);
  const [deletedState, setDeletedState] = useState(null);

  const [datePicker, setDatePicker] = useState(false);
  const closeDatePicker = () => setDatePicker(false);
  const showDatePicker = () => setDatePicker(true);

  const [timePicker, setTimePicker] = useState(false);
  const closeTimePicker = () => setTimePicker(false);
  const showTimePicker = () => setTimePicker(true);

  console.log({ data });
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
    data.sort((a, b) => a.date - b.date);
    setData([...data, { ...addValue, id: Date.now() }]);
    toast.success("Task Added in the List");
    setAddValue(initialValues);
  };
  const handleEdit = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };
  const forEdit = (item) => {
    console.log(item);
    showEditModal();
    setEdit(item);
  };

  const editedValue = () => {
    closeEditModal();
    console.log(edit);
    const newEditedData =
      data &&
      data.map((item, index) => {
        if (item.id === edit.id) {
          return edit;
        } else {
          return item;
        }
      });
    setData(newEditedData);
  };

  const deletedValue = () => {
    closeDeleteModal();
    setData((current) => {
      return current.filter((data) => data.id !== deletedState);
    });
  };
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

                      <button
                        className="mx-1 btn btn-danger px-3"
                        onClick={() => {
                          showDeleteModal();
                          setDeletedState(item.id);
                        }}
                      >
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
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <input
              type="text"
              name="taskName"
              id="editedName"
              value={edit.taskName}
              onChange={handleEdit}
            />
            <input
              type="date"
              name="date"
              id="editedDate"
              value={edit.date}
              onChange={handleEdit}
            />
            <input
              type="time"
              name="time"
              id="editedTime"
              value={edit.time}
              onChange={handleEdit}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editedValue()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* edit modal  */}

      {/* delete modal  */}
      <Modal show={deleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <AiFillDelete size={200} color="red" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deletedValue()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* delete modal  */}
      <ToastContainer />
    </div>
  );
};

export default App;
