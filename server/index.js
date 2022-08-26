const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const router = express.Router()

const pdfTemplate = require('./documents/index')

const app = express();
const port = process.env.PORT || 5000;


app.use("/", router);


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, () => console.log(`listening on port ${port}`));
//POST-PDF generation data

let options = {
    "height": "210mm",        // allowed units: mm, cm, in, px
    "width": "295mm",
    "header": {
        "height": "20mm",
        "contents":
           ` <div>
                <div style='display:flex; flex-direction: row; justify-content: space-between;text-align: end;'>
                    <div>
                        <img style="width:80px;" src="https://firebasestorage.googleapis.com/v0/b/employee-entheus.appspot.com/o/profilepics%2Fdefault.jpg?alt=media&token=49505856-a9e0-4cf6-b070-0fd0311ded9c" />
                    </div>
                    <div>
                        <h3>ENTHEUS - REPORTE DE CREDENCIALES</h3>
                    </div>
                </div>
                <hr />
            </div>`
    },
    "footer": {
        "height": "20mm",
        "contents": {
            first: 'Cover page',
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value

        }
    },
}


app.post(('/createPDF'), (req, res) => {
    pdf.create(pdfTemplate(req.body), options).toFile('result.pdf', (err) => {
        if (err) { res.send(Promise.reject()) }
        res.send(Promise.resolve())
    })
})

//GET - Send PDF to CLient

app.get('/fetchPDF', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})





