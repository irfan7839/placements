import React ,{useContext} from 'react';
import {jobContext} from '../App';
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'




function Admin() {
    

    let context=useContext(jobContext)
    console.log(context)
    return (
        <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>Company Name</th>
      <th>Role</th>
      <th>Role Description</th>
    </tr>
  </thead>
  <tbody>
      {
          context.data.map((e,i)=>{
              let url='admin/'+e._id;
              return <tr key={e._id}>
                  <td>
                      <Link to={url}>{i+1}</Link>
                      </td>
                  <td>{e.companyName}</td>
                  <td>{e.role}</td>
                  <td>{e.desc}</td>
              </tr>
          })
      }
  </tbody>
</Table>
    )
}

export default Admin;
