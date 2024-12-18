function login(){
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
    var sheme = {Email : email , Password : password};
    checkUserPass(sheme)
    .then(data=>{
        console.log(data);
        if(data.ok){
            document.getElementById("loginError").style.color = "#4CAF50";
            document.getElementById("loginError").innerHTML = "correct!";
            // window.location.href = "home.html";
        }
        else{
            document.getElementById("loginError").style.color = "red";
            document.getElementById("loginError").innerHTML = "Wrong Email or Password , please try again !error";
        }
    }).catch(err =>{
        document.getElementById("loginError").style.color = "red";
        document.getElementById("loginError").innerHTML = "Wrong Email or Password , please try again !";
    })
}
let VerificationNumber ;
let Enteredemail;


function checkEmail(){
    Enteredemail = document.getElementById("forgotEmail").value;
    getEmail(Enteredemail)
    .then(data=>{
        
           
             VerificationNumber = generateRandomCode();

            var userScheme = {UserName : data.UserName , Email : data.Email , Password : data.Password , VerificationCode :  VerificationNumber};
            updateUser(userScheme)
            .then(data => {
                if(data.ok){
                    document.getElementById("VerficationError").innerHTML = "Fill in the Verification Code!";
                }else{
                    document.getElementById("VerficationError").innerHTML = "Send Faild";
                }
            })
            .catch(err => {
                console.log(err);
            })
            //API
            

                    document.getElementById('forgotPasswordModal').style.display = 'none';
                    document.getElementById('forgotEmail').value = ''; // Clear the input
                    document.getElementById("VerificationPasswordModal").style.display = "block";
                
          
            
    }
    ).catch(()=>{
       
        document.getElementById("forgotError").innerHTML = "You are not signed up yet or try another email!";
    })
}

//RANDOM NUMBER
function generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
}


//CONFIRM THE V.CODE
function ConfirmVerificationCode(){
    let Verifiaction = document.getElementById("Verifiaction").value ;
    if(Verifiaction == VerificationNumber){
        //API
        document.getElementById("VerificationPasswordModal").style.display = "none";
        document.getElementById("rewritePassword").style.display = " block";
    }else{
        document.getElementById("VerficationError").innerHTML = "Wrong VerificationCode!";
    }

}

//FORGET PASSWORD
function changePassword(email){
    let NewPassword = document.getElementById("NewPassword").value ;
    let ConfirmPassword = document.getElementById("ConfirmPassword").value ;
    let errorDiv = document.getElementById("changePasswordError");
    

    const passwordMinLength = 8;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (NewPassword.length < passwordMinLength) {
        errorDiv.textContent = `Password must be at least ${passwordMinLength} characters long.`;
        errorDiv.style.color = 'red';
        return;
    }

    if (!passwordRegex.test(NewPassword)) {
        errorDiv.textContent = 'Password must include uppercase, lowercase, number, and special character.';
        errorDiv.style.color = 'red';
        return;
    }

    if(NewPassword == ConfirmPassword){
        //API
        let model = {Email : Enteredemail , Password : NewPassword , VerificationCode : 0};
        updateUser(model)
        .then(data=>{
            if(data.ok){
                document.getElementById("rewritePassword").style.display = "none";
                document.getElementById("loginError").innerHTML =  "Password Changed Successfully!";
                document.getElementById("loginError").style.color = "#4CAF50";
            }else{
                document.getElementById("rewritePassword").style.display = "none";
                document.getElementById("loginError").innerHTML =  "Password Change Failed!";
            }
        })
        .catch(err=>{
            console.log(err);
        })
        
        
           
           
        
    }else{
        errorDiv.innerHTML = "Passwords do not match!";
    }
}