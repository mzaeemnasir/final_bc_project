import React, { useState } from 'react';
import backgroundImage from './image/q.jpg';
import axios from 'axios';


function CustomIndicator() {
    const [conditions, setConditions] = useState([{ indicator: '', length: '', condition: '', value: '' }]);
    const [takeProfit, setTakeProfit] = useState("");
    const [stopLoss, setStopLoss] = useState("");
    const [binance_api, setBinance_api] = useState('');
    const [binance_secret, setBinance_secret] = useState('');
    const [discord_webhook, setDiscord_webhook] = useState('');


    const [isSelected, setIsSelected] = useState(false);

    const handleBoxClick = () => {
        setIsSelected(!isSelected);
    };

    const goBack = () => {
        window.location.href = "http://localhost:3000/";
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
            "ScalperBot": true,
            takeProfit,
            stopLoss,
        };

        console.log('JSON data: ' + data);
        try {
            axios.post('http://127.0.0.1:3001/data', data).then((results) => {
                alert("Bot Created")

                // Clearing the input fields
                setBinance_api('');
                setBinance_secret('');
                setDiscord_webhook('');
                setTakeProfit('');
                setStopLoss('');



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
            <h1 style={{ color: '#f5f5f5', marginBottom: '100px', marginTop: '100px' }}>Use Our Pre Build Strategies</h1>

            <div
                style={{
                    backgroundColor: isSelected ? 'green' : '#ffffff',
                    padding: '10px',
                    borderRadius: '5px',
                    transition: 'background-color 1s ease',
                    marginBottom: '20px',
                }}
                onClick={handleBoxClick}
            >
                <h4 style={{ userSelect: 'none' }}>15m Scalper Bot</h4>
                <p style={{ userSelect: 'none' }}>Accuracy: around 73%</p>
            </div>






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

            <button onClick={goBack} style={{ backgroundColor: 'blue', color: '#fff', border: 'none', padding: '10px 20px', marginTop: '30px', borderRadius: '3px' }}>
                Go Back
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
