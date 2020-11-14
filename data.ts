namespace Manager {
    export class Data {
        private _data: Object;
        constructor() {
            this._data = new Object();
            this._data = {
                "user": [
                    {
                        "userName": "新增會員",
                        "userAuthority": " ",
                        "password": "111",
                        "actList":[]
                    },
                    {
                        "userName": "mumu",
                        "userAuthority": "M",
                        "password": "1111",
                        "actList":[]
                    },
                    {
                        "userName": "teacher",
                        "userAuthority": "T",
                        "password": "1111",
                        "actList":["BALL","PIANO","BIKE"]
                    },
                    {
                        "userName": "student",
                        "userAuthority": "S",
                        "password": "1111",
                        "actList":["GAMES","BALL"]
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
            }
        }

        public getData():Object{
            return this._data
        }
    }
}