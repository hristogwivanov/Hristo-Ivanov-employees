import React from 'react';
import './output.css'

const Output = (longestPartners) => {
	let { firstEmployeeId, secondEmployeeId, projects, days} = longestPartners.data;
	projects = projects.join(', ');
   return (
		<table>
			<thead>
				<tr>
				<td>First Employee ID</td>
      			<td>Second Employee ID</td>
      			<td>Project IDs</td>
      			<td>Days worked</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{firstEmployeeId}</td>
					<td>{secondEmployeeId}</td>
					<td>{projects}</td>
					<td>{days}</td>
				</tr>
			</tbody>
  		</table>
   );
}

export default Output;