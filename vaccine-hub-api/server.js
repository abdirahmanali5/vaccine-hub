const { application } = require("express");
const{BadRequestError, NotFoundError} = require("./utils/errors")
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config")
 
const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("tiny"));
app.use((req,res,next) => {
    return next(new NotFoundError())
})
app.use((err,req,res,next) => {
    const status = err.status || 404
    const message = err.message
    return res.status(status).json({
        error: {message,status}
    })
    })


app.listen(PORT, () => {
    console.log(`Server Running http://localhost:${PORT}`)
});