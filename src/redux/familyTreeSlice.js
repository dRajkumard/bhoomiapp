import { createSlice } from '@reduxjs/toolkit';

const initialMembers = [
  {
    id: '1',
    name: 'John Doe',
  },
  {
    id: '2',
    name: 'Jane Doe',
  },
];

const familyTreeSlice = createSlice({
  name: 'familyTree',
  initialState: {
    members: initialMembers,
  },
  reducers: {
    addMember: (state, action) => {
      state.members.push({
        id: (state.members.length + 1).toString(),
        name: action.payload.name,
      });
    },
    deleteMember: (state, action) => {
      state.members = state.members.filter(member => member.id !== action.payload);
    },
    editMember: (state, action) => {
      const memberIndex = state.members.findIndex(member => member.id === action.payload.id);
      if (memberIndex !== -1) {
        state.members[memberIndex].name = action.payload.name;
      }
    },
    searchMember: (state, action) => {
      if (action.payload === '') {
        return state.members;
      } else {
        return state.members.filter(member => member.name.toLowerCase().includes(action.payload.toLowerCase()));
      }
    },
    importMembers: (state, action) => {
      state.members = action.payload;
    },
    exportMembers: (state, action) => {
      console.log('Exported members:', state.members);
    },
  },
});

export const { addMember, deleteMember, editMember, searchMember, importMembers, exportMembers } = familyTreeSlice.actions;

export default familyTreeSlice.reducer;
