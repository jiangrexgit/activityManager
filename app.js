"use strict";
var Manager;
(function (Manager) {
    var Data = /** @class */ (function () {
        function Data() {
            this._data = new Object();
            this._data = {
                "user": [
                    {
                        "userName": "新增會員",
                        "userAuthority": " ",
                        "password": "111",
                        "actList": []
                    },
                    {
                        "userName": "mumu",
                        "userAuthority": "M",
                        "password": "1111",
                        "actList": []
                    },
                    {
                        "userName": "teacher",
                        "userAuthority": "T",
                        "password": "1111",
                        "actList": ["BALL", "PIANO", "BIKE"]
                    },
                    {
                        "userName": "student",
                        "userAuthority": "S",
                        "password": "1111",
                        "actList": ["GAMES", "BALL"]
                    }
                ],
                "act": [
                    {
                        "name": "新增活動",
                        "ActPeople": ""
                    },
                    {
                        "name": "BALL",
                        "ActPeople": 2
                    },
                    {
                        "name": "PIANO",
                        "ActPeople": 1
                    },
                    {
                        "name": "BIKE",
                        "ActPeople": 1
                    },
                    {
                        "name": "GAMES",
                        "ActPeople": 1
                    }
                ]
            };
        }
        Data.prototype.getData = function () {
            return this._data;
        };
        return Data;
    }());
    Manager.Data = Data;
})(Manager || (Manager = {}));
/// <reference path="data.ts" />
var Manager;
/// <reference path="data.ts" />
(function (Manager) {
    var Model = /** @class */ (function () {
        function Model() {
            this._userData = new Object();
            this._actData = new Object();
        }
        Model.prototype.loadJSON = function (file) {
            var _this = this;
            console.log("load JSON");
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function (e) {
                console.log(e.currentTarget);
                var response = e.currentTarget;
                if (response.readyState == 4 && response.status == 200) {
                    var jsonObj = JSON.parse(response.responseText);
                    _this._userData = jsonObj['user'];
                    _this._actData = jsonObj['act'];
                    localStorage.setItem('userData', JSON.stringify(_this._userData));
                    localStorage.setItem('actData', JSON.stringify(_this._actData));
                    var evt = new Event("loadSuccess");
                    document.dispatchEvent(evt);
                }
            };
            xmlhttp.open("GET", file, true);
            xmlhttp.send();
        };
        Model.prototype.loadLocalData = function () {
            console.log("load Local Data");
            localStorage.clear();
            var obj = new Manager.Data();
            var localObj = obj.getData();
            this._userData = localObj['user'];
            this._actData = localObj['act'];
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        };
        Model.prototype.loadData = function () {
            console.log("load LocalStroage");
            this._userData = JSON.parse(localStorage.getItem('userData'));
            this._actData = JSON.parse(localStorage.getItem('actData'));
        };
        Model.prototype.getData = function () {
            return this._userData;
        };
        Model.prototype.getActData = function () {
            return this._actData;
        };
        Model.prototype.addData = function (name, pw) {
            var obj = { 'userName': name, "userAuthority": "S", "password": pw };
            this._userData.push(obj);
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        };
        Model.prototype.removeData = function (index) {
            this._userData.splice(index, 1);
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        };
        Model.prototype.editData = function (index, name, pw) {
            this._userData[index]['userName'] = name;
            this._userData[index]['password'] = pw;
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        };
        Model.prototype.addActData = function (name) {
            var obj = {
                "name": name,
                "ActCount": 0,
                "ActPeople": 0
            };
            this._actData.push(obj);
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        };
        Model.prototype.editActData = function (index, data) {
            for (var i in this._userData) {
                console.log(this._userData[i], (data));
                var actIndex = this._userData[i]['actList'].indexOf(this._actData[index]['name']);
                if (actIndex != -1) {
                    this._userData[i]['actList'][actIndex] = data;
                }
            }
            this._actData[index]['name'] = data;
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        };
        Model.prototype.removeActData = function (index) {
            this._actData.splice(index, 1);
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        };
        Model.prototype.orderAct = function (userName, index) {
            for (var i in this._userData) {
                if (this._userData[i]['userName'] == userName) {
                    if (this._userData[i]['actList'].indexOf(this._actData[index]['name']) == -1) {
                        this._userData[i]['actList'].push(this._actData[index]['name']);
                        this._actData[index]['ActPeople'] += 1;
                        localStorage.clear();
                        localStorage.setItem('userData', JSON.stringify(this._userData));
                        localStorage.setItem('actData', JSON.stringify(this._actData));
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        };
        Model.prototype.cancelAct = function (userName, index) {
            for (var i in this._userData) {
                if (this._userData[i]['userName'] == userName) {
                    var actIndex = this._userData[i]['actList'].indexOf(this._actData[index]['name']);
                    if (actIndex != -1) {
                        this._userData[i]['actList'].splice(actIndex, 1);
                        this._actData[index]['ActPeople'] -= 1;
                        localStorage.clear();
                        localStorage.setItem('userData', JSON.stringify(this._userData));
                        localStorage.setItem('actData', JSON.stringify(this._actData));
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        };
        return Model;
    }());
    Manager.Model = Model;
})(Manager || (Manager = {}));
/// <reference path="Model.ts" />
var Manager;
/// <reference path="Model.ts" />
(function (Manager) {
    var Main = /** @class */ (function () {
        function Main() {
            this._select = '';
            this._playing = '0';
            this._startTime = 0;
            this._endTime = 0;
            this._isLogin = true;
            this._auth = 'G';
            this._userName = '';
            this._model = new Manager.Model();
            if (localStorage.getItem('actData') == null) {
                this._model.loadLocalData();
                this.login();
            }
            else {
                this._model.loadData();
                this.login();
            }
        }
        Main.prototype.login = function () {
            var _this = this;
            {
                var account = prompt("請輸入帳號:");
                var password = prompt("請輸入密碼:");
                for (var i in this._model.getData()) {
                    if (this._model.getData()[i]['userName'] == account && this._model.getData()[i]['password'] == password) {
                        this._isLogin = true;
                        this._userName = this._model.getData()[i]['userName'];
                        this._auth = this._model.getData()[i]['userAuthority'];
                        break;
                    }
                }
                if (this._isLogin) {
                    alert("登入成功");
                    this.creatTable();
                    this.creatActTable();
                    this.createActList();
                    this.creatDataTable();
                    $('.Tag').on('click', function (e) {
                        console.log(e.currentTarget.id);
                        document.getElementById('userName').setAttribute('style', "visibility:hidden");
                        document.getElementById('actManager').setAttribute('style', "visibility:hidden");
                        document.getElementById('signUp').setAttribute('style', "visibility:hidden");
                        document.getElementById('ActData').setAttribute('style', "visibility:hidden");
                        document.getElementById('ActDataSchool').setAttribute('style', "visibility:hidden");
                        switch (e.currentTarget.id) {
                            case "0":
                                document.getElementById('userName').setAttribute('style', "visibility:visible");
                                break;
                            case "1":
                                if (_this._auth != "S") {
                                    document.getElementById('actManager').setAttribute('style', "visibility:visible");
                                }
                                break;
                            case "2":
                                document.getElementById('signUp').setAttribute('style', "visibility:visible");
                                break;
                            case "3":
                                if (_this._auth == "S") {
                                    document.getElementById('ActData').setAttribute('style', "visibility:visible");
                                }
                                else {
                                    document.getElementById('ActDataSchool').setAttribute('style', "visibility:visible");
                                }
                                break;
                        }
                    });
                }
                else {
                    alert("帳號或密碼錯誤");
                    this._auth = "G"; //Guset
                    this.creatTable();
                }
            }
        };
        Main.prototype.creatTable = function () {
            var _this = this;
            var data = this._model.getData();
            console.log(this._model.getData());
            var oldTable = document.getElementById("table");
            oldTable.remove();
            var tableParent = document.getElementById("userName");
            var table = document.createElement("tbody");
            table.setAttribute("id", "table");
            tableParent.appendChild(table);
            for (var i = 0; i < data.length; i++) {
                var row = table.insertRow(i);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);
                if (data[i]['userName'] == "新增會員") {
                    col1.innerHTML = "新增會員";
                    col1.setAttribute("class", "center");
                    var btn = document.createElement("button");
                    btn.innerText = "登入";
                    btn.className = "editBtn";
                    btn.setAttribute("id", "login");
                    col2.appendChild(btn);
                    var btn1 = document.createElement("button");
                    btn1.innerText = "註冊";
                    btn1.className = "editBtn";
                    btn1.setAttribute("id", "add");
                    col2.setAttribute("colspan", "2");
                    col2.setAttribute("class", "center");
                    col2.appendChild(btn1);
                    if (this._auth == "G")
                        break;
                }
                else {
                    var col3 = row.insertCell(2);
                    col1.innerHTML = data[i]['userName'];
                    if ((this._auth == "S" || this._auth == "T") && this._userName == data[i]['userName']) {
                        col2.innerHTML = data[i]['userAuthority'];
                        col2.setAttribute("class", "center");
                        var btn = document.createElement("button");
                        btn.className = "editBtn";
                        btn.innerText = "修改";
                        btn.setAttribute("id", "edit-" + i);
                        col3.appendChild(btn);
                        var btn2 = document.createElement("button");
                        btn2.className = "editBtn";
                        btn2.innerText = "刪除";
                        btn2.setAttribute("id", "delete-" + i);
                        col3.appendChild(btn2);
                    }
                    else if (this._auth == "M") {
                        col2.innerHTML = data[i]['userAuthority'];
                        col2.setAttribute("class", "center");
                        var btn = document.createElement("button");
                        btn.className = "editBtn";
                        btn.innerText = "修改";
                        btn.setAttribute("id", "edit-" + i);
                        col3.appendChild(btn);
                        var btn2 = document.createElement("button");
                        btn2.className = "editBtn";
                        btn2.innerText = "刪除";
                        btn2.setAttribute("id", "delete-" + i);
                        col3.appendChild(btn2);
                        var btn3 = document.createElement("button");
                        btn3.className = "editBtn";
                        btn3.innerText = "權限修改";
                        btn3.setAttribute("id", "auth-" + i);
                        col3.appendChild(btn3);
                        var selectList = document.createElement("select");
                        selectList.id = "select-" + i;
                        col3.appendChild(selectList);
                        var array = ["Manager", "Teacher", "Student"];
                        var arrayValue = ["M", "T", "S"];
                        for (var j = 0; j < array.length; j++) {
                            var input = document.createElement("option");
                            input.value = arrayValue[j];
                            input.text = array[j];
                            input.setAttribute("id", "auth-" + i);
                            selectList.appendChild(input);
                        }
                    }
                }
            }
            $(':button').on('click', function (e) {
                var idSpilt = e.target.id.split("-");
                console.log(idSpilt);
                switch (idSpilt[0]) {
                    case "login":
                        _this.login();
                        break;
                    case "add":
                        var account = prompt("請輸入帳號:");
                        var password = prompt("請輸入密碼:");
                        if (account != "" && password != "" && account != null && password != null) {
                            _this._model.addData(account, password);
                        }
                        else {
                            alert("新增失敗");
                        }
                        _this.creatTable();
                        _this.creatActTable();
                        break;
                    case "edit":
                        var account = prompt("請輸入帳號:");
                        var password = prompt("請輸入密碼:");
                        if (account != "" && password != "" && account != null && password != null) {
                            _this._model.editData(Number(idSpilt[1]), account, password);
                        }
                        else {
                            alert("修改失敗");
                        }
                        _this.creatTable();
                        _this.creatActTable();
                        break;
                    case "delete":
                        _this._model.removeData(Number(idSpilt[1]));
                        _this.creatTable();
                        _this.creatActTable();
                        break;
                }
            });
        };
        Main.prototype.creatActTable = function () {
            var _this = this;
            var data = this._model.getActData();
            console.log(this._model.getActData());
            var oldTable = document.getElementById("tableActManager");
            oldTable.remove();
            var tableParent = document.getElementById("actManager");
            var table = document.createElement("tbody");
            table.setAttribute("id", "tableActManager");
            tableParent.appendChild(table);
            for (var i = 0; i < data.length; i++) {
                var row = table.insertRow(i);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);
                if (data[i]['name'] == "新增活動") {
                    var btn = document.createElement("button");
                    btn.className = "editBtn";
                    btn.innerText = "新增活動";
                    btn.setAttribute("id", "addAct-" + i);
                    col1.appendChild(btn);
                    col2.innerHTML = "查詢活動";
                    var input = document.createElement("input");
                    input.className = "editInput";
                    input.setAttribute("id", "addAct-" + i);
                    col2.appendChild(input);
                }
                else {
                    if (this._auth != "S") {
                        col1.innerHTML = data[i]['name'];
                        col1.setAttribute('id', data[i]['name']);
                        var btn = document.createElement("button");
                        btn.className = "editBtn";
                        btn.innerText = "修改";
                        btn.setAttribute("id", "editAct-" + i);
                        col2.appendChild(btn);
                        var btn2 = document.createElement("button");
                        btn2.className = "editBtn";
                        btn2.innerText = "刪除";
                        btn2.setAttribute("id", "deleteAct-" + i);
                        col2.appendChild(btn2);
                    }
                }
            }
            $(':button').on('click', function (e) {
                var idSpilt = e.target.id.split("-");
                console.log(idSpilt);
                switch (idSpilt[0]) {
                    case "addAct":
                        var act = prompt("請輸入欲新增的活動名稱:");
                        if (act != "" && act != null) {
                            _this._model.addActData(act);
                        }
                        else {
                            alert("新增失敗");
                        }
                        _this.creatTable();
                        _this.creatActTable();
                        break;
                    case "editAct":
                        var act = prompt("請輸入欲修改的活動名稱:");
                        if (act != "" && act != null) {
                            _this._model.editActData(Number(idSpilt[1]), act);
                        }
                        else {
                            alert("修改失敗");
                        }
                        _this.creatTable();
                        _this.creatActTable();
                        _this.createActList();
                        _this.creatDataTable();
                        break;
                    case "deleteAct":
                        _this._model.removeActData(Number(idSpilt[1]));
                        _this.creatTable();
                        _this.creatActTable();
                        _this.createActList();
                        _this.creatDataTable();
                        break;
                }
            });
            $(":input").on('input', function (e) {
                console.log(e.currentTarget.value);
                if (e.currentTarget.value != "" && e.currentTarget.value != null) {
                    $("#tableActManager").find('td').css('background-color', '#FFFFFF');
                    $("#tableActManager").find("#" + (e.currentTarget.value)).css('background-color', 'rgba(255,244,193,0.7)');
                }
            });
        };
        Main.prototype.createActList = function () {
            var _this = this;
            var data = this._model.getActData();
            console.log(this._model.getActData());
            var oldTable = document.getElementById("tableSignUp");
            oldTable.remove();
            var tableParent = document.getElementById("signUp");
            var table = document.createElement("tbody");
            table.setAttribute("id", "tableSignUp");
            tableParent.appendChild(table);
            console.log(this._model.getData());
            for (var i = 1; i < data.length; i++) {
                var row = table.insertRow(i - 1);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);
                var col3 = row.insertCell(2);
                col1.innerHTML = data[i]['name'];
                col1.setAttribute("id", String(i));
                col1.setAttribute('class', 'center');
                for (var index in this._model.getData()) {
                    if (this._model.getData()[index]['userName'] == this._userName) {
                        console.log(data[i]['name'], this._model.getData()[index]['actList'].indexOf(data[i]['name']));
                        if (this._model.getData()[index]['actList'].indexOf(data[i]['name']) != -1) {
                            col2.innerHTML = "Y";
                        }
                        else {
                            col2.innerHTML = "N";
                        }
                        col2.setAttribute('class', 'center');
                    }
                }
                var btn = document.createElement("button");
                btn.className = "editBtn";
                btn.innerText = "預約報名";
                btn.setAttribute("id", "order-" + i);
                col3.appendChild(btn);
                var btn2 = document.createElement("button");
                btn2.className = "editBtn";
                btn2.innerText = "取消預約";
                btn2.setAttribute("id", "cancel-" + i);
                col3.appendChild(btn2);
                var btn3 = document.createElement("button");
                btn3.className = "editBtn";
                btn3.innerText = "小鈴鐺";
                btn3.setAttribute("id", "ring-" + i);
                col3.appendChild(btn3);
            }
            $(':button').on('click', function (e) {
                var idSpilt = e.target.id.split("-");
                console.log(idSpilt);
                switch (idSpilt[0]) {
                    case "order":
                        if (_this._model.orderAct(_this._userName, Number(idSpilt[1]))) {
                            alert('預約成功');
                        }
                        else {
                            alert('已預約過');
                        }
                        _this.creatTable();
                        _this.creatActTable();
                        _this.createActList();
                        _this.creatDataTable();
                        break;
                    case "cancel":
                        if (_this._model.cancelAct(_this._userName, Number(idSpilt[1]))) {
                            alert('取消成功');
                        }
                        else {
                            alert('尚未預約');
                        }
                        _this.creatTable();
                        _this.creatActTable();
                        _this.createActList();
                        _this.creatDataTable();
                        break;
                    case "ring":
                        $("#tableSignUp").find("#" + (Number(idSpilt[1]))).css('background-color', '#CC0000');
                        break;
                }
            });
        };
        Main.prototype.creatDataTable = function () {
            var data = this._model.getActData();
            console.log(this._model.getActData());
            var oldTableSchool = document.getElementById("tableActDataSchool");
            oldTableSchool.remove();
            var tableParentSchool = document.getElementById("ActDataSchool");
            var tableSchool = document.createElement("tbody");
            tableSchool.setAttribute("id", "tableActDataSchool");
            tableParentSchool.appendChild(tableSchool);
            for (var i = 1; i < data.length; i++) {
                var row = tableSchool.insertRow(i - 1);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);
                col1.innerHTML = data[i]['name'];
                col1.setAttribute('class', 'center');
                col2.innerHTML = (data[i]['ActPeople'] + "人");
                col2.setAttribute('class', 'center');
            }
            var row = tableSchool.insertRow(data.length - 1);
            var col1 = row.insertCell(0);
            var col2 = row.insertCell(1);
            col1.innerHTML = "當月活動數量";
            col1.setAttribute('class', 'center');
            col2.innerHTML = data.length;
            col2.setAttribute('class', 'center');
            //////////////////////////////////////////////////////
            var data = this._model.getData();
            console.log(this._model.getData());
            var oldTable = document.getElementById("tableActData");
            oldTable.remove();
            var tableParent = document.getElementById("ActData");
            var table = document.createElement("tbody");
            table.setAttribute("id", "tableActData");
            tableParent.appendChild(table);
            for (var index in this._model.getData()) {
                if (this._model.getData()[index]['userName'] == this._userName) {
                    var row = table.insertRow(0);
                    var col1 = row.insertCell(0);
                    var col2 = row.insertCell(1);
                    col1.innerHTML = this._userName;
                    col1.setAttribute('class', 'center');
                    col2.innerHTML = this._model.getData()[index]['actList'].length;
                    col2.setAttribute('class', 'center');
                }
            }
        };
        return Main;
    }());
    Manager.Main = Main;
    var a = new Main();
})(Manager || (Manager = {}));
