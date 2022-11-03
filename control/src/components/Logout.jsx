import {motion} from 'framer-motion'

function Logout (){
  
 function destroy (){    
    return(
        window.sessionStorage.removeItem('loggedAppUser'),
        window.location.reload()
    )
 }
    
    return (
            <div>
            <motion.button 
              initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 0.8 }}
   onClick={()=>destroy()} className="btn btn-danger ">Logout</motion.button>
          </div>
    )
}

export default Logout