var api = {
    getDensity(){
        console.log("ssssssssssssss")
        var url = 'http://203.151.85.73:5050/crowdflow/density?time=NOW&ll=13.746035456087066,100.53421212920541';
        return fetch(url).then((res) => res.json()); //รับและแปลงเป็น json
    }

};
module.exports = api;


// var axios = require('axios');

// axios.get('http://203.151.85.73:5050/crowdflow/density',{
//         params: {
//             time: NOW ,
//             ll: (13.746035456087066,100.53421212920541)
//         }    
//     })

//     .then(function(response){
//         console.log(response);
//     })
//     .catch(function (error){
//         console.log(error);
//     })

//     function getDensityValue(){
//         return axios.get('/crowdflow/density/NOW/13.746035456087066,100.53421212920541')
//     }
    
//     axios.all([getDensityValue()])
//         .then(axios.spread(function(acct,perms){

//         }))


// {
//     url: 'http://203.151.85.73:5050/crowdflow/density?time=NOW&ll=13.746035456087066,100.53421212920541'

// }