 var CommonAjax = (function(){
    var ajax = function(data){
        $.ajax({
            type : data.type ? data.type : 'POST',
            url : data.url ? data.url  : serviceUrl,
            data : data.params || {} ,
            cache: data.cache ? true : false,
            dataType : data.dataType ?  data.dataType : "json",
            traditional:true,
            success : function(returnData) {
                if(data.successF){
                    data.successF(returnData);//请求成功
                }
            },
            error : function(returnData) {
                if(data.errorF){
                    data.errorF(returnData);
                }else{
                    //调用提示框组件，提示失败，在平台开发的时候进行补充
                    // layer.alert(returnData.respDesc,{icon:'success'});
                }
            }
        });
    };

    return {
        ajax:ajax
    }
})();