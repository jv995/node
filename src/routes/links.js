const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn} = require('../lib/auth');


router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add.hbs');
});

router.post('/add', isLoggedIn, async(req, res) =>{
    const {titulo, url,descripcion} = req.body;
    const newLink = {
        titulo,
        url,
        descripcion,
        users_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('Link', ' link guardado correctamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query(' SELECT * FROM links WHERE links.users_id = ?', [req.user.id]);
   
    res.render('links/list.hbs', { links });
}); 

router.get('/delete/:id', isLoggedIn, async (req, res) =>{
    /*console.log(req.params.id);
    res.send('ELIMINADO');*/

    const {id} = req.params;
   await pool.query('DELETE FROM links WHERE ID = ?', [id]);
   req.flash('Link', 'Enlace removido correctamente');
   res.redirect('/links');
});
router.get('/edit/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    
    const links =  await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    
    res.render('links/edit.hbs', {links : links[0]});//cuando sale erro UnhandledPromiseRejectionWarning: Error: No default engine was specified and no extension was provided. NO SE ESPECIFICAO LA EXTENCION
});
router.post('/edit/:id', isLoggedIn, async (req,res) => {
    const { id } = req.params;
    const { titulo, descripcion, url} = req.body;
    const newLink = {
        titulo,
        descripcion,
        url,
    };
    
    await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    req.flash('Link', 'Modificado exitosamente');
    res.redirect('/links');
});
module.exports = router;