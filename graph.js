// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getDatabase, ref, update, child, get, query, orderByChild, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEAaG-KJm-vxwshuxWohpsNKlP2jQ-SFU",
    authDomain: "sunniva-7894f.firebaseapp.com",
    databaseURL: "https://sunniva-7894f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sunniva-7894f",
    storageBucket: "sunniva-7894f.appspot.com",
    messagingSenderId: "108362611718",
    appId: "1:108362611718:web:152f0c082c5e5944279787",
    measurementId: "G-KJMWKH2ZF9"
  };
// === include 'setup' then 'config' above ===

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const dbRef = ref(db);
const UserData = [];
var username, userage, useremail, x, x2;
var eiei = 1;
var rex2;

var UserArray;
var text = " ";
var AllData = [];
var UserHome = [];

//init graph
var Usrhome = [];
var Arr_Data = [];
var Arr_Tmp = [];
var Arr_Time = [];
var Arr_Humid = [];
var Tmp, Time, Humid, Power;
var UsrNickName;
var count = 0;

var option = {
    scales: {
        //responsive:false,
        //maintainAspectRatio:false,
        x: {
            type: 'time',
            time: {
                //parser:'ddd MMM DD YYYY  hh:mm:ss',
                parser: 'DD/MM/YYYY hh:mm:ss',
                displayFormats: {
                    hour: 'HH:mm',
                    minute: 'HH:mm',
                    second: 'HH:mm:ss'
                }
            }
        },
    }, animation: {
        duration: 1000
    },
    plugins: {
        zoom: {
            animation: {
                duration: 1000,
                easing: 'easeOutCubic'
            },
            pan: {
                enabled: true,
                mode: 'x',
                //threshold: 5,
                // pan options and/or events
            },
            zoom: {

                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'x',
            },

        }
    },

}

var option2 = {
    scales: {
        //responsive:false,
        //maintainAspectRatio:false,
        x: {
            type: 'time',
            time: {
                //parser:'ddd MMM DD YYYY  hh:mm:ss',
                parser: 'DD/MM/YYYY hh:mm:ss',
                displayFormats: {
                    hour: 'HH:mm',
                    minute: 'HH:mm',
                    second: 'HH:mm:ss'
                }
            }
        },
        y:{
            type: 'linear',
            display: true,
            position: 'left',
        },
        y1:{
            type: 'linear',
            display: true,
            position: 'right',
    
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
        },
    }, animation: {
        duration: 1000
    },
    plugins: {
        zoom: {
            animation: {
                duration: 1000,
                easing: 'easeOutCubic'
            },
            pan: {
                enabled: true,
                mode: 'x',
                //threshold: 5,
                // pan options and/or events
            },
            zoom: {

                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'x',
            },

        }
    },

}


