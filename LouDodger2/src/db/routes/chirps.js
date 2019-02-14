Router = require("express");
getChirps = require('../db/db');
let router = Router();

router.get('/:id?', (req, res)=>{
    let id = req.params.id;
    if (id) {
        res.send(chirpStore.GetChirp(id));
    } else {
        getChirps()
        .then(results => res.send (results))
        .catch(e => console.log(e));
    }
});

router.post('/', (req,res)=>{
    chirpStore.CreateChirp(req.body);
    res.send('chirp added!');
});

router.put ('/:id', (req,res)=> {
let id = req.params.id;
chirpStore.UpdateChirp(id, re.body);
res.send('chirp eddited!');
});

outer.delete ('/:id', (req,res)=> {
    let id = req.params.id;
    chirpStore.deleteChirp(id);
    res.send('Chirp deleted!');
});

// export default router;