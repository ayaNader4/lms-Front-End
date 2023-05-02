import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ManageCourses.css';


const DropDownList = () => {
    return (
        <div>
      <DropdownButton id="dropdown-basic-button " variant='secondary' title="Prerequisits">
        <Dropdown.Item href="#/action-1">Software Engineering 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Database 1</Dropdown.Item>
        <Dropdown.Item href="#/action-3">logic Design</Dropdown.Item>
      </DropdownButton>
    </div>
    );
};

export default DropDownList;