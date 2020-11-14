/// <reference path="data.ts" />
namespace Manager {
    export class Model {

        protected _userData: any;
        protected _actData: any;
        protected _updateList: any;
        protected _deleteList: any;

        constructor() {
            this._userData = new Object();
            this._actData = new Object();
        }

        public loadJSON(file: string): void {
            console.log("load JSON");
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = (e: Event) => {
                console.log(e.currentTarget);
                var response = e.currentTarget as XMLHttpRequest
                if (response.readyState == 4 && response.status == 200) {
                    var jsonObj = JSON.parse(response.responseText);
                    this._userData = jsonObj['user'];
                    this._actData = jsonObj['act'];

                    localStorage.setItem('userData', JSON.stringify(this._userData));
                    localStorage.setItem('actData', JSON.stringify(this._actData));

                    var evt = new Event("loadSuccess");
                    document.dispatchEvent(evt);
                }
            };

            xmlhttp.open("GET", file, true);
            xmlhttp.send();
        }

        public loadLocalData(): void {
            console.log("load Local Data");
            localStorage.clear();
            var obj = new Data();
            var localObj: any = obj.getData();
            this._userData = localObj['user'];
            this._actData = localObj['act'];

            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        }

        public loadData(): void {
            console.log("load LocalStroage");
            this._userData = JSON.parse(localStorage.getItem('userData') as string);
            this._actData = JSON.parse(localStorage.getItem('actData') as string);
        }

        public getData(): Object {
            return this._userData;
        }

        public getActData(): Object {
            return this._actData;
        }

        public addData(name: string, pw: string): void {
            let obj = { 'userName': name, "userAuthority": "S", "password": pw }
            this._userData.push(obj)
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        }

        public removeData(index: number): void {
            this._userData.splice(index, 1);
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        }

        public editData(index: number, name: string, pw: string): void {
            this._userData[index]['userName'] = name;
            this._userData[index]['password'] = pw;
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        }

        public addActData(name: string): void {
            let obj = {
                "name": name,
                "ActCount": 0,
                "ActPeople": 0
            }
            this._actData.push(obj)
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        }

        public editActData(index: number, data: string): void {
            for (let i in this._userData) {
                console.log(this._userData[i],(data))
                var actIndex = this._userData[i]['actList'].indexOf(this._actData[index]['name'])
                if(actIndex != -1){
                    this._userData[i]['actList'][actIndex] = data;
                }
            }
            this._actData[index]['name'] = data;
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        }

        public removeActData(index: number): void {
            this._actData.splice(index, 1);
            localStorage.clear();
            localStorage.setItem('userData', JSON.stringify(this._userData));
            localStorage.setItem('actData', JSON.stringify(this._actData));
        }

        public orderAct(userName: string, index: number): any {
            for (let i in this._userData) {
                if ((this._userData as any)[i]['userName'] == userName) {
                    if(this._userData[i]['actList'].indexOf(this._actData[index]['name']) == -1){
                        this._userData[i]['actList'].push(this._actData[index]['name']);
                        this._actData[index]['ActPeople'] += 1;
                        localStorage.clear();
                        localStorage.setItem('userData', JSON.stringify(this._userData));
                        localStorage.setItem('actData', JSON.stringify(this._actData));
                        return true;
                    }else{
                        return false;
                    }
                    
                }
            }
        }

        public cancelAct(userName: string, index: number): any {
            for (let i in this._userData) {
                if ((this._userData as any)[i]['userName'] == userName) {
                    var actIndex = this._userData[i]['actList'].indexOf(this._actData[index]['name'])
                    if(actIndex != -1){
                        this._userData[i]['actList'].splice(actIndex,1);
                        this._actData[index]['ActPeople'] -= 1;
                        localStorage.clear();
                        localStorage.setItem('userData', JSON.stringify(this._userData));
                        localStorage.setItem('actData', JSON.stringify(this._actData));
                        return true;
                    }else{
                        return false;
                    }
                    
                }
            }
        }
    }
}

