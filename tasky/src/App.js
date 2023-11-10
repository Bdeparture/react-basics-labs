import './App.css';
import Task from './components/Task';
import AddTaskForm from './components/Form';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function App() {
  const [ taskState, setTaskState ] = useState({
    tasks: [
      { id: 1, title: "Dishes", priority: "Low", type: "success", description: "Empty dishwasher", deadline: "Today", done:false},
      { id: 2, title: "Laundry", priority: "High", type: "error", description: "Fold clothes and put away", deadline: "Tomorrow", done:false},
      { id: 3, title: "Tidy up", priority: "Medium", type: "warning", deadline: "Today" },
      { id: 4, title: "Read", priority: "Low", type: "success", description: "Read a book which name is 'THE OLD MAN AND THE SEA'", deadline: "Today", done:false},
      { id: 5, title: "Write", priority: "High", type: "error", description: "Write an article", deadline: "This weekend", done:false}
    ]
  });
  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    setTaskState({tasks});
    console.log(`${taskIndex} ${tasks[taskIndex].done}`);
  }
  
  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks.splice(taskIndex, 1);
    setTaskState({tasks});
  } 
  const [ formState, setFormState ] = useState({
    title: "",
    description: "",
    deadline: ""
  });
  const formChangeHandler = (event) => {
    let form = {...formState};

    switch(event.target.name) {
      case "title":
          form.title = event.target.value;
          break;
      case "description":
          form.description = event.target.value;
          break;
      case "deadline":
          form.deadline = event.target.value;
          break;
      case "priority":
          form.priority = event.target.value;
          if(form.priority === "High"){
              form.type = "error"
            }else if(form.priority === "Medium"){
              form.type = "warning";
            }else if(form.priority === "Low"){
              form.type = "success";
            }
          break;
      default:
          form = formState;
    }
    setFormState(form);
    console.log(formState);
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();

    const tasks = [...taskState.tasks];
    const form = {...formState};

    form.id = uuidv4();
    
    tasks.push(form);
    setTaskState({tasks});
  }
  
  return ( 
    <div className="container">
       {/* App Header */}
       <Container component="main">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          gutterBottom
          sx = {{
            backgroundColor: 'gray',
            textAlign: 'center',
            color: 'white',
            padding: '20px',
            margin: '20px 0 40px 0',
            borderRadius: '4px'
          }}
        >
          Tasky
        </Typography>
      </Container>
      {/* End App Header */}
       {/* Task Card Grid */}
       <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-top" justifyContent="center">
          {taskState.tasks.map((task, index) => (
                <Task 
                title={task.title}
                description={task.description}
                deadline={task.deadline}
                priority={task.priority}
                type={task.type}
                done={task.done}
                key={task.id}
                markDone = {() => doneHandler(index)}
                deleteTask = {() => deleteHandler(index)}
              />
          ))}
        </Grid>
      </Container>
      {/* End Task Card Grid */}
        {/* Footer - Add Task Form */}
        <Container
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          my: 6,
          py: 6,
        }}
      >
        <Grid container justifyContent="center">
          <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />
        </Grid>
      </Container>
      {/* End Footer */}
    </div>
  );
}

export default App;
