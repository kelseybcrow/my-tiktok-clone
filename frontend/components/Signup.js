import React from 'react'
import { useState } from 'react'
import styles from '../styles/Signup.module.css'

const Signup = () => {
    const [username, setUserName] = useState('')
    const [profile, setProfile] = useState('')

    const signUpClicked = () => {
        signup(username, profile)
    }
    return (
        <div className={styles.authContainer}>
            <h1 className={styles.title}>Sign up to use TikTok</h1>
            <div className={styles.signupForm}>
                <div className={styles.inputField}>
                    <div className={styles.inputTitle}>Username</div>
                    <div className={styles.inputContainer}>
                        <input className={styles.input} type='text' />
                    </div>
                </div>

                <div className={styles.inputField}>
                    <div className={styles.inputTitle}>Password</div>
                    <div className={styles.inputContainer}>
                        <input type='text' className={styles.input} />
                    </div>
                </div>
            </div>
            <div className={styles.loginButton}>Sign up</div>
        </div>
    )
}

export default Signup