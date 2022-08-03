import React from 'react'
import { Stack } from '@mui/material'

const Task = ({ task }) => {
  return (
		<>
			<Stack
				direction={'row'}
				border={'1px solid black'}
				padding='1rem'
				borderRadius='30px'
			>
				<Stack width='70%' spacing={2}>
					<span>
						<strong>Description: </strong>: {task?.taskDescription}
					</span>
					<span>
						<strong>Created By: </strong>
						{task?.createdBy}
					</span>
					<span>
						<strong>Assigned To: </strong>
						{task?.assignedTo}
					</span>
				</Stack>
				<span>
					<strong>status: </strong>
					{task?.status}
				</span>
			</Stack>
		</>
  )
}

export default Task