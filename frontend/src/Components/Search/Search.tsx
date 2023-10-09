import { Button, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import User from "../User/User";
import "./Search.css";
import { getAllUsers } from "../../store/actionHelpers/userActionHelper";

const Search = () => {
  const [name, setName] = React.useState<string>("");

  const { users, loading } = useAppSelector((state) => state.allUsers);

  const dispatch = useAppDispatch();
  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>

        <div className="searchResults">
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
