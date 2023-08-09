import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { RootState } from "store/store";
import {
  createTodoAction,
  deleteTodoAction,
  getTodoListAction,
  updateStatusTodoAction,
  updateTodoAction,
} from "store/slices/todo.slice";
import { ITodo, TNewTask } from "types";
import {
  Container,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Stack,
  Skeleton,
  Modal,
  Box,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Form, Alert } from "components";
import { StorageService } from "services";

type TFilter = "all" | "completed" | "uncompleted";

const HomePage = () => {
  const [openForm, setOpenForm] = useState<{
    open: boolean;
    data: ITodo | null;
  }>();
  const [modal, setModal] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    variant: "success" | "error";
  }>();
  const { list, status } = useAppSelector((state: RootState) => state.todo);
  const [filter, setFilter] = useState<TFilter>("all");

  const filteredList = (type: "all" | "completed" | "uncompleted") => {
    return type === "all"
      ? list
      : type === "completed"
      ? list.filter((todo) => todo.completed)
      : list.filter((todo) => !todo.completed);
  };
  const nameRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const initFunc = () => {
    try {
      setTimeout(() => {
        const user = StorageService.get("user");
        if (user) {
          dispatch(getTodoListAction());
          setModal(false);
        } else {
          setModal(true);
        }
      }, 500);
    } catch (error) {
      setMessage({ text: "something went wrong", variant: "error" });
    }
  };
  useEffect(() => {
    initFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const onChange = (data: ITodo, type: "update" | "delete") => {
    try {
      type === "delete"
        ? dispatch(deleteTodoAction(data.id))
        : dispatch(updateStatusTodoAction(data));
      setMessage({
        text: `task ${data.id} ${type === "delete" ? "deleted" : "updated"}`,
        variant: "success",
      });
    } catch (error) {
      setMessage({ text: "something went wrong", variant: "error" });
    }
  };

  const handleSubmit = (data: TNewTask, id?: number) => {
    try {
      id
        ? dispatch(updateTodoAction({ data, id }))
        : dispatch(createTodoAction(data));
      setOpenForm(undefined);
      setMessage({
        text: id ? `task ${id} updated` : "new task added",
        variant: "success",
      });
    } catch (error) {
      setMessage({ text: "something went wrong", variant: "error" });
    }
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Container style={{ marginTop: 10 }} maxWidth="xl">
      {modal ? (
        <Modal
          open={modal}
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Please Enter Your Name
            </Typography>
            <FormControl required fullWidth>
              <FormLabel>Name</FormLabel>
              <TextField inputRef={nameRef} fullWidth />
            </FormControl>
            <Divider />
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  StorageService.set("user", nameRef.current?.value!);
                  initFunc();
                }}
              >
                Submit
              </Button>
            </CardActions>
          </Box>
        </Modal>
      ) : (
        <>
          <Box sx={{ minWidth: 120, padding: "10px 0", maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter"
                onChange={(event) => setFilter(event.target.value as TFilter)}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"completed"}>Completed</MenuItem>
                <MenuItem value={"uncompleted"}>Not Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm({ open: true, data: null })}
            style={{ margin: "10px 0" }}
          >
            Create New Task
          </Button>
          {status === "success" ? (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {openForm?.open && !openForm.data ? (
                <Grid item xs={2} sm={4} md={4}>
                  <Form
                    handleForm={(data) => handleSubmit(data)}
                    closeForm={() => setOpenForm({ open: false, data: null })}
                  />
                </Grid>
              ) : null}
              {filteredList(filter).map((todo) => (
                <React.Fragment key={todo.id}>
                  {todo.id === openForm?.data?.id ? (
                    <Grid item xs={2} sm={4} md={4}>
                      <Form
                        handleForm={(data) => handleSubmit(data, todo.id)}
                        closeForm={() =>
                          setOpenForm({ open: false, data: null })
                        }
                        task={openForm.data}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={2} sm={4} md={4}>
                      <Card variant="outlined">
                        <CardHeader
                          title={
                            <Typography variant="h6">{todo.title}</Typography>
                          }
                        />
                        <CardContent>
                          <Typography>{todo.description}</Typography>
                        </CardContent>
                        <Divider />
                        <CardActions>
                          <Button
                            variant="contained"
                            color={todo.completed ? "secondary" : "primary"}
                            onClick={() => onChange(todo, "update")}
                          >
                            {todo.completed ? "UNDONE" : "DONE"}
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => onChange(todo, "delete")}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              setOpenForm({ open: true, data: todo })
                            }
                          >
                            Edit
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          ) : status === "loading" ? (
            <Stack>
              <Skeleton
                variant="rounded"
                width={210}
                height={60}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                width={210}
                height={60}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                width={210}
                height={60}
                animation="wave"
              />
            </Stack>
          ) : (
            <div>No Data</div>
          )}
          {message && <Alert {...message} />}
        </>
      )}
    </Container>
  );
};

export default HomePage;
