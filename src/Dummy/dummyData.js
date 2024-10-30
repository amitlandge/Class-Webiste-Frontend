// const { sender, content, attachments, createdAt } = prop.message;
// const { user } = prop;

export const dummyUser = {
  _id: "xyz",
  user: "xyz",
  name: "Sumit",
};

export const dummyMessages = [
  {
    _id: "something",
    sender: {
      _id: "xyz",
      name: "amit",
      std: "8th",
    },
    content: "Hii This side Amit",
    attachments: "",
  },
  {
    _id: "something 2",
    sender: {
      _id: "Abc",
      name: "Sumit",
      std: "9th",
    },
    content: "Hii This side someone",
    attachments: "",
  },
];
