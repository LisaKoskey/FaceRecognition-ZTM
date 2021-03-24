
import React,{useState} from 'react';

function Register ({ onRouteChange }) {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    function onNameChange(event){ 
        setName(event.target.value)
        console.log(name)
    }
    function onEmailChange(event){ console.log('email')
        setEmail(event.target.value)
    }
    
    function onPasswordChange(event){ console.log('password')
        setPassword(event.target.value)
    }
    
    function onSubmitRegister(){
        console.log(name)
        console.log(email)
        console.log(password)
        fetch('http://localhost:3000/register',{
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(response=>response.json())
        .then(user =>{if (user.id){onRouteChange('home')}})
    }
    

    

    // console.log(imageURL)
    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                {/* below was a form, but was giving little error in console bcs not "connected"  in html, if there is an iput type of 'submit' it will automaticfally try to send the form.  because we are using js and json to submit, don't need to the form so register and signin forms put div vs form.  it is more customizable to do this way */}
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange={onNameChange} className="pa2 input-reset ba hover-bg-black hover-white w-100" type="name" name="name"  id="name"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={onEmailChange} className="pa2 input-reset ba hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} className="b pa2 input-reset ba hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                        className="b ph3 pv2 input-reset ba b--black br3 grow pointer f6 dib" type="submit" 
                        value="Register"
                        onClick={onSubmitRegister}
                        />
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Register;
