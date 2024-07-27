import app from "../app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.clear();
  console.log(`Server is listening on port ${PORT}`);
});
