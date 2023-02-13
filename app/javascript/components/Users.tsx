import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Invite from './Invite';

function createData(
  id: number,
  name: string,
  email: string,
  status: string,
) {
  return {id, name, email, status };
}

const rows = [
  createData(1, 'Kanna S', "kannan@email.com", "Active"),
  createData(2, 'Kanna S', "kannan@email.com", "Invited"),
  createData(3, 'Kanna S', "kannan@email.com", "Active"),
  createData(4, 'Kanna S', "kannan@email.com", "Active"),
];

 const Users=()=> {
  return (
    <Box flex={5} p={2}>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%"}} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>Invite Again</TableCell>
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