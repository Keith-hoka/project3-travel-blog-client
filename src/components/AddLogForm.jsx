import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { api } from "../helpers/helpers";
import "./AddLogForm.css";

const AddLogForm = ({ location, onClose }) => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [visitDate, setVisitDate] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evnet) => {
    evnet.preventDefault();
    setLoading(true);
    const newLog = {
      title,
      comments,
      description,
      rating,
      image,
      visitDate,
      latitude: location.latitude,
      longitude: location.longitude,
    };

    await api.createLog(newLog);
    setLoading(false);
    onClose();
  };

  return (
    <Box
      component="form"
      sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
        <TextField
          required
          id="outlined-required"
          label="Title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="enter your travel location"
        />
        <TextField
          id="outlined-input"
          label="Creator"
          type="text"
          value={comments}
          onChange={e => setComments(e.target.value)}
          required
          placeholder="enter your name"
        />
        <TextField
          id="outlined-number"
          label="Rating"
          type="number"
          placeholder="rating from 1 to 10"
          value={rating}
          required
          onChange={e => setRating(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-image"
          label="Image"
          type="text"
          value={image}
          onChange={e => setImage(e.target.value)}
          required
          placeholder="upload your image here...http://"
        />
        <TextField
          id="outlined-number"
          type="date"
          value={visitDate}
          onChange={e => setVisitDate(e.target.value)}
          required
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="enter your stories here"
          multiline
          rows={5}
          helperText="Submit when you are ready."
          required
        />
        <Button type="submit" disabled={loading} className="addLogForm-btn" variant="contained">
          {loading ? "Creating" : "Create Travel Blog"}
        </Button>
    </Box>
  );
};

export default AddLogForm;
