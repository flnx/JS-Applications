import {} from './home.js'
import {} from './addMovie.js'
import {} from './editMovie.js'
import {} from './login.js'
import {} from './register.js'
import {} from './details.js'

const container = document.getElementById('container');


// removing login, register, edit pages
[...container.children].slice(2, -1).map(x => x.remove());



// x create modules + views
// register
// login
// check user permissions:
//  - if the movies is created by the logged user:
//        - UPDATE, DELETE are allowed
// take care of likes < this is the hardest step so it will be done in the end