async function main() {
    await onAuthStateChanged(auth, (user) => {
        if (count == 0) {
            if (user) {
                // Signed in 
                const uid = user.uid;
                const umail = user.email;
                const re = ref(db);
                // console.log("test")
                onValue(re, (snapshot) => {

                    snapshot.forEach(function (childSnapshot) {
                        rex2 = childSnapshot.val().email;
                        if (rex2 == umail) {
                            console.log("O")
                            const datauser = childSnapshot.key;
                            console.log(datauser);
                            const home = childSnapshot.key;
                            Usrhome.push(home); //Usrhome Arr
                            //console.log(Usrhome);

                            const UserHomeName = childSnapshot.val().uHome;

                            UsrNickName = childSnapshot.val().NickName;
                            //console.log(NickName);
                            UserArray = childSnapshot.val().UserData;
                            //UserArray.forEach(UArray);
                            //console.log(UserArray.length);

                            /* const boxhead = document.createElement("div");
                             boxhead.innerHTML = `
                             <div><br></div>
                             <div>${UserHomeName}</div>
                             `;
                             maingraph.appendChild(boxhead)*/

                            const graph = document.createElement("div");
                            graph.innerHTML = `
                            <div class="text-center" style="margin-bottom: 1.5rem;">
                            <div class="secHead hover-underline-animation" style="margin-top: 3rem;">${UserHomeName}
                            <img class="icon" src="img/icon-home.png" width="30" height="30" alt="">
                            </div>
                            </div>
                            
                            `;
                            maingraph.appendChild(graph)

                            const graph2 = document.createElement("div");
                            graph2.innerHTML = `
                            <div><br></div>
                            <div>${UserHomeName}</div>
                            `;
                            //main1.appendChild(graph2)

                            const graph3 = document.createElement("div");
                            graph3.innerHTML = `
                            <div><br></div>
                            <div>${UserHomeName}</div>
                            `;
                            //main2.appendChild(graph3)

                            const graph4 = document.createElement("div");
                            graph4.innerHTML = `
                            <div><br></div>
                            <div>${UserHomeName}</div>
                            `;
                            //main3.appendChild(graph4)


                            const data = {
                                labels: [],
                                datasets: [{
                                    label: 'Temp (°C)',
                                    //backgroundColor: 'rgb(255, 99, 132)',
                                    //borderColor: 'rgb(255, 99, 132)',
                                    data: [],
                                    borderColor: '#fa8072',
                                    backgroundColor: '#fa8072',
                                    borderWidth: 2,
                                    borderRadius: 0,
                                    borderSkipped: false,
                                }, {
                                    label: 'Temp Panel (°C)',
                                    //backgroundColor: 'rgb(255, 99, 132)',
                                    //borderColor: 'rgb(255, 99, 132)',
                                    data: [],
                                    borderColor: '#ffa500',
                                    backgroundColor: '#ffa500',
                                    borderWidth: 2,
                                    borderRadius: 0,
                                    borderSkipped: false,
                                }, {
                                    label: 'Humid (%)',
                                    //backgroundColor: 'rgb(255, 99, 132)',
                                    //borderColor: 'rgb(255, 99, 132)',
                                    data: [],
                                    borderColor: '#8ecae6',
                                    backgroundColor: '#8ecae6',
                                    borderWidth: 2,
                                    borderRadius: 0,
                                    borderSkipped: false,
                                },
                                ]
                            };

                            var config = {
                                type: 'bar',
                                data: data,
                                options: option,
                            };

                            var ch = document.createElement('canvas')
                            var testChart2 = new Chart(
                                ch = document.createElement('canvas'),
                                config,
                                graph.appendChild(ch),
                                maingraph.appendChild(graph),
                            );


                            var ch2 = document.createElement('canvas')
                            var config2 = {
                                data: {
                                    labels: [],
                                    datasets: [{
                                        type: 'line',
                                        label: 'Volt (V)',
                                        data: [],
                                        borderColor: '#3d5a80',
                                        backgroundColor: '#3d5a80',
                                        yAxisID: 'y',

                                    }, {
                                        type: 'line',
                                        label: 'Current (A)',
                                        data: [],
                                        borderColor: '#CD9E39',
                                        backgroundColor: '#CD9E39',
                                        yAxisID: 'y',
                                    },{
                                        type: 'bar',
                                        label: 'Light (Lux)',
                                        //backgroundColor: 'rgb(255, 99, 132)',
                                        //borderColor: 'rgb(255, 99, 132)',
                                        data: [],
                                        borderColor: '#bcccee',
                                        backgroundColor: '#bcccee',
                                        fill: false,
                                        tension: 0.1,
                                        yAxisID: 'y1',
                                    },
                                    ]
                                },
                                options: option2,
                            };
                            var t = document.createElement('div')
                            var testChart3 = new Chart(
                                ch2 = document.createElement('canvas'),
                                config2,
                                t.appendChild(ch2),
                                maingraph.appendChild(t),
                            );

                            var ch3 = document.createElement('canvas')
                            var config3 = {
                                type: 'line',
                                data: {
                                    labels: [],
                                    datasets: [{
                                        label: 'Power (W)',
                                        //backgroundColor: 'rgb(255, 99, 132)',
                                        //borderColor: 'rgb(255, 99, 132)',
                                        data: [],
                                        borderColor: 'rgb(205,92,92,0.4)',
                                        backgroundColor: 'rgb(205,92,92,0.4)',
                                        borderWidth: 2,
                                        borderRadius: 5,
                                        borderSkipped: false,
                                        tension: 0.4,
                                        fill: true,
                                    }
                                    ]
                                },
                                options: option, filler: {
                                    propagate: false,
                                },

                            };
                            var g3 = document.createElement('div')
                            var Chart3 = new Chart(
                                ch3 = document.createElement('canvas'),
                                config3,
                                g3.appendChild(ch3),
                                maingraph.appendChild(g3),
                            );

                            

                            UserArray.forEach((element) => {

                                const graph = document.createElement('canvas');
                                // console.log(element.Temp)
                                Tmp = element.Temp;
                                Time = element.Time;
                                Humid = element.Humi;
                                var Tmppanel = element.TempSolar;
                                var Volt = element.Voltage;
                                var Current = element.Current;
                                Power = element.Power;
                                var Light = element.Light;

                                //Arr_Data.push(element);
                                Arr_Tmp.push(Tmp);
                                Arr_Time.push(Time);
                                Arr_Humid.push(Humid);
                                //console.log(Arr_Tmp)
                                console.log(count)

                                testChart2.data.labels.push(Time);
                                testChart2.data.datasets[0].data.push(Tmp);
                                testChart2.data.datasets[1].data.push(Tmppanel);
                                testChart2.data.datasets[2].data.push(Humid);
                                testChart2.update();

                                testChart3.data.labels.push(Time);
                                testChart3.data.datasets[0].data.push(Volt);
                                testChart3.data.datasets[1].data.push(Current); 
                                testChart3.data.datasets[2].data.push(Light);     
                                testChart3.update();

                                Chart3.data.labels.push(Time);
                                Chart3.data.datasets[0].data.push(Power);
                                Chart3.data.datasets[0].data.fill = 'origin';
                                Chart3.update();

                                //maingraph.appendChild(ch);
                                //console.log("ok graph")
                                //border.appendChild(c);

                            });
                            count++;
                            //console.log(Usrhome.length);
                        }

                    });

                }, {
                    onlyOnce: true
                });

            } else {
                // User is signed out
                // ...
            }
        }
        count++;

    });

}
main();



