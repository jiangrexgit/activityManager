/// <reference path="Model.ts" />
namespace Manager {
    export class Main {
        protected _model: Model
        protected _select: string = '';
        protected _playing: string = '0';
        protected _startTime: number = 0;
        protected _endTime: number = 0;
        protected _isLogin: boolean = true;

        protected _auth: string = 'G';
        protected _userName: string = '';

        constructor() {
            this._model = new Model();
            if (localStorage.getItem('actData') == null) {
                this._model.loadLocalData();
                this.login();
            } else {
                this._model.loadData();
                this.login();
            }
        }

        public login(): void {
            {
                var account = prompt("請輸入帳號:");
                var password = prompt("請輸入密碼:");

                for (let i in this._model.getData()) {
                    if ((this._model.getData() as any)[i]['userName'] == account && (this._model.getData() as any)[i]['password'] == password) {
                        this._isLogin = true;
                        this._userName = (this._model.getData() as any)[i]['userName']
                        this._auth = (this._model.getData() as any)[i]['userAuthority']
                        break;
                    }
                }
                if (this._isLogin) {
                    alert("登入成功");

                    this.creatTable();
                    this.creatActTable();
                    this.createActList();
                    this.creatDataTable();

                    $('.Tag').on('click', (e) => {
                        console.log(e.currentTarget.id);
                        (document.getElementById('userName') as HTMLTableElement).setAttribute('style', "visibility:hidden");
                        (document.getElementById('actManager') as HTMLTableElement).setAttribute('style', "visibility:hidden");
                        (document.getElementById('signUp') as HTMLTableElement).setAttribute('style', "visibility:hidden");
                        (document.getElementById('ActData') as HTMLTableElement).setAttribute('style', "visibility:hidden");
                        (document.getElementById('ActDataSchool') as HTMLTableElement).setAttribute('style', "visibility:hidden");
                        switch (e.currentTarget.id) {
                            case "0":
                                (document.getElementById('userName') as HTMLTableElement).setAttribute('style', "visibility:visible");
                                break;
                            case "1":
                                if (this._auth != "S") {
                                    (document.getElementById('actManager') as HTMLTableElement).setAttribute('style', "visibility:visible");
                                }
                                break;
                            case "2":
                                (document.getElementById('signUp') as HTMLTableElement).setAttribute('style', "visibility:visible");
                                break;
                            case "3":
                                if (this._auth == "S") {
                                    (document.getElementById('ActData') as HTMLTableElement).setAttribute('style', "visibility:visible");
                                } else {
                                    (document.getElementById('ActDataSchool') as HTMLTableElement).setAttribute('style', "visibility:visible");
                                }
                                break;
                        }
                    })

                }
                else {
                    alert("帳號或密碼錯誤");
                    this._auth = "G"//Guset
                    this.creatTable();
                }
            }
        }

        public creatTable(): void {
            var data: any = (this._model.getData() as any);
            console.log(this._model.getData());
            var oldTable = document.getElementById("table");
            (oldTable as HTMLTableElement).remove();

            let tableParent = document.getElementById("userName");
            let table = document.createElement("tbody");
            table.setAttribute("id", "table");
            (tableParent as HTMLTableElement).appendChild(table);

            for (var i = 0; i < data.length; i++) {

                var row = table.insertRow(i);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);

                if (data[i]['userName'] == "新增會員") {
                    col1.innerHTML = "新增會員";
                    col1.setAttribute("class", "center")
                    let btn = document.createElement("button");
                    btn.innerText = "登入";
                    btn.className = "editBtn";
                    btn.setAttribute("id", "login")
                    col2.appendChild(btn);

                    let btn1 = document.createElement("button");
                    btn1.innerText = "註冊";
                    btn1.className = "editBtn";
                    btn1.setAttribute("id", "add")
                    col2.setAttribute("colspan", "2")
                    col2.setAttribute("class", "center")
                    col2.appendChild(btn1);
                    if (this._auth == "G") break;
                } else {
                    var col3 = row.insertCell(2);
                    col1.innerHTML = data[i]['userName'];
                    if ((this._auth == "S" || this._auth == "T") && this._userName == data[i]['userName']) {
                        col2.innerHTML = data[i]['userAuthority'];
                        col2.setAttribute("class", "center")
                        let btn = document.createElement("button");
                        btn.className = "editBtn";
                        btn.innerText = "修改";
                        btn.setAttribute("id", "edit-" + i);
                        col3.appendChild(btn);
                        let btn2 = document.createElement("button");
                        btn2.className = "editBtn";
                        btn2.innerText = "刪除"
                        btn2.setAttribute("id", "delete-" + i);
                        col3.appendChild(btn2);
                    } else if (this._auth == "M") {
                        col2.innerHTML = data[i]['userAuthority'];
                        col2.setAttribute("class", "center")

                        let btn = document.createElement("button");
                        btn.className = "editBtn";
                        btn.innerText = "修改";
                        btn.setAttribute("id", "edit-" + i);
                        col3.appendChild(btn);
                        let btn2 = document.createElement("button");
                        btn2.className = "editBtn";
                        btn2.innerText = "刪除"
                        btn2.setAttribute("id", "delete-" + i);
                        col3.appendChild(btn2);
                        let btn3 = document.createElement("button");
                        btn3.className = "editBtn";
                        btn3.innerText = "權限修改";
                        btn3.setAttribute("id", "auth-" + i);
                        col3.appendChild(btn3);

                        var selectList = document.createElement("select");
                        selectList.id = "select-" + i;
                        col3.appendChild(selectList);

                        var array = ["Manager", "Teacher", "Student"]
                        var arrayValue = ["M", "T", "S"]
                        for (let j = 0; j < array.length; j++) {
                            let input = document.createElement("option");
                            (input as any).value = arrayValue[j];
                            (input as any).text = array[j];
                            input.setAttribute("id", "auth-" + i)
                            selectList.appendChild(input);
                        }
                    }
                }
            }

