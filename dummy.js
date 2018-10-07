/** 
        FAKE TESTING DATA FOR THE STREAM GRAPHS
        */
        //@var {Number}
        var FOO = 0;
        /** 
         * comment
         * @method getFakeData
         * */
        var getFakeData = function(params) {
            return new Promise(
                function (resolve, reject) {
                    //console.log(params);
                    let c = 0;
                    FOO++;
                    if(FOO < 50){
                        c = Math.random() * 600;
                    }
                    if(FOO > 50){
                        c = Math.random() * 100;
                    }
                    if(FOO > 100){
                        c = Math.random() * 1000;
                    }
                    if(FOO > 250){
                        c = Math.random() * 300;
                    }
                    if(FOO > 750){
                        c = Math.random() * 1500;
                    }
                    if(FOO > 1000){
                        FOO = 0;
                    }
                    resolve(c);
                }
            );
        }
         //@var {Number}
        var BAR = 0;
        /** 
         * comment
         * @method getFakeData
         * */
        function getFakeData2(params,callback) {
            return new Promise(
                function (resolve, reject) {
                    let c = 0;
                    
                    BAR++;
                    if(BAR < 250){
                        c = -300 + Math.random() * 600;
                    }
                    if(BAR > 250){
                        c = -400 + Math.random() * 800;
                    }
                    if(BAR > 300){
                        c = -1000 + Math.random() * 2000;
                    }
                    if(BAR > 450){
                        c = -150 + Math.random() * 300;
                    }
                    if(BAR > 850){
                        c = -300 + Math.random() * 600;
                    }
                    if(BAR > 1000){
                        BAR = 0;
                    }
                    resolve(c);
                }
            );
        }