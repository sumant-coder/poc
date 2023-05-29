import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [tableData, setTableData] = useState([]);
    const token = localStorage.getItem("auth-token");
    const headers = {
        headers: {
            'auth-token': token
        }
    }
    useEffect(() => {
        fetch('http://localhost:8080/users/getAllUsers', headers)
            .then((result) => result.json()).then((val) => {
                console.log(val)
                setTableData(val.data)
            })
    }, []);
    const navigate = useNavigate();
    const handleLogout = () => {
        // Perform logout logic here
        // For example, clear session storage, remove tokens, etc.
        localStorage.setItem("auth-token", "")
        navigate('/');
    };

    return (
        <>
            <div className='my-div m-5'>
                <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
            </div>
            <div className='p-5'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            tableData.map((listValue, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{listValue.name}</td>
                                        <td>{listValue.email}</td>
                                        <td>{listValue.contact}</td>
                                    </tr>
                                )
                            })
                        }



                    </tbody>
                </Table>
            </div>
        </>
    );

}

export default Home;