require('newrelic');

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  'allowedHeaders': ['Content-Type', 'Origin', 'Accept'],
  'origin': true,
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const PRODUCT_VIEW_PROD_IP = 'http://35.163.130.251:8002';
const RATINGS_AND_REVIEWS_PROD_URL = 'http://ec2-54-67-95-154.us-west-1.compute.amazonaws.com:8003';

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/loaderio-6041c8c8eaacf008b60025f3cf35c446', (req, res) => {
  res.send('loaderio-6041c8c8eaacf008b60025f3cf35c446');
});

app.use('/shoes',
  proxy({
    target: "http://127.0.0.1:8001",
    changeOrigin: true
  })
);

app.use('/shoes /:shoeId',
  proxy({
    target: "http://127.0.0.1:8001",
    changeOrigin: true
  })
);

app.use('/looks/:id',
  proxy({
    target: "http://127.0.0.1:8001",
    changeOrigin: true
  })
);

app.use('/shares/:id',
  proxy({
    target: "http://127.0.0.1:8001",
    changeOrigin: true
  })
);

app.use('/products/:model',
  proxy({
    target: PRODUCT_VIEW_PROD_IP,
    changeOrigin: true
  })
);

app.use('/shoe/:shoeId',
  proxy({
    target: PRODUCT_VIEW_PROD_IP,
    changeOrigin: true
  })
);

app.use('/images',
  proxy({
    target: PRODUCT_VIEW_PROD_IP,
    changeOrigin: true
  })
);

app.use('/reviews',
  proxy({
    target: RATINGS_AND_REVIEWS_PROD_URL,
    changeOrigin: true
  })
);

app.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
})

app.listen(port, () => {
  console.log(`Listening on server: https://localhost:${port}`);
});
