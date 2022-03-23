export default  function (req, res, next) {
    // console.log("context: " ,res);
    next();
    // if(route.name.includes('admin')) {
    //     if($auth.$state.loggedIn) {
    //         console.log('auth',$auth.$state.user.roles);
    //         let roles = $auth.$state.user.roles;
    //         roles.forEach((element,index) =>{
    //             if(element.name ==='admin') {
    //                 console.log('admin1',element.name);
    //             }
    //             if(element.name !=='admin'&&roles.length === index+1) {
    //                 redirect('/dashboard');
    //             }
    //         });
    //         console.log('admin3');
    //     }
    // }

}