import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import Invite from './Invite';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


 const Users=()=> {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch();
  const [loadig, setLoading] = useState(true)

  const getBlogs = async () => {
    const response = await fetch("http://localhost:3000/members.json")
    const result = await response.json()
    setUsers(result.data)
    setLoading(false)
  }

  useEffect(()=>{
    getBlogs()
  }, [])

  useEffect(() => {
    // dispatch(getUsers());
    console.log("get usssf")
  }, [])

  return (
    <Box flex={5} p={2}>
      <Typography variant='h4' mb={6}>User Accounts</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%"}} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Invite/>
    </Box>
  );
}
export default Users