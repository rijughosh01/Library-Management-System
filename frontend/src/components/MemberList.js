import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [searchParams, setSearchParams] = useState({ name: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const fetchMembers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/members", {
        headers: { Authorization: `Bearer ${token}` },
        params: searchParams,
      });
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  }, [token, searchParams]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const addMember = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/members",
        newMember,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMembers([...members, response.data]);
      setNewMember({ name: "", email: "", phone: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Error adding member:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(members.filter((member) => member._id !== id));
    } catch (error) {
      console.error(
        "Error deleting member:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Members
      </Typography>
      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          label="Search by Name"
          name="name"
          value={searchParams.name}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Search by Email"
          name="email"
          value={searchParams.email}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "10px" }}
        />
        <Button variant="contained" onClick={fetchMembers}>
          Search
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {members.map((member) => (
          <Card key={member._id} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {member.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {member.email}
              </Typography>
              <Typography variant="body2">Phone: {member.phone}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => deleteMember(member._id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Button
        variant="contained"
        onClick={() => setIsModalOpen(true)}
        sx={{ marginTop: "20px" }}
      >
        Add Member
      </Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "white",
            maxWidth: 600,
            margin: "auto",
            marginTop: "10%",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add a New Member
          </Typography>
          <TextField
            label="Name"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Email"
            value={newMember.email}
            onChange={(e) =>
              setNewMember({ ...newMember, email: e.target.value })
            }
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Phone"
            value={newMember.phone}
            onChange={(e) =>
              setNewMember({ ...newMember, phone: e.target.value })
            }
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <Button variant="contained" onClick={addMember}>
            Add Member
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default MemberList;
