import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import '../../css/ManageCourses.css';
import DropDownList from '../../components/DropDownList';



const AddCourses = () => {
    return (
        <div className='add-container'>
            <h1>Add New Course</h1>
            <Alert variant="danger" className='p-2'>
                failed to send
            </Alert>
            <Alert variant="success" className='p-2'>
                sent successfuly
            </Alert>
            <Form >
                <Form.Group className="mb-3" >
                    <Form.Control type="text" placeholder="Cource Name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <textarea className='form-control'
                    placeholder="Description" rows={4}>
                    </textarea>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" placeholder="Instructors" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <div><DropDownList /></div>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <input type="file" className="form-control" />
                </Form.Group>
                <Button className='btn btn-dark w-90' variant="primary" type="submit">
                    Add
                </Button>
            </Form>

        </div>
    );
};

export default AddCourses;