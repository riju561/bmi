import React, { useState, useEffect } from "react"
import styles from "./index.module.css"

const Home = () => {
  const [bmi, setBmi] = useState(0)
  const [type, setType] = useState("metric")
  const [btype, setBType] = useState(null)
  
  //Sets data at starting
  useEffect(() => {
    setBmi(0)
    setBType(null)
  }, [])
  
  //Everytime bmi value changes the function runs
  useEffect(() => {
    setBodyType()
  }, [bmi])
  
  //Sets the body type
  const setBodyType = () => {
    if (bmi > 0 && bmi < 18.5) {
      setBType("Underweight")
    } else if (bmi >= 18.5 && bmi < 25) {
      setBType("Normal")
    } else if (bmi >= 25 && bmi < 30) {
      setBType("Overweight")
    } else if (bmi >= 30 && bmi < 100) {
      setBType("Obese")
    }
  }
  
  //Calculates the bmi
  const getBmi = e => {
    e.preventDefault()
    setBmi(0)
    let h = document.getElementById("h").value
    let w = document.getElementById("w").value
    if (type === "metric") {
      setBmi(((w * 10000) / (h * h)).toFixed(2))
    } else {
      setBmi(((w * 703) / (h * h)).toFixed(2))
    }
    if (h == 0 || w == 0) {
      setBmi(-1)
    }
  }
  
  //Sets the measurement type
  const setHandler = e => {
    setType(e.target.value)
  }

  return (
    <div className={styles.div}>
      <div className={styles.box}>
        <div className={styles.content}>
          <p className={styles.head}>BMI Calculator</p>
          <div className={styles.cont}>
            <div className={styles.col}>
              {/* Option to choose measurement unit type */}
              <label for="type">
                Choose a measurement type :
                <br />
                <select
                  name="type"
                  id="type"
                  onChange={setHandler}
                  className={styles.select}
                >
                  <option value="metric">Metric units</option>
                  <option value="imperial">Imperial units</option>
                </select>
              </label>
              <br />
              {/* Input to enter height and weight */}
              <label>
                Enter height in cm/inches : <br />
                <input
                  placeholder="Height"
                  id="h"
                  className={styles.input}
                ></input>
              </label>
              <br />
              <label>
                Enter weight in kg/lbs : <br />
                <input
                  placeholder="Weight"
                  id="w"
                  className={styles.input}
                ></input>
              </label>
              <br />
              <button onClick={getBmi} className={styles.button}>
                Get BMI
              </button>
              <br />
            </div>
            {/* Displays BMI */}
            <div className={styles.col}>
              <div className={styles.a}>
                {bmi === 0 ? (
                  <p>Get your BMI by entering your height and weight</p>
                ) : bmi === -1 ? (
                  <p>Height or weight cannot be 0</p>
                ) : (
                  <div className={styles.c}>
                    <p>
                      BMI : <span className={styles.info}>{bmi}</span>
                    </p>
                    <p>
                      You are <span className={styles.info}>{btype}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
