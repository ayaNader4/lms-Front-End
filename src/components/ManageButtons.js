import React from 'react';
import '../css/ManageCourses.css';
import { Link } from 'react-router-dom';

const ManageButtons = () => {
    return (
        <div className='manage-courses'>
            <div className='header d-flex justify-content-between mb-5 '>
                <Link className='btn man text-light' to={'/manage-users'}>Manage Users</Link>
               {/*  <div className='header d-flex justify-content-between'> */}
                
                <Link className='btn man text-light' to={'/manage-courses'}>Manage Courses</Link>
                </div>
                
            </div>
        /*     
        </div> */
    );
};

export default ManageButtons;