            $(':button').on('click', (e) => {
                var idSpilt = e.target.id.split("-")
                console.log(idSpilt)
                switch (idSpilt[0]) {
                    case "login":
                        this.login();
                        break;
                    case "add":
                        var account = prompt("請輸入帳號:");
                        var password = prompt("請輸入密碼:");
                        if (account != "" && password != "" && account != null && password != null) {
                            this._model.addData((account as string), (password as string));
                        } else {
                            alert("新增失敗");
                        }
                        this.creatTable();
                        this.creatActTable();
                        break;
                    case "edit":
                        var account = prompt("請輸入帳號:");
                        var password = prompt("請輸入密碼:");
                        if (account != "" && password != "" && account != null && password != null) {
                            this._model.editData(Number(idSpilt[1]), (account as string), (password as string));
                        } else {
                            alert("修改失敗");
                        }
                        this.creatTable();
                        this.creatActTable();
                        break;
                    case "delete":
                        this._model.removeData(Number(idSpilt[1]));
                        this.creatTable();
                        this.creatActTable();
                        break;
                }
            });
        }

        public creatActTable(): void {
            var data: any = (this._model.getActData() as any);
            console.log(this._model.getActData());
            var oldTable = document.getElementById("tableActManager");
            (oldTable as HTMLTableElement).remove();

            let tableParent = document.getElementById("actManager");
            let table = document.createElement("tbody");
            table.setAttribute("id", "tableActManager");
            (tableParent as HTMLTableElement).appendChild(table);

            for (var i = 0; i < data.length; i++) {
                var row = table.insertRow(i);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);

                if (data[i]['name'] == "新增活動") {
                    let btn = document.createElement("button");
                    btn.className = "editBtn";
                    btn.innerText = "新增活動";
                    btn.setAttribute("id", "addAct-" + i);
                    col1.appendChild(btn);

                    col2.innerHTML = "查詢活動";
                    let input = document.createElement("input");
                    input.className = "editInput";
                    input.setAttribute("id", "addAct-" + i);
                    col2.appendChild(input);
                } else {
                    if (this._auth != "S") {
                        col1.innerHTML = data[i]['name'];
                        col1.setAttribute('id', data[i]['name']);
                        let btn = document.createElement("button");
                        btn.className = "editBtn";
                        btn.innerText = "修改";
                        btn.setAttribute("id", "editAct-" + i);
                        col2.appendChild(btn);

                        let btn2 = document.createElement("button");
                        btn2.className = "editBtn";
                        btn2.innerText = "刪除"
                        btn2.setAttribute("id", "deleteAct-" + i);
                        col2.appendChild(btn2);
                    }
                }
            }

            $(':button').on('click', (e) => {
                var idSpilt = e.target.id.split("-")
                console.log(idSpilt)
                switch (idSpilt[0]) {
                    case "addAct":
                        var act = prompt("請輸入欲新增的活動名稱:");
                        if (act != "" && act != null) {
                            this._model.addActData((act as string));
                        } else {
                            alert("新增失敗");
                        }
                        this.creatTable();
                        this.creatActTable();
                        break;
                    case "editAct":
                        var act = prompt("請輸入欲修改的活動名稱:");
                        if (act != "" && act != null) {
                            this._model.editActData(Number(idSpilt[1]), (act as string));
                        } else {
                            alert("修改失敗");
                        }
                        this.creatTable();
                        this.creatActTable();
                        this.createActList();
                        this.creatDataTable();
                        break;
                    case "deleteAct":
                        this._model.removeActData(Number(idSpilt[1]));
                        this.creatTable();
                        this.creatActTable();
                        this.createActList();
                        this.creatDataTable();
                        break;
                }
            });

