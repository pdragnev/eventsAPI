import express from "express";

export const app = express();

app.use(express.json());

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


