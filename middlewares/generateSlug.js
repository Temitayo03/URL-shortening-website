function generateSlug(req, res, next){
    // generate random string
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz023456789";
    let charactersArray = characters.split('');
    charactersArray = charactersArray.sort(()=>{
        return Math.random() - 0.5
    });

    let slug = charactersArray.slice(0, 7).join("");
    req.slug = slug;
    // console.log(slug);
    next();
    
}

module.exports = generateSlug;