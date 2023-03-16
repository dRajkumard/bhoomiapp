import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { TreeItem, TreeView } from "@mui/lab";
import { TextField, Button, Input } from "@mui/material";
import {
  Add,
  Delete,
  Save,
  ImportExport,
  ExpandMore,
  ChevronRight,
  Folder,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  addMember,
  deleteMember,
  editMember,
  searchMember,
  importMembers,
  exportMembers,
} from "./redux/familyTreeSlice";
import { Sheet, Grid, styled } from "@mui/joy";
const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.vars.palette.text.tertiary,
}));

const App = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const dispatch = useDispatch();
  const members = useSelector((state) =>
    searchMember(state.familyTree.members, searchTerm)
  );
  console.log("member", members);
  const handleAdd = () => {
    dispatch(addMember({ name }));
    setName("");
  };

  const handleDelete = (id) => {
    dispatch(deleteMember(id));
  };

  const handleEdit = (id, name) => {
    dispatch(editMember({ id, name }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleImport = () => {
    const fileReader = new FileReader();
    fileReader.readAsText(fileInput, "UTF-8");
    fileReader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      dispatch(importMembers(data.members));
    };
  };

  const handleExport = () => {
    const data = { members };
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(data)], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    a.download = "familyTree.json";
    a.click();
  };

  return (
    <div>
      <div>
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid xs={4}>
            <Item>
              <div>
                <h3>Family Tree</h3>
              </div>
              <div>
                <TextField
                  label="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                sx={{
                  height: 240,
                  flexGrow: 1,
                  maxWidth: 400,
                  overflowY: "auto",
                }}
              >
                {Array.isArray(members.payload) &&
                  members.payload.map((member) => (
                    <TreeItem
                      key={member.id}
                      nodeId={member.id}
                      label={member.name}
                      onLabelClick={() =>
                        console.log(`Clicked on ${member.name}`)
                      }
                      onIconClick={() => handleDelete(member.id)}
                    >
                      <TreeItem
                        value={member.name}
                        onChange={(e) => handleEdit(member.id, e.target.value)}
                      />
                    </TreeItem>
                  ))}
              </TreeView>
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                sx={{
                  height: 240,
                  flexGrow: 1,
                  maxWidth: 400,
                  overflowY: "auto",
                }}
              >
                {/* <Folder/> */}
                <TreeItem nodeId="1" label="Applications" icon={<Folder />}>
                  <TreeItem nodeId="2" label="Calendar" icon={<Folder />} />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                  <TreeItem nodeId="10" label="OSS" />
                  <TreeItem nodeId="6" label="MUI">
                    <TreeItem nodeId="8" label="index.js" />
                  </TreeItem>
                </TreeItem>
              </TreeView>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ImportExport />}
                  onClick={handleImport}
                >
                  Import
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ImportExport />}
                  onClick={handleExport}
                >
                  Export
                </Button>
              </div>
            </Item>
          </Grid>
          <Grid xs={8}>
            <Item>
              <div>
                <div>
                  <h3>Family Details</h3>
                </div>
                <div>
                  <div>
                    <label htmlFor="unique-id">Name</label>
                    <Input
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="unique-id">spouse</label>
                    <Input
                      placeholder="Spouse"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="unique-id">Label</label>
                    <Input
                      placeholder="Spouse"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="unique-id">Label</label>
                    <Input
                      placeholder="Spouse"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleAdd}
                  >
                    Add
                  </Button>
                </div>

                <div>
                  <label htmlFor="unique-id">Label</label>
                  <input
                    type="file"
                    onChange={(e) => setFileInput(e.target.files[0])}
                  />
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default App;
