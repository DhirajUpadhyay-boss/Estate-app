import { createContext,useContext,useState,useEffect } from "react";

export const UserContext= React.createContext({}) // creating a communication channel to give directly access of the data to props.

export const  useUser=() => {
  return useContext(UserContext)
}
// It is like writing useUser in the place of useContext(UserContext);
// To stop importing useContext and UserContext in every component.

export const Userprovider= ({children}) => {
    const [User, setUser] = useState(null) // phonenum means phone-number

// For a old user , singing up
useEffect(() => {
 const savedUser= localStorage.getItem('User');
 if(savedUser){
      setUser(JSON.parse(savedUser));
 }
}, []);


    // why to use useEffect? 
// Yes — "every time the app opens" = component mounts once → run useEffect with []Not on every render of Header, Home, etc.So:
// Useeffect is required to check if the user exists , only once when the APP opens.
// to stop again and again re-rendering whenever component 
// So you’d be checking localStorage again and again — unnecessary and slow.

// An old user is signing up.(needs data from local-storage)
// For a new user, we need to save and keep the data.



// For a new user, whose data needs to be saved in local-state.

// Function to save user (after registration/OTP verification)

const saveUser=(userdata) => {
   setUser(userdata);
   localStorage.setItem('Estateuser',JSON.stringify(userdata));  // Estate user is the key for the string JSON.stringify()

};

// Log-out the existing user, If He removes his/her account.

const removeUser=() => {
  setUser(NULL);
  localStorage.removeItem('Estateuser')
}

// Function if user is logged in.
 const isLoggedin=() => {
     return User!==NULL
 }
 
 // To modify user's data.

 const Modifyuser=(newData) => {
   const newData=[...User,...newData];
   setUser(newData);
   localStorage.setItem('Estateuser',JSON.stringify(newData));
 };
 

 return (
  <UserContext.Provider value={{User,saveUser,removeUser,isLoggedin,Modifyuser}} >
     {children}
  </UserContext.Provider>


 );

};
