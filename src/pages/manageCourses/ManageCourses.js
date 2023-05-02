import React from 'react';
import Table from 'react-bootstrap/Table';
import Image from '../../core/data/b4630a60e57d000f7e2533473e0716ce.jpg';
import '../../css/ManageCourses.css';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


const ManageCourses = () => {
    return (
        <div className='manage-courses p-5 bg-white text-black'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>Manage Courses</h3>
                <Link to={'add-courses'} className='btn btn-dark'>Add New Course</Link>
            </div>

            <Alert variant="danger" className='p-2'>
                failed to send
            </Alert>
            <Alert variant="success" className='p-2'>
                sent successfuly
            </Alert>

            <Table striped bordered hover  variant="dark" >
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Prerequisits</th>
                    <th>Instructor</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>
                        <img src={Image} alt='' className='image-avatar'></img>
                    </td>
                    <td>Software Engineering 2</td>
                    <td>apply engineering principles of programming languages</td>
                    <td>Software Engineering 1</td>
                    <td>Dr.Amr Ghoneim</td>
                    <td>
                    <Link to={'/CourseDetails'} className='btn btn-light'>Show</Link>
                    <Link to={'5'} className='btn btn-secondary mx-2'>Update</Link>
                    <button  className='btn btn-danger'>Delete</button>
                    </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ManageCourses;