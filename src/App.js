import React, { useState } from 'react';
import backgroundImage from './image/q.jpg';
import axios from 'axios';
import './App.css';
import App2 from './App2';



function CustomIndicator() {
  const [conditions, setConditions] = useState([{ indicator: '', length: '', condition: '', value: '' }]);
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [binance_api, setBinance_api] = useState('');
  const [binance_secret, setBinance_secret] = useState('');
  const [discord_webhook, setDiscord_webhook] = useState('');
  const [showApp2, setShowApp2] = useState(false); // Add state for showing App2

  const indicators = ['PriceOpen', 'PriceHigh', 'PriceLow', 'PriceClose', "MACD 12,26", "EMA", "SMA", "RSI"];
  const conditionsList = ['Greater Than Or Equal', 'Less Than Or Equal', 'Crosses Above', 'Crosses Below', 'Equal'];
  const choice = ["Indicator", "ConstantValue"]

  const app2Click = () => {
    setShowApp2(true); // Set the state to true to show App2
    console.log("App2 Clicked")
  }

  const handleAddCondition = () => {
    setConditions([...conditions, { indicator: '', length: '', condition: '', choice: "", indicator2: '', length2: '', constantValue: '' }]);
  };

  const handleRemoveCondition = (index) => {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    setConditions(newConditions);
  };

  const handleConditionChange = (index, event) => {
    const { name, value } = event.target;
    const newConditions = [...conditions];
    newConditions[index] = {
      ...newConditions[index],
      [name]: value,
    };
    setConditions(newConditions);
  };


  const handleSubmit = async () => {

    if (binance_api === '' || binance_secret === '' || discord_webhook === '' || takeProfit === '' || stopLoss === '') {
      alert('Please fill all the fields');
      return;
    }

    const data = {
      binance_api,
      binance_secret,
      discord_webhook,
      conditions,
      takeProfit,
      stopLoss,
    };

    console.log('JSON data: ' + data);
    try {
      axios.post('http://127.0.0.1:3001/data', data).then((results) => {
        console.log(results)
      }).catch((err) => {
        alert(err)
      })
    } catch (error) {
      console.log(error);
    }

    setConditions([{ indicator: '', length: '', condition: '', choice: "", indicator2: '', length2: '', constantValue: '' }]);
  };


  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#f5f5f5', marginBottom: '100px', marginTop: '100px' }}>Create your own Custom Trading Bot</h1>
      {conditions.map((condition, index) => (
        <div key={index} style={{ marginBottom: '25px' }}>
          <select
            name="indicator"
            value={condition.indicator}
            onChange={(event) => handleConditionChange(index, event)}
            style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '3px', border: '1px solid #ccc', marginRight: '10px' }}
          >
            <option value="">Select Indicator</option>
            {indicators.map((indicator) => (
              <option value={indicator} key={indicator}>
                {indicator}
              </option>
            ))}
          </select>
          {condition.indicator.toString().startsWith("Price") === false && condition.indicator.toString().startsWith("MACD") === false ? (
            <input
              type="text"
              name="length"
              value={condition.length}
              onChange={(event) => handleConditionChange(index, event)}
              placeholder="Indicator 1 Length"
              style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '3px', border: '1px solid #ccc', marginRight: '10px' }}
            />
          ) : null}
          <select
            name="condition"
            value={condition.condition}
            onChange={(event) => handleConditionChange(index, event)}
            style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '3px', border: '1px solid #ccc', marginRight: '10px' }}
          >
            <option value="">Select Condition</option>
            {conditionsList.map((condition) => (
              <option value={condition} key={condition}>
                {condition}
              </option>
            ))}
          </select>
          <select
            name="choice"
            value={condition.choice}
            onChange={(event) => handleConditionChange(index, event)}
            style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '3px', border: '1px solid #ccc', marginRight: '10px' }}
          >
            <option value="">Select Choice</option>
            {choice.map((choice) => (
              <option value={choice} key={choice}>
                {choice}
              </option>
            ))}
          </select>
          {condition.choice === "ConstantValue" ? (
            <input
              type="text"
              name="constantValue"
              value={condition.constantValue}
              onChange={(event) => handleConditionChange(index, event)}
              placeholder="Constant Value"
              style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '3px', border: '1px solid #ccc', marginRight: '10px' }}
            />
          ) : null}

          {condition.choice === "Indicator" ? (
            <select
              name="indicator2"
              value={condition.indicator2}
              onChange={(event) => handleConditionChange(index, event)}
              style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '3px', border: '1px solid #ccc', marginRight: '10px' }}
            >
              <option value="">Select Indicator</option>
              {indicators.map((indicator) => (
                <option value={indicator} key={indicator}>
                  {indicator}
                </option>
              ))}
            </select>

          ) : null}
          {condition.indicator2 && condition.indicator2.toString().startsWith("Price") === false && condition.indicator2.toString().startsWith("MACD") === false
            && condition.choice.startsWith("Constant") === false ? (

            <input
              type="text"
              name="length2"
              value={condition.valueLength}
              onChange={(event) => handleConditionChange(index, event)}
              placeholder="Indicator 2 Length"
              style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '3px', border: '1px solid #ccc', marginRight: '10px' }}
            />
          ) : null}

          {conditions.length > 1 ? (
            <button onClick={() => handleRemoveCondition(index)} style={{ backgroundColor: 'blue', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', marginRight: '10px' }}>
              x
            </button>
          ) : null}
        </div>
      ))
      }
      {/* <button onClick={handleAddCondition} style={{ margin: '20px', backgroundColor: 'blue', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '3px', marginBottom: '10px' }}>
        Add Condition
      </button> */}
      <div>
        <label style={{ color: '#ffffff', margin: '10px', }}>
          Take Profit

          <input
            type="text"
            onChange={(event) => setTakeProfit(event.target.value)}
            placeholder="Exit if Gained X%"
            value={takeProfit}
            style={{
              backgroundColor: '#ffffff',
              padding: '5px',
              borderRadius: '3px',
              border: '1px solid #ccc',
              marginLeft: '10px',
            }}
          />
        </label>
      </div>
      <div>
        <label style={{ color: '#ffffff', margin: '10px' }}>
          Stop Loss

          <input
            type="text"
            onChange={(event) => setStopLoss(event.target.value)}
            placeholder="Exit if Lost X%"
            value={stopLoss}
            style={{
              backgroundColor: '#ffffff',
              padding: '5px',

              borderRadius: '3px',
              border: '1px solid #ccc',
              marginLeft: '13px',
              marginTop: '10px',
            }}
          />
        </label>
      </div>


      <div>
        <label style={{ color: '#ffffff', margin: '10px' }}>
          Binance API Key

          <input
            type="text"
            onChange={(event) => setBinance_api(event.target.value)}
            placeholder="Binance API KEY"
            value={binance_api}
            style={{
              backgroundColor: '#ffffff',
              padding: '5px',
              width: '300px',
              borderRadius: '3px',
              border: '1px solid #ccc',
              marginLeft: '10px',
              marginTop: '20px',
            }}
          />
        </label>
      </div>


      <div>
        <label style={{ color: '#ffffff', margin: '10px' }}>
          Binance API Secret

          <input
            type="password"
            placeholder="Binance API Secret"
            value={binance_secret}
            onChange={(event) => setBinance_secret(event.target.value)}
            style={{
              backgroundColor: '#ffffff',
              padding: '5px',
              borderRadius: '3px',
              width: '320px',

              border: '1px solid #ccc',
              marginLeft: '13px',
              marginTop: '10px',
            }}
          />
        </label>
      </div>




      <div>
        <label style={{ color: '#ffffff', margin: '10px' }}>
          Discord Webhook

          <input
            type="text"
            value={discord_webhook}
            placeholder="Discord Webhook"
            onChange={(event) => setDiscord_webhook(event.target.value)}
            style={{
              backgroundColor: '#ffffff',
              padding: '5px',
              borderRadius: '3px',
              width: '320px',
              border: '1px solid #ccc',
              marginLeft: '13px',
              marginTop: '10px',
            }}
          />
        </label>
      </div>



      <button onClick={handleSubmit} style={{ backgroundColor: 'blue', color: '#fff', border: 'none', padding: '10px 20px', marginTop: '30px', borderRadius: '3px' }}>
        Submit
      </button>


      <div>
        <h1 style={{ color: "white" }}>Disclaimer:</h1>
        <p style={{ color: '#ffffff', margin: '10px', marginTop: '50px' }}>
          Please note that the following information is provided for educational and informational purposes only. Trading strategies involve risks, and it is essential to exercise caution and conduct thorough research before engaging in any trading activities. The disclaimer below can be used as a starting point for your website, but it's recommended to consult with legal professionals to ensure compliance with applicable laws and regulations.
          <br /><br />1. Trading involves significant risks, and past performance is not indicative of future results. The strategies described on this website may not be suitable for all individuals, and there is no guarantee of profitability.

          <br /><br />2. The use of leverage amplifies both potential gains and losses. Trading with leverage involves a higher level of risk, and you should carefully consider your risk tolerance and financial situation before engaging in leveraged trading.

          <br /><br />3. This strategy is designed specifically for <span style={{ fontWeight: 'bold', fontSize: 25 }}>Long Positions</span> trading on the <span style={{ fontWeight: 'bold', fontSize: 25 }}>BTCUSDT.P</span> ticker using 3x leverage, with the inclusion of both take-profit and stop-loss orders. It may not be suitable for other trading pairs, leverages, or trading directions. Always ensure that you understand the implications and risks associated with your trading decisions.

          <br /><br />4. The trading strategies implemented on this platform are solely the responsibility of the user. We do not guarantee the accuracy, completeness, or effectiveness of any strategy, and we disclaim any liability for losses incurred due to the use of these strategies.

          <br /><br />5. It is your responsibility to thoroughly test and validate any strategies before applying them to your Binance account. We recommend starting with small amounts and gradually increasing your exposure as you gain confidence and experience.

          <br /><br />6. By connecting your Binance account to this platform, you understand and accept that you are granting necessary permissions for the automation of your trading activities. You should review and understand Binance's terms of service and privacy policy before proceeding.

          <br /><br />7. We strongly advise you to consult with a qualified financial advisor or professional before making any investment decisions. They can provide personalized advice based on your specific financial situation and risk tolerance.

        </p>

      </div>

    </div >
  );
}

export default CustomIndicator;
