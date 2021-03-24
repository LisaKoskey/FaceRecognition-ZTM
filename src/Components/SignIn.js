
import React, {useState} from 'react';

function SignIn ({ onRouteChange, loadUser }){
const [signInEmail,setSignInEmail]=useState('')
const [signInPassword,setSignInPassword]=useState('')

function onEmailChange(event){
    setSignInEmail(event.target.value)
    // console.log(signInEmail)
}

function onPasswordChange(event){
    setSignInPassword(event.target.value)
// console.log('pwEvent',event.target.value)
// console.log('pwState',signInPassword)
}

function onSubmitSignin(){
    console.log('em',signInEmail)
    console.log('pw',signInPassword)
    fetch('http://localhost:3000/signin',{
        method: 'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: signInEmail,
            password: signInPassword
        })
    })
    .then(response=>response.json())
    .then(user=>{
        console.log('this is what came back',user)
        if (user.id){
            loadUser(user)
            onRouteChange('home')
        }
    })
}

    // console.log(imageURL)
    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                {/* below was a form, but was giving little error in console bcs not "connected"  in html, if there is an iput type of 'submit' it will automaticfally try to send the form.  because we are using js to submit, don't need to the form so register and signin forms put div vs form */}
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={onEmailChange} className="pa2 input-reset ba  hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} className="b pa2 input-reset ba hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                        className="b br3 ph3 pv2 input-reset ba b--black grow pointer f6 dib" type="submit" 
                        value="Sign in"
                        onClick={onSubmitSignin}
                        />
                    </div>
                    <div className="underline pointer mt3">
                    <p onClick={()=>onRouteChange('register')} className="ph3 grow f6 link dim black db">Register</p>
                    </div>
                </div>
            </main>
        </article>
    )
}

export default SignIn;