            $(":input").on('input', (e) => {
                console.log(e.currentTarget.value);
                if (e.currentTarget.value != "" && e.currentTarget.value != null) {
                    $("#tableActManager").find('td').css('background-color', '#FFFFFF');
                    $("#tableActManager").find("#" + (e.currentTarget.value)).css('background-color', 'rgba(255,244,193,0.7)')

                }
            })
        }

        public createActList(): void {
            var data: any = (this._model.getActData() as any);
            console.log(this._model.getActData());
            var oldTable = document.getElementById("tableSignUp");
            (oldTable as HTMLTableElement).remove();

            let tableParent = document.getElementById("signUp");
            let table = document.createElement("tbody");
            table.setAttribute("id", "tableSignUp");
            (tableParent as HTMLTableElement).appendChild(table);

            console.log(this._model.getData());
            for (var i = 1; i < data.length; i++) {
                var row = table.insertRow(i - 1);
                var col1 = row.insertCell(0);
                var col2 = row.insertCell(1);
                var col3 = row.insertCell(2);


                col1.innerHTML = data[i]['name'];
                col1.setAttribute("id", String(i));
                col1.setAttribute('class', 'center');
                for (let index in this._model.getData()) {
                    if ((this._model.getData() as any)[index]['userName'] == this._userName) {
                        console.log(data[i]['name'], (this._model.getData() as any)[index]['actList'].indexOf(data[i]['name']))
                        if ((this._model.getData() as any)[index]['actList'].indexOf(data[i]['name']) != -1) {
                            col2.innerHTML = "Y";
                        } else {
                            col2.innerHTML = "N"
                        }
                        col2.setAttribute('class', 'center');
                    }
                }
                let btn = document.createElement("button");
                btn.className = "editBtn";
                btn.innerText = "預約報名";
                btn.setAttribute("id", "order-" + i);
                col3.appendChild(btn);

                let btn2 = document.createElement("button");
                btn2.className = "editBtn";
                btn2.innerText = "取消預約"
                btn2.setAttribute("id", "cancel-" + i);
                col3.appendChild(btn2);

                let btn3 = document.createElement("button");
                btn3.className = "editBtn";
                btn3.innerText = "小鈴鐺"
                btn3.setAttribute("id", "ring-" + i);
                col3.appendChild(btn3);

            }

            $(':button').on('click', (e) => {
                var idSpilt = e.target.id.split("-")
                console.log(idSpilt)
                switch (idSpilt[0]) {
                    case "order":
                        if (this._model.orderAct(this._userName, Number(idSpilt[1]))) {
                            alert('預約成功')
                        } else {
                            alert('已預約過')
                        }
                        this.creatTable();
                        this.creatActTable();
                        this.createActList();
                        this.creatDataTable();
                        break;
                    case "cancel":
                        if (this._model.cancelAct(this._userName, Number(idSpilt[1]))) {
                            alert('取消成功')
                        } else {
                            alert('尚未預約')
                        }
                        this.creatTable();
                        this.creatActTable();
                        this.createActList();
                        this.creatDataTable();
                        break;
                    case "ring":
                        $("#tableSignUp").find("#" + (Number(idSpilt[1]))).css('background-color', '#CC0000')
                        break;
                }
            });
        }

        public creatDataTable(): void {
            var data: any = (this._model.getActData() as any);
            console.log(this._model.getActData());
            var oldTableSchool = document.getElementById("tableActDataSchool");
            (oldTableSchool as HTMLTableElement).remove();

            let tableParentSchool = document.getElementById("ActDataSchool");
            let tableSchool = document.createElement("tbody");
            tableSchool.setAttribute("id", "tableActDataSchool");
            (tableParentSchool as HTMLTableElement).appendChild(tableSchool);

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


            col1.innerHTML = "當月活動數量"
            col1.setAttribute('class', 'center');

            col2.innerHTML = data.length;
            col2.setAttribute('class', 'center');

            //////////////////////////////////////////////////////
            var data: any = (this._model.getData() as any);
            console.log(this._model.getData());
            var oldTable = document.getElementById("tableActData");
            (oldTable as HTMLTableElement).remove();

            let tableParent = document.getElementById("ActData");
            let table = document.createElement("tbody");
            table.setAttribute("id", "tableActData");
            (tableParent as HTMLTableElement).appendChild(table);

            for (let index in this._model.getData()) {
                if ((this._model.getData() as any)[index]['userName'] == this._userName) {
                    var row = table.insertRow(0);
                    var col1 = row.insertCell(0);
                    var col2 = row.insertCell(1);
                    col1.innerHTML = this._userName;
                    col1.setAttribute('class', 'center');

                    col2.innerHTML = (this._model.getData() as any)[index]['actList'].length;
                    col2.setAttribute('class', 'center');
                }
            }


        }
    }

    let a = new Main();
}

