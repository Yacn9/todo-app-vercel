import React, { useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  TextField,
  TextareaAutosize,
  FormControl,
  FormLabel,
} from "@mui/material";
import { ITodo, TNewTask } from "types";

interface IProps {
  handleForm: (data: TNewTask) => void;
  closeForm: () => void;
  task?: ITodo;
}

const Form = (props: IProps) => {
  const { handleForm, task, closeForm } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (task) {
      titleRef.current && (titleRef.current.value = task.title);
      descriptionRef.current &&
        (descriptionRef.current.value = task.description);
    }
  }, [task]);

  return (
    <Card variant="outlined">
      <CardContent>
        <FormControl required fullWidth>
          <FormLabel>Name</FormLabel>
          <TextField
            inputRef={titleRef}
            placeholder="Enter Task's Title"
            fullWidth
          />
        </FormControl>
        <FormControl required fullWidth style={{ marginTop: "2px" }}>
          <FormLabel>Description</FormLabel>
          <TextareaAutosize
            ref={descriptionRef}
            placeholder="description about this Task"
            minRows={3}
            style={{ width: "100%" }}
          />
        </FormControl>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleForm({
              title: titleRef.current?.value!,
              description: descriptionRef.current?.value!,
            })
          }
        >
          Submit
        </Button>
        <Button variant="outlined" color="error" onClick={closeForm}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
};

export default Form;
